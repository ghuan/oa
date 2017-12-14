var ReportTemplateForm = function(reportId) {
	this.reportId = reportId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ReportTemplateFormWin',
				title : '报表详细信息',
				width : 600,
				autoHeight : true,
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
						var fp = Ext.getCmp('ReportTemplateForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg("操作信息","成功保存信息！");
									Ext.getCmp('ReportTemplateGrid').getStore().reload();
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

ReportTemplateForm.prototype.setup = function() {
	// 文件上传组件的回调函数
	function fn(data) {
		// 定义一个变量用来接收上传文件成功后返回的路径值
		var path;
		for (var i = 0; i < data.length; i++) {
			path = data[i].filepath;
			// 得到报表模块路径的字段，然后把上传成功后返回的路径值设到字段里面
			Ext.getCmp('reportLocation').setValue(path);
		}
	}
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/saveReportTemplate.do',
				layout : 'form',
				id : 'ReportTemplateForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'ReportTemplateFormId',
				defaultType : 'textfield',
				items : [{
							name : 'reportTemplate.reportId',
							id : 'reportId',
							xtype : 'hidden',
							value : this.reportId == null ? '' : this.reportId
						},{
						     name:'reportTemplate.createtime',
						     id:'createtime',
						     xtype:'hidden'
						} ,{
							fieldLabel : '报表标题',
							name : 'reportTemplate.title',
							id : 'title',
							allowBlank : false,
							blankText : '报表标题不能为空'
						}, {
							fieldLabel : '报表描述',
							name : 'reportTemplate.descp',
							id : 'descp',
							xtype : 'htmleditor',
							height : 200,
							allowBlank : false,
							blankText : '报表描述不能为空'

						}, {
							xtype : 'container',
							height : 26,
							layout : 'column',
							defaultType : 'textfield',
							items : [{
									xtype : 'label',
									style : 'padding-left:0px;margin-left:0px;margin-bottom:2px;',
									text : '报表模块路径',
									width : 102
							},
								{
										columnWidth:.8,
										name : 'reportTemplate.reportLocation',
										id : 'reportLocation',
										allowBlank : false,
										blankText : '报表模块jasper文件路径不能为空'
									}, {
										xtype : 'button',
										text : '上传附件',
										columnWidth:.2,
										handler : function() {
											// 点击上传附件按钮后，调用上传组件
											var dialog = App.createUploadDialog({
																file_cat : 'system',
																callback : fn
															});
											dialog.show('queryBtn');
										}
						}
							]
						}
				]
			});

	if (this.reportId != null && this.reportId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/system/getReportTemplate.do?reportId=' + this.reportId,
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
