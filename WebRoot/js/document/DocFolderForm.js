var DocFolderForm = function(folderId,parentId,isShared) {
	this.folderId = folderId;
	this.parentId=parentId;
	this.isShared=isShared;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'DocFolderFormWin',
				title : '目录详细信息',
				iconCls:'menu-mail_folder',
				width : 400,
				height : 150,
				modal : true,
				minWidth : 300,
				minHeight : 200,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp = Ext.getCmp('DocFolderForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功信息保存！');
									//左树重新reload
									var leftFolderPanel=Ext.getCmp("leftFolderPanel");
									var leftPublicFolder=Ext.getCmp('leftDocFolderSharedPanel');
									var grid=Ext.getCmp('DocFolderGrid');
									if(grid!=null){
									    grid.getStore().reload();
									}
									if(leftFolderPanel!=null){
										leftFolderPanel.root.reload();
									}
									if(leftPublicFolder!=null){
										leftPublicFolder.root.reload();
									}
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
					iconCls:'reset',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

DocFolderForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/document/saveDocFolder.do',
				layout : 'form',
				id : 'DocFolderForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'DocFolderFormId',
				defaultType : 'textfield',
				items : [{
							name : 'docFolder.folderId',
							id : 'folderId',
							xtype : 'hidden',
							value : this.folderId == null ? '' : this.folderId
						}, {
							fieldLabel : '目录名称',
							name : 'docFolder.folderName',
							id : 'folderName',
							allowBlank:false
						},{
							xtype:'hidden',
							name : 'docFolder.parentId',
							id : 'parentId',
							value:this.parentId
						},{
							xtype:'hidden',
							name : 'docFolder.isShared',
							id : 'isShared',
							value :this.isShared
						}

				]
			});
	if (this.folderId != null && this.folderId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/document/getDocFolder.do?folderId='
					+ this.folderId,
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
