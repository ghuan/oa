/**
 *　流程启动的表单 
 * @param defId 流程定义ID
 * @param name 表单的名称
 */
var ProcessRunStart=function(defId,name,runId,activityName){
	this.defId=defId;
	this.name=name;
	this.activityName=activityName==null?'开始':activityName;
	this.runId=runId;
	return this.setup();
};

/**
 * 流程表单
 */
ProcessRunStart.prototype.setup=function(){
	var formId=this.defId;
	if(formId==undefined ||formId==null){
		formId=this.runId;
	}
	
	var formPanel = new Ext.FormPanel({
		id : 'ProcessRunStart' + formId,
		autoHeight:true,
		iconCls:'btn-newFlow',
		frame : true,
		buttonAlign:'center',
		title : '流程启动－' + this.name,
		items : [{
					xtype : 'hidden',
					name : 'defId',
					value : this.defId
				},{
					xtype:'hidden',
					name:'runId',
					value:this.runId
				},{
					xtype : 'hidden',
					name : 'activityName',
					value : this.activityName
				}],
		buttons : [{
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
					var form = formPanel.getForm();
					if (form.isValid()) {
						form.submit({
									url : __ctxPath + '/flow/saveProcessActivity.do',
									waitMsg : '正在提交信息...',
									success : function(userform, o) {
										Ext.ux.Toast.msg('操作信息','成功保存信息！');
										AppUtil.removeTab(formPanel.getId());
										var runGrid=Ext.getCmp('ProcessRunGrid');
										if(runGrid!=null){
											runGrid.getStore().reload();
										}
									}
								});
					}
				}
			},{
				text : '提交并启动流程',
				iconCls : 'btn-ok',
				handler : function() {
					var form = formPanel.getForm();
					if (form.isValid()) {
						form.submit({
									url : __ctxPath
											+ '/flow/saveProcessActivity.do?startFlow=true',
									waitMsg : '正在提交信息...',
									success : function(userform, o) {
										Ext.ux.Toast.msg('操作信息','成功提交，请查看流程审批情况！');
										AppUtil.removeTab(formPanel.getId());
										var runGrid=Ext.getCmp('ProcessRunGrid');
										if(runGrid!=null){
											runGrid.getStore().reload();
										}
									}
						});
						
					}
				}
			}]
	});
	
	//加载流程开始的表单
	$request({
		url:__ctxPath+ "/flow/getProcessActivity.do",
		params:{
			activityName:this.activityName,
			defId:this.defId,
			runId:this.runId
		},
		success:function(response,options){
			var object=Ext.util.JSON.decode(response.responseText);
			formPanel.add(object.data);
			formPanel.doLayout();
		}
	});
	
	return formPanel;
};