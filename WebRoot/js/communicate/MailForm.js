var MailForm = function(mailId, boxId, opt) {
	return this.setup(mailId, boxId, opt);
};

MailForm.prototype.setup = function(mailId, boxId, opt) {
	var toolbar = this.initToolbar();
	var copyFieldItem = new copyFieldItems();
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/communicate/saveMail.do',
		title : '发送邮件',
		iconCls : 'menu-mail_send',
		layout : 'form',
		id : 'MailForm',
		tbar : toolbar,
		border:false,
		formId : 'MailFormId',
		labelWidth : 60,
		style:'padding-bottom:25px;',
		reader : new Ext.data.JsonReader({
					root : 'data'
				}, [{
							name : 'mail.recipientIDs',
							mapping : 'recipientIDs'
						}, {
							name : 'mail.copyToIDs',
							mapping : 'copyToIDs'
						}, {
							name : 'mail.mailStatus',
							mapping : 'mailStatus'
						}, {
							name : 'mail.fileIds',
							mapping : 'fileIds'
						}, {
							name : 'mail.mailId',
							mapping : 'mailId'
						}, {
							name : 'mail.recipientNames',
							mapping : 'recipientNames'
						}, {
							name : 'mail.subject',
							mapping : 'subject'
						}, {
							name : 'mailImportantFlag',
							mapping : 'importantFlag'
						}, {
							name : 'mail.filenames',
							mapping : 'filenames'
						}, {
							name : 'mail.content',
							mapping : 'content'
						}, {
							name : 'mail.copyToNames',
							mapping : 'copyToNames'
						}]),
		items : [
				// -----------------------------------------hidden 的属性
				{
			xtype : 'panel',
			layout:'form',
			border:false,
			
			style:'padding-left:10%;padding-top:20px;',
			defaultType:'textfield',
			labelWidth:60,
			width : 650,
			items : [{
						fieldLabel : '收件人ID列表用,分隔',
						name : 'mail.recipientIDs',
						id : 'mail.recipientIDs',
						xtype : 'hidden'
					}, {
						fieldLabel : '抄送人ID列表用,分开',
						name : 'mail.copyToIDs',
						id : 'mail.copyToIDs',
						xtype : 'hidden'
					}, {
						fieldLabel : '邮件状态',
						name : 'mail.mailStatus',
						id : 'mail.mailStatus',
						xtype : 'hidden',
						value : 1
					}, {
						fieldLabel : '附件IDs',
						name : 'mail.fileIds',
						xtype : 'hidden',
						id : 'mail.fileIds'
					}, {
						fieldLabel : 'BOXID',
						name : 'boxId',
						xtype : 'hidden',
						id : 'mailBoxId'
					}, {
						fieldLabel : 'MailId',
						name : 'mail.mailId',
						xtype : 'hidden',
						id : 'mail.mailId'
					}, {
						fieldLabel : '操作',
						name : 'replyBoxId',
						xtype : 'hidden',
						id : 'mail.replyBoxId'
					}, {
						fieldLabel : '附件名称列表',
						name : 'mail.filenames',
						xtype : 'hidden',
						id : 'mail.filenames'
					},
					// ------------------------------------------ hidden end
					{
						xtype : 'container',
						border: false,
						layout : 'column',
						height : 26,
						bodyStyle:'padding-top:20px;',
						defaultType : 'textfield',
						items : [{
									xtype : 'label',
									text : '收件人:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 61
								}, {
									width : 350,
									fieldLabel : '收件人姓名列表',
									name : 'mail.recipientNames',
									id : 'mail.recipientNames',
									allowBlank:false,
									blankText : '请选择收件人',
									readOnly : true
								}, {
									xtype : 'button',
									text : '选择收件人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													var recipientIDs = Ext
															.getCmp('mail.recipientIDs');
													var recipientNames = Ext
															.getCmp('mail.recipientNames');
													recipientIDs
															.setValue(userIds);
													recipientNames
															.setValue(fullnames);
												}).show();
									}
								}, {
									xtype : 'button',
									text : '我要抄送',
									iconCls : 'btn-mail_copy',
									handler : function() {
										var copyField = Ext.getCmp('copyField');
										copyField.show();
									}
								}]
					}, {
						xtype : 'container',// 抄送人container
						id : 'copyField',
						layout : 'column',
						style:'padding-left:0px;',
						height : 26,
						hidden : true,
						defaultType : 'textfield',
						items : [copyFieldItem]
					}, {
						width : 350,
						fieldLabel : '主题',
						name : 'mail.subject',
						id : 'mail.subject',
						allowBlank:false,
						blankText : '邮件主题为必填'
					}, {
						xtype : 'container',
						layout : 'column',
						height : 25,
						defaultType : 'textfield',
						style:'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '优先级:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 58
								}, {
									width : 350,
									fieldLabel : '邮件优先级',
									hiddenName : 'mail.importantFlag',
									id : 'mailImportantFlag',
									xtype : 'combo',
									mode : 'local',
									editable : false,
									value : '1',
									triggerAction : 'all',
									store : [['1', '一般'], ['2', '重要'],
											['3', '非常重要']]
								}, {
									xtype : 'checkbox',
									name : 'sendMessage',
									boxLabel : '告诉他有信'
								}]
					}, {
						xtype : 'container',
						layout : 'column',
						autoHeight : true,
						style:'padding-left:0px;',
						defaultType : 'textfield',
						items : [{
									xtype : 'label',
									text : '附件:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 59
								}, {
									// autoWidth:true,
									autoHeight : true,
									xtype : 'panel',
									border:false,
									width : 355,
									layout : 'column',
									name : 'filenames.display',
									id : 'filenames.display',
									items : [{
												columnWidth : 1,
												xtype : 'fieldset',
												height : 26,
												id : 'placeholder'
											}]
								}, {
									xtype : 'button',
									text : '上传',
									iconCls : 'btn-upload',
									handler : function() {
										var dialog = App.createUploadDialog({
													file_cat : 'communicate/mail',
													callback : uploadMailAttach
												});
										dialog.show('queryBtn');
									}
								}]
					}, {
						fieldLabel : '内容',
						name : 'mail.content',
						id : 'mail.content',
						xtype : 'htmleditor',
						height : 280
					}]
		}]
			// form items
	});
	if (mailId != null && mailId != 'undefined') {
		var _mailId = Ext.getCmp('mail.mailId');
		_mailId.setValue(mailId);
		if (opt == 'draft') {// 重载草稿
			formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/communicate/getMail.do',
				method : 'post',
				params : {
					mailId : mailId,
					folderId : 3,
					boxId : boxId
				},
				waitMsg : '正在载入数据...',
				success : function(form, action) {
					var copyToIDs = Ext.getCmp('mail.copyToIDs');
					if (copyToIDs.value != '') {// 假如草稿有抄送人,激活抄送人控件
						var copyField = Ext.getCmp('copyField');
						copyField.show();
					}

					var filenames = Ext.getCmp('mail.filenames').value;
					if (filenames != '') {
						var display = Ext.getCmp('filenames.display');
						var placeholder = Ext.getCmp('placeholder');
						if (placeholder != null) {// 载入草稿并有附件时,点位行隐藏
							placeholder.hide();
						}
						var fnames = filenames.split(',');
						var fids = Ext.getCmp('mail.fileIds').value.split(',');
						for (var i = 0; i < fnames.length; i++) {// 显示附件
							display.add(new Ext.form.FieldSet({
								id : 'mailAttachDisplay' + fids[i],
								columnWidth : 1,
								html : '<img src="'
										+ __ctxPath
										+ '/images/flag/attachment.png"/>&nbsp;&nbsp;'
										+ fnames[i]
										+ '&nbsp;&nbsp;<a href="javascript:deleteAttach('
										+ fids[i] + ')" >删除</a>'
							}));
						}
						display.doLayout(true);
					}
				},
				failure : function(form, action) {

				}
			});
		} else if (opt == 'reply') {// 回复
			formPanel.getForm().load({
						deferredRender : false,
						url : __ctxPath + '/communicate/optMail.do',
						method : 'post',
						params : {
							mailId : mailId,
							boxId : boxId,
							opt : '回复'
						},
						waitMsg : '正在载入数据...',
						success : function(form, action) {
							Ext.getCmp('mail.replyBoxId').setValue(boxId);
						},
						failure : function(form, action) {
						}
					});
		} else if (opt == 'forward') {
			formPanel.getForm().load({
						deferredRender : false,
						url : __ctxPath + '/communicate/optMail.do',
						method : 'post',
						params : {
							mailId : mailId,
							opt : '转发'
						},
						waitMsg : '正在载入数据...',
						success : function(form, action) {
						},
						failure : function(form, action) {
						}
					});
		}
	}
	if (boxId != null && boxId != 'undefined') {
		var mailBoxId = Ext.getCmp('mailBoxId');
		mailBoxId.setValue(boxId);
	}
	return formPanel;

};

