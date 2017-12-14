var ReportParamForm = function(reportId,paramId) {
	this.paramId = paramId;
	this.reportId=reportId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ReportParamFormWin',
				title : name+'详细信息',
				width : 500,
				height : 220,
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
						var fp = Ext.getCmp('ReportParamForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('ReportParamGrid').getStore()
											.reload();
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
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

ReportParamForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/system/saveReportParam.do',
				layout : 'form',
				id : 'ReportParamForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'ReportParamFormId',
				defaultType : 'textfield',
				items : [{
							name : 'reportParam.paramId',
							id : 'paramId',
							xtype : 'hidden',
							value : this.paramId == null ? '' : this.paramId
						}, {
							xtype:'hidden',
							name : 'reportParam.reportId',
							value:this.reportId
						}, {
							fieldLabel : '参数名称',
							name : 'reportParam.paramName',
							id : 'paramName',
							allowBlank:false
						}, {
							fieldLabel : '参数Key',
							name : 'reportParam.paramKey',
							id : 'paramKey',
							allowBlank:false
						}, {
							fieldLabel : '类型',
							hiddenName : 'reportParam.paramType',
							id : 'paramType',
							xtype:'combo',
							mode : 'local',
							allowBlank:false,
							editable : false,
							readOnly:true,
							triggerAction : 'all',
							store : [['varchar', '字符类型'], ['int', '整型'], ['decimal', '精度型'], ['date', '日期型'],['datetime', '日期时间型']],
							value:'varchar',
							listeners : {
								select : function(combo, record, index) {
									var value = combo.value;
									var fp=Ext.getCmp('ReportParamForm');
									fp.remove('defaultVal');
									if(value=='date'){
									   fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'datefield',
											format:'Y-m-d',
											allowBlank:false
									   });
									  
									}else if(value=='datetime'){
									     fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'datetimefield',
							                format: 'Y-m-d H:i:s',
											allowBlank:false
									   });
									}else if(value=='varchar'){
									      fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											allowBlank:false
									   });
									}else{
									     fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'numberfield',
											allowBlank:false
									    });
									}
									fp.doLayout(true);
								}
							}
						}, {
							fieldLabel : '系列号',
							name : 'reportParam.sn',
							id : 'sn',
							allowBlank:false
						},{
					        fieldLabel : '缺省值',
							name : 'reportParam.defaultVal',
							id : 'defaultVal',
							allowBlank:false
						 }

				]
			});

	if (this.paramId != null && this.paramId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/system/getReportParam.do?paramId='
					+ this.paramId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var value = action.result.data.paramType;
				var dfvalue = action.result.data.defaultVal;
					var fp=Ext.getCmp('ReportParamForm');
									fp.remove('defaultVal');
									if(value=='date'){
									   fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'datefield',
											format:'Y-m-d',
											allowBlank:false,
											value:dfvalue
									   });
									  
									}else if(value=='datetime'){
									     fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'datetimefield',
							                format: 'Y-m-d H:i:s',
											allowBlank:false,
											value:dfvalue
									   });
									}else if(value=='varchar'){
									      fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											allowBlank:false
									   });
									}else{
									     fp.add({
									        fieldLabel : '缺省值',
											name : 'reportParam.defaultVal',
											id : 'defaultVal',
											xtype:'numberfield',
											allowBlank:false
									    });
									}
									fp.doLayout(true);
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
