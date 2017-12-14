var UserSubForm = function(subId) {
	this.subId = subId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'UserSubFormWin',
				title : '选择添加的下属',
				iconCls:'btn-mail_recipient',
				width : 500,
				height : 200,
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
						var fp = Ext.getCmp('UserSubForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('UserSubGrid').getStore()
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

UserSubForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/saveUserSub.do',
				layout : 'column',
				id : 'UserSubForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'UserSubFormId',
				// defaultType : 'textfield',
				items : [{
							name : 'userSub.subId',
							id : 'subId',
							xtype : 'hidden',
							value : this.subId == null ? '' : this.subId
						}, {
							xtype : 'hidden',
							name : 'subUserIds',
							id : 'subUserIds'
						}, {
							text : '下属',
							xtype : 'label',
							width:30
						}, {
							name : 'subUsers',
							id : 'subUsers',
							xtype : 'textarea',
							readOnly:true,
							editable:false,
							allowBlank:false,
							width:300,
							height:100
						}, {
							xtype:'container',
							layout:'form',
							width:100,
							items:[{
							xtype : 'button',
							iconCls:'btn-user-sel',
							text : '选择下属',
							handler : function() {
								UserSubSelector.getView(function(id, name) {
											Ext.getCmp('subUserIds')
													.setValue(id);
											Ext.getCmp('subUsers')
													.setValue(name);
										}).show();
							}
						},{
	                        xtype:'button',
	                        text:'清除记录',
	                        iconCls:'btn-reseted',
	                        handler:function(){
	                          Ext.getCmp('subUserIds')
													.setValue('');
							  Ext.getCmp('subUsers')
													.setValue('');
	                        }
						}]}]
			});

	if (this.subId != null && this.subId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/system/getUserSub.do?subId='
							+ this.subId,
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
