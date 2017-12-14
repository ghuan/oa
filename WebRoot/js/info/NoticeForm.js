var NoticeForm = function(noticeId) {
	this.noticeId = noticeId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'NoticeFormWin',
				iconCls:'menu-notice',
				title : '公告详细信息',
				x:300,
				y:30,
				width : 500,
				autoHeight : true,
				modal : true,
				layout:'column',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('NoticeForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg("操作信息","成功保存信息！");
									Ext.getCmp('NoticeGrid').getStore().reload();
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
//开启表单提示功能
Ext.QuickTips.init();
NoticeForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/info/saveNotice.do',
				layout : 'form',
				id : 'NoticeForm',
				frame : true,
				width:480,
				formId : 'NoticeFormId',
				defaultType : 'textfield',
				items : [{
							name : 'notice.noticeId',
							id : 'noticeId',
							xtype : 'hidden',
							value : this.noticeId == null ? '' : this.noticeId
						}, {
							fieldLabel : '发布者',
							name : 'notice.postName',
							id : 'postName',
							allowBlank : false,
							blankText : '发布者不能为空',
							anchor:'98%'
						}, {
							fieldLabel : '公告标题',
							name : 'notice.noticeTitle',
							id : 'noticeTitle',
							allowBlank : false,
							blankText : '公告标题不能为空',
							anchor:'98%'
						}, {
							fieldLabel : '公告内容',
							name : 'notice.noticeContent',
							id : 'noticeContent',
							xtype : 'htmleditor',
							height : 200,
							allowBlank : false,
							blankText : '公告内容不能为空',
							anchor:'98%'
						}, {
							fieldLabel : '生效日期',
							name : 'notice.effectiveDate',
							id : 'effectiveDate',
							xtype : 'datefield',
							format : 'Y-m-d',
							anchor:'98%'
						}, {
							fieldLabel : '失效日期',
							name : 'notice.expirationDate',
							id : 'expirationDate',
							xtype : 'datefield',
							format : 'Y-m-d',
							anchor:'98%'
						}, 
						{
				           	 xtype : 'combo',
				           	 fieldLabel: '发布状态',
				           	 allowBlank:false,
				             hiddenName: 'notice.state',
				             id:'state',
				             emptyText : '请选择发布状态',
				             mode : 'local',
							 editable : false,
							 triggerAction : 'all',
							 store : [['0','草稿'],['1','立即发布']],
							 anchor:'98%'
				            }

				]
			});

	if (this.noticeId != null && this.noticeId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/info/getNotice.do?noticeId='+ this.noticeId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						var effectiveDate = action.result.data.effectiveDate;
						var effectiveDateField = Ext.getCmp('effectiveDate');
						var expirationDate = action.result.data.expirationDate;
						var expirationDateField = Ext.getCmp('expirationDate');
						effectiveDateField.setValue(new Date(getDateFromFormat(effectiveDate, "yyyy-MM-dd HH:mm:ss")));
						if(expirationDate!=null){
						 expirationDateField.setValue(new Date(getDateFromFormat(expirationDate, "yyyy-MM-dd HH:mm:ss")));
						}
					},
					failure : function(form, action) {
						Ext.ux.Toast.msg('编辑', '载入失败');
					}
				});
	}
	return formPanel;

};