/**
 * 
 * @return {}
 */
MailForm.prototype.initToolbar = function() {

	var toolbar = new Ext.Toolbar({
		width : '100%',
		height : 30,
		items : [{
			text : '立即发送',
			iconCls : 'btn-mail_send',
			handler : function() {
				var mailform = Ext.getCmp('MailForm');
				var mailStatus = Ext.getCmp('mail.mailStatus');
				mailStatus.setValue(1);
				mailform.getForm().submit({
					waitMsg : '正在发送邮件,请稍候...',
					success : function(mailform, o) {
						Ext.Msg.confirm('操作信息', '邮件发送成功！继续发邮件?', function(btn) {
									if (btn == 'yes') {
										var mailform = Ext.getCmp('MailForm');
										mailform.getForm().reset();
									} else {
										var tabs = Ext.getCmp('centerTabPanel');
										tabs.remove('MailForm');
									}
								});
					},
					failure : function(mailform, o) {
						Ext.ux.Toast.msg('错误信息', o.result.msg);
					}
				});
			}

		}, {
			text : '存草稿',
			iconCls : 'btn-mail_save',
			handler : function() {
				var mailStatus = Ext.getCmp('mail.mailStatus');
				mailStatus.setValue(0);
				var mailform = Ext.getCmp('MailForm');
				mailform.getForm().submit({
					waitMsg : '正在保存草稿,请稍候...',
					success : function(mailform, o) {
						Ext.Msg.confirm('操作信息', '草稿保存成功！继续发邮件?', function(btn) {
									if (btn == 'yes') {
										var mailform = Ext.getCmp('MailForm');
										mailform.getForm().reset();
									} else {
										var tabs = Ext.getCmp('centerTabPanel');
										tabs.remove('MailForm');
									}
								});
					},
					failure : function(mailform, o) {
						Ext.ux.Toast.msg('错误信息', o.result.msg);
					}
				})
			}
		}, {
			text : '重置',
			iconCls : 'reset',
			handler : function() {
				var mailForm = Ext.getCmp('MailForm');
				mailForm.getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-mail_remove',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('MailForm');
			}
		}]
	});
	return toolbar;
};
/**
 * 增加抄送控件
 * 
 * @return {}
 */
