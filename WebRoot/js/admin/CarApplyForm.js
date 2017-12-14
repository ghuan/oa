var CarApplyForm = function(applyId) {
	this.applyId = applyId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'CarApplyFormWin',
				title : '车辆申请详细信息',
				iconCls:'menu-car_apply',
				x:250,
				y:80,
				width : 540,
				autoHeight:true,
				shadow:false,
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
						var fp = Ext.getCmp('CarApplyForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('CarApplyGrid').getStore()
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

CarApplyForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/admin/saveCarApply.do',
				layout : 'form',
				id : 'CarApplyForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'CarApplyFormId',
				defaultType : 'textfield',
				items : [{
							name : 'carApply.applyId',
							id : 'applyId',
							xtype : 'hidden',
							value : this.applyId == null ? '' : this.applyId
						},{
						    xtype:'hidden',
						    id:'carId',
						    name:'carApply.carId'
						},{
						    xtype:'hidden',
						    id:'userId',
						    name:'carApply.userId'
						},{
						xtype:'container',
						layout:'column',
						style:'padding-left:0px;margin-bottom:4px;',
						items:[{
						    xtype:'label',
						    style:'padding-left:0px;',
						    text:'车牌号码:',
						    width:102
						},{
							xtype:'textfield',
							name : 'carNo',
							id : 'carNo',
							allowBlank:false,
							editable : false,
							readOnly:true,
							blankText:'不能为空!',
							width:220
						},{
						    xtype:'button',
						    iconCls:'btn-car',
						    text:'选择车辆',
						    handler:function(){
						        CarSelector.getView(
						            function(id,name){
						                 Ext.getCmp('carNo').setValue(name);
						            	 Ext.getCmp('carId').setValue(id);
						            },true,1    //1表示可用的车
						        ).show();
						    }
						},{
						    xtype:'button',
						    text:'清除记录',
						    iconCls:'reset',
						    handler:function(){
						       Ext.getCmp('carNo').setValue('');
						       Ext.getCmp('carId').setValue('');
						    }
						}]},{ 
						xtype:'container',
						style:'padding-left:0px;margin-bottom:4px;',
						id:'depContainer',
						layout:'column',
						items:[{
						    xtype:'label',
						    style:'padding-left:0px;',
						    text:'用车部门:',
						    width:102
						},{
							xtype:'textfield',
							name : 'carApply.department',
							id : 'department',
							allowBlank:false,
							editable : false,
							readOnly:true,
							width:220
						},{
						    xtype:'button',
						    iconCls:'btn-dep-sel',
						    text:'选择部门',
						    handler:function(){
						       DepSelector.getView(
						             function(id,name){
						                Ext.getCmp('department').setValue(name);
						             }
						       ).show();
						    }
						},{
						   xtype:'button',
						   text:'清除记录',
						   iconCls:'reset',
						   handler:function(){
						      Ext.getCmp('department').setValue('');
						   }
						}]}, {
						xtype:'container',
						style:'padding-left:0px;margin-bottom:4px;',
						layout:'column',
						items:[{
						    xtype:'label',
						    style:'padding-left:0px;',
						    text:'用车人:',
						    width:102
						},{
							xtype:'textfield',
							name : 'carApply.userFullname',
							id : 'userFullname',
							allowBlank:false,
							editable : false,
							readOnly:true,
							width:220
						},{
						    xtype:'button',
						    iconCls:'btn-user-sel',
						    text:'选择人员',
						    handler:function(){
						       UserSelector.getView(
						          function(id,name){
						             Ext.getCmp('userFullname').setValue(name);
						          }
						       ).show();
						    }
						},{
						    xtype:'button',
						    text:'清除记录',
						    iconCls:'reset',
						    handler:function(){
						       Ext.getCmp('userFullname').setValue('');
						    }
						}]}, {
						xtype:'container',
						layout:'column',
						style:'padding-left:0px;margin-bottom:4px;',
						items:[{
						    xtype:'label',
						    style:'padding-left:0px;',
						    text:'申请人:',
						    width:102
						},{
							xtype:'textfield',
							name : 'carApply.proposer',
							id : 'proposer',
							editable : false,
							allowBlank:false,
							readOnly:true,
							width:220
						},{
						    xtype:'button',
						    iconCls:'btn-user-sel',
						    text:'选择人员',
						    handler:function(){
						       UserSelector.getView(
						          function(id,name){
						             Ext.getCmp('proposer').setValue(name);
						             Ext.getCmp('userId').setValue(id);
						          },true
						       ).show();
						    }
						},{
						    xtype:'button',
						    text:'清除记录',
						    iconCls:'reset',
						    handler:function(){
						       Ext.getCmp('proposer').setValue('');
						    }
						}]}, {
							fieldLabel : '申请时间',
							name : 'carApply.applyDate',
							id : 'applyDate',
							xtype:'datefield',
							format:'Y-m-d',
							allowBlank:false,
							editable : false,
							readOnly:true
						}, {
							fieldLabel : '原因',
							name : 'carApply.reason',
							id : 'reason',
							allowBlank:false,
							xtype:'textarea'
						}, {
							fieldLabel : '审批状态',
							hiddenName : 'carApply.approvalStatus',
							id : 'approvalStatus',
							xtype : 'combo',
							mode : 'local',
							allowBlank:false,
							editable : false,
							readOnly:true,
							triggerAction : 'all',
							store : [['0', '未审批'], ['1', '已审批']]
						}, {
							fieldLabel : '开始时间',
							name : 'carApply.startTime',
							id : 'startTime',
							xtype:'datetimefield',
							format:'Y-m-d H:i:s',
							allowBlank:false,
							editable : false,
							readOnly:true
						}, {
							fieldLabel : '结束时间',
							name : 'carApply.endTime',
							id : 'endTime',
							xtype:'datetimefield',
							format:'Y-m-d H:i:s'
						}, {
							fieldLabel : '里程',
							name : 'carApply.mileage',
							id : 'mileage'
						}, {
							fieldLabel : '油耗',
							name : 'carApply.oilUse',
							id : 'oilUse'
						}, {
							fieldLabel : '备注',
							name : 'carApply.notes',
							id : 'notes',
							xtype:'textarea'
						}

				]
			});

	if (this.applyId != null && this.applyId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/admin/getCarApply.do?applyId='
							+ this.applyId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						Ext.getCmp('carNo').setValue(action.result.data.car.carNo);
						Ext.getCmp('carId').setValue(action.result.data.car.carId);
						Ext.getCmp('applyDate').setValue(new Date(getDateFromFormat(action.result.data.applyDate, "yyyy-MM-dd HH:mm:ss")));
						Ext.getCmp('startTime').setValue(new Date(getDateFromFormat(action.result.data.startTime, "yyyy-MM-dd HH:mm:ss")));
						var endTime=action.result.data.endTime;
						if(endTime!=null&&endTime!=''){
						   Ext.getCmp('endTime').setValue(new Date(getDateFromFormat(endTime, "yyyy-MM-dd HH:mm:ss")));
						}
					},
					failure : function(form, action) {
						 Ext.ux.Toast.msg('编辑', '载入失败');
					}
				});
	}
	return formPanel;

};
