var CartRepairForm = function(repairId) {
	this.repairId = repairId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'CartRepairFormWin',
				title : '车辆维修详细信息',
				iconCls:'menu-car_repair',
				width : 450,
				x:240,
				y:80,
				autoHeight : true,
				modal : true,
				shadow:false,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp = Ext.getCmp('CartRepairForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('CartRepairGrid').getStore()
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
					iconCls : 'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

CartRepairForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/admin/saveCartRepair.do',
				layout : 'form',
				id : 'CartRepairForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'CartRepairFormId',
				defaultType : 'textfield',
				items : [{
							name : 'cartRepair.repairId',
							id : 'repairId',
							xtype : 'hidden',
							value : this.repairId == null ? '' : this.repairId
						}, {
							xtype:'hidden',
							name : 'cartRepair.carId',
							id : 'carId'
						},{
						xtype:'container',
						style:'padding-left:0px;margin-bottom:4px;',
						layout:'column',
						items:[{
						  xtype:'label',
						  style:'padding-left:0px;',
						  text:'车牌号码:',
						  width:102
						},{
						    id:'carNo',
						    xtype:'textfield',
						    name:'carNo',
						    editable:false,
						    readOnly:true,
						    allowBlank:false,
						    width:130
						},{
						    xtype:'button',
						    iconCls:'btn-car',
						    text:'选择车辆',
						    handler:function(){
						        CarSelector.getView(
						           function(id,name){
						              Ext.getCmp('carId').setValue(id);
						              Ext.getCmp('carNo').setValue(name);
						           },true   
						        
						        ).show();
						    }
							
						},{
						    xtype:'button',
						    text:'消除记录',
						    iconCls:'reset',
						    handler:function(){
						       Ext.getCmp('carId').setValue('');
						       Ext.getCmp('carNo').setValue('');
						    }
						}]},{
							fieldLabel : '维护日期',
							name : 'cartRepair.repairDate',
							id : 'repairDate',
							xtype:'datefield',
							format:'Y-m-d',
							allowBlank:false,
							editable:false,
							readOnly:true
						}, {xtype:'container',
						    style:'padding-left:0px;margin-bottom:4px;',
							layout:'column',
							items:[{
							 xtype:'label',
							 style:'padding-left:0px;',
							 text:'经办人:',
							 width:102
							},{
							xtype:'textfield',
							name : 'cartRepair.executant',
							id : 'executant',
							editable:false,
							allowBlank:false,
							readOnly:true,
							width:130
						},{
						    xtype:'button',
						    iconCls:'btn-user-sel',
						    text:'选择人员',
						    handler:function(){
						       UserSelector.getView(
						          function(id,name){
						          	Ext.getCmp('executant').setValue(name);
						          },true
						       ).show();
						    }
						},{
						   xtype:'button',
						   text:'清除纪录',
						   iconCls:'reset',
						   handler:function(){
						      Ext.getCmp('executant').setValue('');
						   }
						}]
						}, {
							fieldLabel : '维修类型',
							name : 'cartRepair.repairType',
							id : 'repairType',
							xtype : 'combo',
							mode : 'local',
							allowBlank:false,
							editable : false,
							readOnly:true,
							triggerAction : 'all',
							store : [['1', '保养'], ['2', '维修']]
						}, {
							fieldLabel : '费用',
							name : 'cartRepair.fee',
							id : 'fee',
							xtype:'numberfield'
						}, {
							fieldLabel : '维护原因',
							name : 'cartRepair.reason',
							id : 'reason',
							allowBlank:false,
							xtype:'textarea'
						}, {
							fieldLabel : '备注',
							name : 'cartRepair.notes',
							id : 'notes',
							xtype:'textarea'
						}

				]
			});

	if (this.repairId != null && this.repairId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getCartRepair.do?repairId='
					+ this.repairId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				Ext.getCmp('carNo').setValue(action.result.data.car.carNo);
				Ext.getCmp('repairDate').setValue(new Date(getDateFromFormat(action.result.data.repairDate, "yyyy-MM-dd HH:mm:ss")));
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
