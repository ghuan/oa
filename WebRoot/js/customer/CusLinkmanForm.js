var CusLinkmanForm = function(linkmanId) {
	this.linkmanId = linkmanId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'CusLinkmanFormWin',
				iconCls : 'menu-cusLinkman',
				title : '联系人详细信息',
				width : 450,
				height : 410,
				minWidth:449,
				minHeight:409,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp = Ext.getCmp('CusLinkmanForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									var cusLinkmanGrid = Ext.getCmp('CusLinkmanGrid');
									var manageGrid = Ext.getCmp('ManageLinkmanGrid');
									if(cusLinkmanGrid !=null){
										cusLinkmanGrid.getStore().reload();
									}
									if(manageGrid !=null){
										manageGrid.getStore().reload();
									}
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : action.result.msg,
												buttons : Ext.MessageBox.OK,
												icon : 'ext-mb-error'
											});
									//window.close();
								}
							});
						}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

CusLinkmanForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/customer/saveCusLinkman.do',
				layout : 'form',
				id : 'CusLinkmanForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'CusLinkmanFormId',
				defaultType : 'textfield',
				items : [{
							name : 'cusLinkman.linkmanId',
							id : 'linkmanId',
							xtype : 'hidden',
							value : this.linkmanId == null
									? ''
									: this.linkmanId
						},{
							name : 'cusLinkman.customerId',
							id : 'customerId',
							xtype : 'hidden',
							value : this.customerName == null?'':this.customerName
						},{
							xtype:'container',
							id:'custoemrSelect',
							layout:'column',
							defaultType:'label',
							style:'padding-left:0px;',
							height:26,
							items:[{
								text:'所属客户*:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							},{
							//fieldLabel : '所属客户<a style="color:red;">*</a>',//这里要做得选择器添加时选择
							xtype:'textfield',
							width:220,
							readOnly:true,
							name : 'customerName',
							id : 'customerName'
							},{
								xtype:'button',
								id:'customerSelectButton',
								text:'选择客户',
								iconCls:'btn-mail_recipient',
								handler:function(){
									CustomerSelector.getView(function(customerId,customerName){
										Ext.getCmp('customerId').setValue(customerId);
										Ext.getCmp('customerName').setValue(customerName);
									},true).show();

								}
							}]
						}, {
							fieldLabel : '姓名<a style="color:red;">*</a>',
							name : 'cusLinkman.fullname',
							id : 'fullname',
							allowBlank:false,
							blankText:'联系人姓名不能为空!'
						}, {
							fieldLabel : '性别<a style="color:red;">*</a>',
							hiddenName : 'cusLinkman.sex',
							id : 'sex',
							xtype : 'combo',
							mode : 'local',
							editable : false,
							triggerAction : 'all',
							store : [['1', '先生'], ['0', '女士']],
							value : 1
						},{
							fieldLabel : '手机<a style="color:red;">*</a>',
							xtype:'numberfield',
							name : 'cusLinkman.mobile',
							id : 'mobile',
							allowBlank:false,
							blankText:'联系人手机不能为空!'
						}, {
							fieldLabel : '主要联系人<a style="color:red;">*</a>',
							hiddenName : 'cusLinkman.isPrimary',
							id : 'isPrimary',
							xtype : 'combo',
							mode : 'local',
							editable : false,
							triggerAction : 'all',
							store : [['1', '是(每个客户只能有一个主要联系人)'], ['0', '否']],
							value : 0
						},{
							fieldLabel : '职位',
							name : 'cusLinkman.position',
							id : 'position'
						}, {
							xtype:'tabpanel',
							activeTab : 0,//激活第一个panel
							defaultType:'panel',
							bodyStyle:'background-color : transparent;',
							items:[{
								title:'联系方式',
								layout:'form',
								defaultType:'textfield',
								defaults : {
									widht : 400,
									anchor : '100%,100%'
								},
								items:[{
										fieldLabel : 'Email',
										name : 'cusLinkman.email',
										id : 'email',
										vtype : 'email',
										vtypeText : '邮箱格式不正确!'
									}, {
										fieldLabel : '电话',
										name : 'cusLinkman.phone',
										id : 'phone'
									}, {
										fieldLabel : 'MSN',
										name : 'cusLinkman.msn',
										id : 'msn'
									}, {
										fieldLabel : 'QQ',
										xtype:'numberfield',
										name : 'cusLinkman.qq',
										id : 'qq'
									} ,{
										fieldLabel:'传真',
										name : 'cusLinkman.fax',
										id:'fax'
								}]
							},{
								title:'扩展信息',
								layout:'form',
								defaultType:'textfield',
								defaults : {
									widht : 400,
									anchor : '100%,100%'
								},
								items:[{
										fieldLabel : '邮编',
										xtype:'numberfield',
										name : 'cusLinkman.homeZip',
										id : 'homeZip'
									}, {
										fieldLabel : '家庭住址',
										name : 'cusLinkman.homeAddress',
										id : 'homeAddress'
									},{
										fieldLabel : '家庭电话',
										name : 'cusLinkman.homePhone',
										id : 'homePhone'
									},{
										fieldLabel : '生日',
										xtype:'datefield',
										format:'Y-m-d',
										name : 'cusLinkman.birthday',
										id : 'birthday'
									},{
										fieldLabel : '爱好',
										name : 'cusLinkman.hobby',
										id : 'hobby'
									}]
								},{
									title:'其它信息',
								layout:'form',
								defaultType:'textarea',
								defaults : {
									widht : 400,
									anchor : '100%,100%'
								},
								items:[{
										fieldLabel : '备注',
										name : 'cusLinkman.notes',
										id : 'notes',
										height:126
									}]
								}]
						}

				]
			});

	if (this.linkmanId != null && this.linkmanId != 'undefined' && this.linkmanId!='') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getCusLinkman.do?linkmanId='
					+ this.linkmanId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				Ext.getCmp('customerName').setValue(action.result.data.customer.customerName)
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
