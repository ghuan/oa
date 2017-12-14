var ProviderForm = function(providerId) {
	this.providerId = providerId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ProviderFormWin',
				title : '供应商详细信息',
				iconCls : 'menu-provider',
				width : 500,
				height : 420,
				minWidth : 499,
				minHeight : 419,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('ProviderForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('ProviderGrid').getStore()
											.reload();
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : 'ext-mb-error'
											});
									window.close();
								}
							});
						}
					}
				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

ProviderForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/customer/saveProvider.do',
				layout : 'form',
				id : 'ProviderForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'ProviderFormId',
				defaultType : 'textfield',
				items : [{
							name : 'provider.providerId',
							id : 'providerId',
							xtype : 'hidden',
							value : this.providerId == null
									? ''
									: this.providerId
						}, {
							fieldLabel : '供应商名称',
							name : 'provider.providerName',
							id : 'providerName',
							allowBlank : false,
							blankText : '供应商名称不能为空!'
						}, {
							fieldLabel : '联系人',
							name : 'provider.contactor',
							id : 'contactor',
							allowBlank : false,
							blankText : '联系人姓名不能为空!'
						}, {
							fieldLabel : '电话',
							name : 'provider.phone',
							id : 'phone',
							allowBlank : false,
							blankText : '电话不能为空!'
						}, {
							fieldLabel : '地址',
							name : 'provider.address',
							id : 'address',
							allowBlank : false,
							blankText : '地址不能为空!'
						}, {
							fieldLabel : '等级',
							hiddenName : 'provider.rank',
							id : 'rank',
							// xtype : 'iconcomb',
							// allowBlank : false,
							// readOnly : true,
							// store : new Ext.data.SimpleStore({
							// fields : ['rank', 'flagName','flagClass'],
							// data : [
							// ['1', '一级供应商','ux-flag-grade_one'],
							// ['2', '二级供应商','ux-flag-grade_two'],
							// ['3', '三级供应商','ux-flag-grade_three'],
							// ['4', '四级供应商','ux-flag-grade_four']]
							// }),
							// valueField : 'rank',
							// displayField : 'flagName',
							// iconClsField : 'flagClass',
							// triggerAction : 'all',
							// mode : 'local',

							xtype : 'combo',
							mode : 'local',
							editable : false,
							triggerAction : 'all',
							store : [['1', '一级供应商'],
									['2', '二级供应商'],
									['3', '三级供应商'],
									['4', '四级供应商']],
							value : 1
						}, {
							xtype : 'tabpanel',
							activeTab : 0,// 激活第一个panel
							defaultType : 'panel',
							bodyStyle : 'background-color : transparent;',
							items : [{
										title : '联系方式',
										layout : 'form',
										defaultType : 'textfield',
										defaults : {
											widht : 400,
											anchor : '100%,100%'
										},
										items : [{
													fieldLabel : '传真',
													name : 'provider.fax',
													id : 'fax'
												}, {
													fieldLabel : '网址',
													name : 'provider.site',
													id : 'site'
												}, {
													fieldLabel : '邮箱',
													name : 'provider.email',
													id : 'email',
													vtype : 'email',
													vtypeText : '邮箱格式不正确!'
												}, {
													fieldLabel : '邮编',
													name : 'provider.zip',
													id : 'zip',
													xtype:'numberfield'
												}, {
													fieldLabel : '开户银行',
													name : 'provider.openBank',
													id : 'openBank'
												}, {
													fieldLabel : '银行账号',
													name : 'provider.account',
													id : 'account'
												}]
									}, {
										title : '其它信息',
										layout : 'form',
										defaultType : 'textarea',
										defaults : {
											widht : 400,
											anchor : '100%,100%'
										},
										items : [{
													fieldLabel : '备注',
													name : 'provider.notes',
													id : 'notes',
													height : 146
												}]
									}]
						}

				]
			});

	if (this.providerId != null && this.providerId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getProvider.do?providerId='
					+ this.providerId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
