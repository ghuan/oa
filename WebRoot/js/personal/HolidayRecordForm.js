var HolidayRecordForm = function(recordId) {
	this.recordId = recordId;
	var fp = this.setup();
	var window = new Ext.Window({
		id : 'HolidayRecordFormWin',
		title : '假期设置详细信息',
		iconCls:'menu-holidayRecord',
		width : 390,
		height : 270,
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
				var fp = Ext.getCmp('HolidayRecordForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '成功保存信息！');
							Ext.getCmp('HolidayRecordGrid').getStore().reload();
							window.close();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show({
										title : '操作信息',
										msg : '信息保存出错，请联系管理员！',
										buttons : Ext.MessageBox.OK,
										icon : 'ext-mb-error'});
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

HolidayRecordForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/personal/saveHolidayRecord.do',
				layout : 'form',
				id : 'HolidayRecordForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'HolidayRecordFormId',
				defaultType : 'textfield',
				items : [{
							name : 'holidayRecord.recordId',
							id : 'recordId',
							xtype : 'hidden',
							value : this.recordId == null ? '' : this.recordId
						}, {
							fieldLabel : '开始日期',
							name : 'holidayRecord.startTime',
							xtype:'datefield',
							format:'Y-m-d',
							id : 'startTime'
						}, {
							fieldLabel : '结束日期',
							xtype:'datefield',
							name : 'holidayRecord.endTime',
							id : 'endTime',
							format:'Y-m-d'
						}, {
							fieldLabel:'描述',
							xtype:'textarea',
							name:'holidayRecord.descp',
							id:'descp'
						},{
							xtype : 'container',
							layout : 'column',
							style : 'padding-left:0px;margin-left:0px;margin-bottom:4px;',
							defaultType : 'textfield',
							height : 26,
							items : [{
										xtype : 'label',
										text : '所属用户:',
										style : 'padding-left:0px;margin-left:0px;margin-bottom:4px;',
										width : 100
									}, {
										name : 'holidayRecord.fullname',
										id : 'fullname'
									}, {
										xtype:'hidden',
										name:'holidayRecord.userId',
										id:'userId'
									},{
										xtype : 'button',
										text : '选择',
										id:'userSelect',
										iconCls : 'btn-select',
										width : 80,
										//人员选择器
										handler : function() {
											UserSelector.getView(
													function(ids, names) {
													  var fullname = Ext.getCmp('fullname');
													  var userId = Ext.getCmp('userId');
													  fullname.setValue(names);
													  userId.setValue(ids);
													},true).show();//true表示单选
										}
									}]

						},		
						 {
							fieldLabel : '全公司假期',
							name : 'holidayRecord.isAll',
							id : 'isAll',
							xtype:'checkbox',
							inputValue:'0',
							listeners:{
								check:function(ck,isChecked){
									var fullname = Ext.getCmp('fullname');
									var userId = Ext.getCmp('userId');
									var userSelect = Ext.getCmp('userSelect');
									if(isChecked){
										fullname.setValue('');
										fullname.setDisabled(true);
										userSelect.setDisabled(true);
										userId.setValue('');
									}else{
										fullname.setDisabled(false);
										userSelect.setDisabled(false);
									}
								}
							}
						}
				]
			});

	if (this.recordId != null && this.recordId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/personal/getHolidayRecord.do?recordId='
					+ this.recordId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var result = action.result.data;
				var startTime = getDateFromFormat(result.startTime,'yyyy-MM-dd HH:mm:ss');
				var endTime = getDateFromFormat(result.endTime,'yyyy-MM-dd HH:mm:ss');
				
				Ext.getCmp('startTime').setValue(new Date(startTime));
				Ext.getCmp('endTime').setValue(new Date(endTime));
				
				if(result.isAll==1){
					Ext.getCmp('isAll').setValue(true);
				}
				
			},
			failure : function(form, action) {
			}
		});
	}
	return formPanel;

};
