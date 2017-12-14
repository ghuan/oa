var AppRoleForm = function(roleId, isCopy) {
	this.roleId = roleId;
	this.isCopy = isCopy;
	var fp = this.setup();
	var window = new Ext.Window({
		id : 'AppRoleFormWin',
		title : '角色详细信息',
		iconCls : 'menu-role',
		width : 370,
		height : 220,
		modal : true,
		minWidth : 300,
		minHeight : 200,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [fp],
		buttons : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp('AppRoleForm');
				if (isCopy == 1) {
					var roleName = Ext.getCmp('roleName').getValue();
					Ext.Ajax.request({
						url : __ctxPath + '/system/checkAppRole.do',
						params : {
							roleName : roleName
						},
						method : 'post',
						success : function(response) {
							var result = Ext.util.JSON
									.decode(response.responseText);
							if (result.success) {
								if (fp.getForm().isValid()) {
									fp.getForm().submit({
										method : 'post',
										waitMsg : '正在提交数据...',
										success : function(fp, action) {
											Ext.ux.Toast.msg('操作信息', '成功信息保存！');
											Ext.getCmp('AppRoleGrid')
													.getStore().reload();
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
							} else {
								Ext.ux.Toast.msg('提示信息', '该角色名字已经存在，请更改！');
							}
						},
						failure : function() {
							// .......
						}
					});
				} else {
					if (fp.getForm().isValid()) {
						fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功信息保存！');
										Ext.getCmp('AppRoleGrid').getStore()
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

AppRoleForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/saveAppRole.do?isCopy='
						+ this.isCopy,
				layout : 'form',
				id : 'AppRoleForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'AppRoleFormId',
				defaultType : 'textfield',
				items : [{
							name : 'appRole.roleId',
							id : 'roleId',
							xtype : 'hidden',
							value : this.roleId == null ? '' : this.roleId
						}, {
							fieldLabel : '角色名称',
							name : 'appRole.roleName',
							id : 'roleName'
						}, {
							fieldLabel : '角色描述',
							xtype : 'textarea',
							name : 'appRole.roleDesc',
							id : 'roleDesc'
						}, {
							fieldLabel : '状态',
							hiddenName : 'appRole.status',
							id : 'status',
							xtype : 'combo',
							mode : 'local',
							editable : true,
							triggerAction : 'all',
							store : [['0', '禁用'], ['1', '可用']],
							value : 0
						}]
			});

	if (this.roleId != null && this.roleId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/system/getAppRole.do?roleId='
							+ this.roleId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
					},
					failure : function(form, action) {
					}
				});
	}
	return formPanel;

};