function copyFieldItems() {
	var items = [{
				xtype : 'label',
				text : '抄送人:',
				style : 'padding-left:0px;padding-top:3px;',
				width : 61
			}, {
				width : 350,
				fieldLabel : '抄送人姓名列表',
				name : 'mail.copyToNames',
				id : 'mail.copyToNames',
				emptyText : '请选择抄送人',
				readOnly : true
			}, {
				xtype : 'button',
				text : '选择抄送人',
				iconCls : 'btn-mail_recipient',
				handler : function() {
					UserSelector.getView(function(userIds, fullnames) {
								var copyToIDs = Ext.getCmp('mail.copyToIDs');
								var copyToNames = Ext
										.getCmp('mail.copyToNames')
								copyToIDs.setValue(userIds);
								copyToNames.setValue(fullnames);
							}).show();
				}
			}, {
				xtype : 'button',
				text : '取消抄送',
				iconCls : 'btn-delete_copy',
				handler : function() {// 取消抄送时设置为空
					var copyField = Ext.getCmp('copyField');
					var mailForm = Ext.getCmp('MailForm');
					mailForm.getForm().findField('mail.copyToIDs').setValue('');
					mailForm.getForm().findField('mail.copyToNames')
							.setValue('');
					copyField.hide();
				}
			}];
	return items;
}
/**
 * 附件上传,可多附件
 * 
 * @param {}
 *            data
 */
