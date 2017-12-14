
/**
 * 修改密码
 */
var ResetPasswordForm = function(userId){
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/resetPasswordAppUser.do',
				layout : 'form',
				id:'setPasswordForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
	        	defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						}, {
							fieldLabel : '旧密码',
							name : 'oldPassword',
							id : 'oldPassword',
							inputType : 'password'
						}, {
							fieldLabel : '新密码',
							name : 'newPassword',
							id : 'newPassword',
							inputType : 'password'
						}, {
							fieldLabel : '再输入',
							name : 'againPassword',
							id : 'againPassword',
							inputType : 'password'
						}]
			});
			
	var setPassword = new Ext.Window({
		title:'修改密码',
		iconCls:'btn-password',
		width : 300,
		height : 175,
		modal: true,
		layout : 'anchor',
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items:[formPanel],
		buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp=Ext.getCmp('setPasswordForm');
								if (fp.getForm().isValid()) {
								fp.getForm().submit({
											method: 'post',
											waitMsg : '正在提交数据...',
											success : function(fp,action) {
												Ext.ux.Toast.msg('操作信息', '密码修改成功！');
												setPassword.close();
											},
											failure : function(fp,action) {
												Ext.ux.Toast.msg('错误提示',action.result.msg);
												Ext.getCmp('setPasswordForm').getForm().reset();
											}
								});
							}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						setPassword.close();
					}
				}]
			});
	setPassword.show();

}
