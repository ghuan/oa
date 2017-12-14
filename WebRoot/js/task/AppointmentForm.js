var AppointmentForm = function(appointId) {
	this.appointId = appointId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'AppointmentFormWin',
				iconCls:'menu-appointment',
				title : '约会详细信息',
				width : 500,
				height : 420,
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
						var fp = Ext.getCmp('AppointmentForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('AppointmentGrid').getStore()
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
					iconCls:'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

AppointmentForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/task/saveAppointment.do',
				layout : 'form',
				id : 'AppointmentForm',
				frame : true,
				formId : 'AppointmentFormId',
				defaultType : 'textfield',
				defaults:{
					width:300
				},
				items : [{
							name : 'appointment.appointId',
							id : 'appointId',
							xtype : 'hidden',
							value : this.appointId == null? '': this.appointId
						}, {
							fieldLabel : '主题',
							allowBlank:false,
							name : 'appointment.subject',
							id : 'subject'
						}, {
							fieldLabel : '开始时间',
							name : 'appointment.startTime',
							id : 'startTime',
							allowBlank:false,
							xtype:'datetimefield',
							format: 'Y-m-d H:i:s'
						}, {
							fieldLabel : '结束时间',
							name : 'appointment.endTime',
							id : 'endTime',
							allowBlank:false,
							xtype:'datetimefield',
							format: 'Y-m-d H:i:s'
						}, {
							fieldLabel : '约会内容',
							name : 'appointment.content',
							xtype:'textarea',
							allowBlank:false,
							id : 'content'
						}, {
							fieldLabel : '地点',
							name : 'appointment.location',
							allowBlank:false,
							id : 'location'
						}, {
							fieldLabel : '备注',
							name : 'appointment.notes',
							xtype:'textarea',
							id : 'notes'
						}, {
							fieldLabel : '受邀人Email',
							xtype:'textarea',
							name : 'appointment.inviteEmails',
							id : 'inviteEmails'
						}

				]
			});

	if (this.appointId != null && this.appointId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/task/getAppointment.do?appointId='
					+ this.appointId,
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