function uploadMailAttach(data) {
	// var ids = null
	var fileIds = Ext.getCmp('mail.fileIds');
	var filenames = Ext.getCmp('mail.filenames');
	var display = Ext.getCmp('filenames.display');
	var placeholder = Ext.getCmp('placeholder');
	if (placeholder != null) {// 隐藏点位符
		placeholder.hide();
	}
	for (var i = 0; i < data.length; i++) {
		if (fileIds.getValue() != '') {
			fileIds.setValue(fileIds.getValue() + ',');
			filenames.setValue(filenames.getValue() + ',');
		}
		fileIds.setValue(fileIds.getValue() + data[i].fileId);
		filenames.setValue(filenames.getValue() + data[i].filename)
		display.add(new Ext.form.FieldSet({// 显示附件
			id : 'mailAttachDisplay' + data[i].fileId,
			columnWidth : 1,
			html : '<img src="' + __ctxPath
					+ '/images/flag/attachment.png"/>&nbsp;&nbsp;'
					+ data[i].filename
					+ '&nbsp;&nbsp;<a href="javascript:deleteAttach('
					+ data[i].fileId + ')">删除</a>'
		}));
	}
	display.doLayout(true);
}

/*
 * 附件删除
 */
function deleteAttach(_fileId) {
	// alert('_fileId'+_fileId);
	// 删除隐藏域中的附件信息
	var fids = Ext.getCmp('mail.fileIds').value.split(',');
	var fnames = Ext.getCmp('mail.filenames').value.split(',');
	var fileIds = '';
	var filenames = '';
	for (var i = 0; i < fids.length; i++) {
		if (fids[i] != _fileId) {
			fileIds += fids[i] + ','
			filenames += fnames[i] + ','
		}
	}
	if (fileIds != '') {
		fileIds = fileIds.substring(0, fileIds.length - 1)
		filenames = filenames.substring(0, filenames.length - 1)
	}
	Ext.getCmp('mail.fileIds').setValue(fileIds);
	Ext.getCmp('mail.filenames').setValue(filenames);

	var display = Ext.getCmp('filenames.display')
	var deleteField = Ext.getCmp('mailAttachDisplay' + _fileId);
	display.remove(deleteField);// 删除附件显示

	if (Ext.getCmp('mail.fileIds').value == '') {// 假如没有附件，则显示占位行
		Ext.getCmp('placeholder').show();
	}
	display.doLayout(true);

	var _mailId = Ext.getCmp('mail.mailId').value;
	if (_mailId != '' && _mailId != 'undefined') {// 假如是草稿,则存草稿
		Ext.Ajax.request({
					url : __ctxPath + '/communicate/attachMail.do',
					method : 'post',
					params : {
						mailId : _mailId,
						fileId : _fileId,
						fileIds : fileIds,
						filenames : filenames
					},
					success : function() {

					}
				})
	} else {// 新邮件的时候
		Ext.Ajax.request({
					url : __ctxPath + '/system/multiDelFileAttach.do',
					params : {
						ids : _fileId
					},
					method : 'post',
					success : function() {
						Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
					}
				})
	}
}
