/**
 * 发送邮件
 * @param {} ids 
 * @param {} names
 * @param {} type  0＝给客户发，1＝发供应商发
 */
var SendMailForm = function(ids, names,type) {

	var formPanel = new Ext.FormPanel({
		id : 'CmailForm',
		frame : true,
		border : false,
		defaultType : 'textarea',
		url : __ctxPath + '/customer/send.do',
		method : 'post',
		modal : true,
		layout : 'form',
		plain : true,
		scope : this,
		items : [{
					xtype : 'hidden',
					id : 'provideIds',
					name : 'customerMail.ids',
					value : ids
				},{
				   xtype:'hidden',
				   id:'type',
				   name:'customerMail.type',
				   value:type
				}, {
					xtype : 'textfield',
					id : 'receivedName',
					anchor : '98%',
					name : 'customerMail.names',
					fieldLabel : '收件人',
					readOnly:true,
					value : names
				}, {
					xtype : 'textfield',
					id : 'subject',
					name : 'customerMail.subject',
					anchor : '98%',
					allowBlank:false,
					fieldLabel : '主题'
				}, {
					xtype : 'htmleditor',
					id : 'content',
					name : 'customerMail.mailContent',
					width : 500,
					height : 300,
					fieldLabel : '内容'
				},{
					layout : 'column',
					xtype : 'container',
					items : [{
								columnWidth : .7,
								layout : 'form',
								items : [{
											fieldLabel : '附件',
											xtype : 'panel',
											id : 'providerFilePanel',
											frame : true,
											height : 80,
											autoScroll : true,
											html : ''
										}]
							}, {
								columnWidth : .3,
								items : [{
									xtype : 'button',
									text : '添加附件',
									handler : function() {
										var dialog = App.createUploadDialog({
											file_cat : 'customer',
											callback : function(data) {
												var fileIds = Ext
														.getCmp("providerfileIds");
												var filePanel = Ext
														.getCmp('providerFilePanel');

												for (var i = 0; i < data.length; i++) {
													if (fileIds.getValue() != '') {
														fileIds
																.setValue(fileIds
																		.getValue()
																		+ ',');
													}
													fileIds.setValue(fileIds
															.getValue()
															+ data[i].fileId);
													Ext.DomHelper
															.append(
																	filePanel.body,
																	'<span><a href="#" onclick="FileAttachDetail.show('
																			+ data[i].fileId
																			+ ')">'
																			+ data[i].filename
																			+ '</a> <img class="img-delete" src="'
																			+ __ctxPath
																			+ '/images/system/delete.gif" onclick="removeFile(this,'
																			+ data[i].fileId
																			+ ')"/>&nbsp;|&nbsp;</span>');
												}
											}
										});
										dialog.show(this);
									}
								}, {
									xtype : 'button',
									text : '清除附件',
									handler : function() {
										var fileAttaches = Ext
												.getCmp("providerfileIds");
										var filePanel = Ext
												.getCmp('providerFilePanel');

										filePanel.body.update('');
										fileAttaches.setValue('');
									}
								}]
							}]
				}, {
					xtype : 'hidden',
					id : 'providerfileIds',
					name : 'customerMail.files'
				}]
				
	});

	formPanel.getForm().load({
		deferredRender : false,
		url : __ctxPath + '/customer/loadVm.do',
		waitMsg : '正在载入数据...',
		success : function(form, action) {
			var htmlcontent = Ext.util.JSON.decode(action.response.responseText).data;
			Ext.getCmp('content').setValue(htmlcontent);
		},
		failure : function(form, action) {
			var result = action.result;
			Ext.ux.Toast.msg("信息提示",result.message);
			Ext.getCmp('SendMailFormWin').close();
		}
	});

	var window = new Ext.Window({
				title : '邮件发送',
				iconCls:'btn-mail_send',
				id : 'SendMailFormWin',
				width : 650,
				height : 530,
				buttonAlign : 'center',
				items : [formPanel],
				buttons : [ {
	 			text : '发送',
	 			iconCls:'btn-mail_send',
	 			handler : function() {
	 				var message = Ext.getCmp('CmailForm');
	 				if (message.getForm().isValid()) {
	 					message.getForm().submit( {
	 						waitMsg : '正在 发送信息',
	 						success : function(message, o) {
	 						    var win = Ext.getCmp('SendMailFormWin');
	 						    win.close();
	 							Ext.ux.Toast.msg('操作信息', '邮件发送成功！');
	 						},
	 						failure :function(message, o){
	 							Ext.ux.Toast.msg('错误信息',o.result.message);
	 						}
	 					});
	 				}
	 			}

	 		}, {
	 			text : '关闭',
	 			iconCls:'reset',
	 			handler : function() {
	 				var win = Ext.getCmp('SendMailFormWin');
	 				win.close();
	 			}
	 		} ]
			});
	window.show();
}