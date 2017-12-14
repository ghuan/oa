var DepreTypeForm = function(depreTypeId) {
	this.depreTypeId = depreTypeId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'DepreTypeFormWin',
				title : '折旧类型详细信息',
				iconCls:'menu-depre-type',
				width : 400,
				height : 260,
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
						var fp = Ext.getCmp('DepreTypeForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('DepreTypeGrid').getStore()
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

DepreTypeForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/admin/saveDepreType.do',
				layout : 'form',
				id : 'DepreTypeForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'DepreTypeFormId',
				defaultType : 'textfield',
				items : [{
							name : 'depreType.depreTypeId',
							id : 'depreTypeId',
							xtype : 'hidden',
							value : this.depreTypeId == null
									? ''
									: this.depreTypeId
						}, {
							fieldLabel : '分类名称',
							name : 'depreType.typeName',
							id : 'typeName',
							allowBlank:false
						}, {
							xtype:'container',
							style:'padding-left:0px;padding-bottom:3px;',
							layout:'column',
							items:[{
							    xtype:'label',
								text:'折旧周期:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							    },{
								xtype:'numberfield',
								name : 'depreType.deprePeriod',
								id : 'deprePeriod',
								width:220,
							    allowBlank:false
							    },{
							    xtype:'label',
							    text:'月'
							    }]
						}, {
							fieldLabel : '折旧计算方法',
							hiddenName : 'depreType.calMethod',
							id : 'calMethod',
							xtype : 'combo',
							mode : 'local',
							editable : false,
							readOnly : true,
							allowBlank : false,
							triggerAction : 'all',
							store : [['1', '平均年限法'], ['2', '工作量法'],
									['3', '双倍余额递减法'], ['4', '年数总和法']]
						}, {
							fieldLabel : '类型说明',
							name : 'depreType.typeDesc',
							id : 'typeDesc',
							xtype : 'textarea'
						}

				]
			});

	if (this.depreTypeId != null && this.depreTypeId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getDepreType.do?depreTypeId='
					+ this.depreTypeId,
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
