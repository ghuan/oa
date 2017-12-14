var SalaryItemForm = function(salaryItemId) {
	this.salaryItemId = salaryItemId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'SalaryItemFormWin',
				title : '工资项详细信息',
				iconCls:'menu-salary',
				width : 500,
				height : 150,
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
						var fp = Ext.getCmp('SalaryItemForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('SalaryItemGrid').getStore()
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

SalaryItemForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/hrm/saveSalaryItem.do',
				layout : 'form',
				id : 'SalaryItemForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'SalaryItemFormId',
				defaultType : 'textfield',
				items : [{
							name : 'salaryItem.salaryItemId',
							id : 'salaryItemId',
							xtype : 'hidden',
							value : this.salaryItemId == null
									? ''
									: this.salaryItemId
						}, {
							fieldLabel : '薪酬项名称',
							name : 'salaryItem.itemName',
							allowBlank:false,
							blankText:'薪酬项名称不能为空!',
							id : 'itemName'
						}, {
							fieldLabel : '缺省值',
							name : 'salaryItem.defaultVal',
							allowBlank:false,
							blankText:'缺省值不能为空!',
							id : 'defaultVal'
						}

				]
			});

	if (this.salaryItemId != null && this.salaryItemId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/hrm/getSalaryItem.do?salaryItemId='
					+ this.salaryItemId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				// Ext.Msg.alert('编辑', '载入成功！');
			},
			failure : function(form, action) {
				// Ext.Msg.alert('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
