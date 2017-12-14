Ext.ns("ProcessNextForm")
/**
 *　流程下一步明细，显示下一步要处理的表，允许任务者进行审批，并转至下一步 
 */
var ProcessNextForm=function(exeId,taskName){
	this.exeId=exeId;
	this.taskName=taskName;
	return this.setup();
};

ProcessNextForm.prototype.setup=function(){
	//显示流程示意图
	var imgPanel=new Ext.Panel({
 		title:'流程示意图',
 		collapsible: true,
 		/*collapsed:true,*/
 		html:'<img src="'+__ctxPath+ '/jbpmImage?piId='+this.exeId+ '&rand=' + Math.random()+ '"/>'
 	});
 	
 	var footbar=new Ext.Toolbar({height:30});
 	
 	//显示审批表单
 	var formPanel=new Ext.FormPanel({
		title:'审批任务'+ this.taskName,
		margin:'5 5 5 5',
		border:0,
		frame:true,
		height:200,
		buttonAlign:'center',
		autoHeight:true,
		fbar:footbar
	});
	
	var activityName=this.taskName.split('--')[1];
	//加载审批表单
	Ext.Ajax.request({
		url:__ctxPath+ "/flow/getProcessActivity.do",
		params:{
			activityName:activityName,
			piId:this.exeId
		},
		success:function(response,options){
			try{
				var object=Ext.util.JSON.decode(response.responseText);
				formPanel.add(object.data);
				formPanel.doLayout();
			}catch(e){
				Ext.ux.Toast.msg('表单加载信息','流程表单加载出现异常！'+e);
			}
		}
	});
	
	var exeId=this.exeId;
	//加载审批表单的功能按钮
 	Ext.Ajax.request({
		url:__ctxPath+ "/flow/transProcessActivity.do",
		params:{
			piId:this.exeId
		},
		success:function(response,options){
			var object=Ext.util.JSON.decode(response.responseText);
			for(var i=0;i<object.data.length;i++){
				footbar.add(ProcessNextForm.genFormButton(formPanel,exeId,object.data[i].name,object.data[i].destination,activityName));
			}
			footbar.doLayout();
		}
	});
	
 	// 左显示流程示意图
	var leftPanel = new Ext.Panel({
		region:'west',
 		margin:'5 5 5 5',
 		autoHeight:true,
 		width:500,
 		split:true,
 		items:[
 			imgPanel,formPanel
 		]
	});
 	
 	//右边显示流程图的全部图
 	var rightPanel=this.getRightPanel(this.exeId);
 	
 	var topPanel=new Ext.Panel({
 		id:'ProcessForm'+this.exeId,
 		iconCls:'btn-approvalTask',
 		title:this.taskName,
 		layout:'border',
 		autoScroll:true,
 		items:[
 			leftPanel,rightPanel
 		]
 	});
 	return topPanel;
};

ProcessNextForm.prototype.getRightPanel=function(exeId){
	//显示流程审批的表单
	var tPanel=new Ext.Panel({
		title:'审批信息',
		region:'center',
		width:500,
		autoHeight:true,
		autoScroll:true,
		autoLoad:{
			url:__ctxPath+'/flow/processRunDetail.do?randId='+Math.random()+'&piId='+exeId
		}
	});
	return tPanel;
};
/**
 * 产生表单的功能按钮
 * @param {} piId
 * @param {} destName
 * @param {} signalName
 * @param {} taskName
 * @return {}
 */
ProcessNextForm.genFormButton=function(formPanel,piId,signalName,destName,activityName){
	return new Ext.Button({
			text:'转至：'+destName,
			listeners:{
				'click':function(){
					var form=formPanel.getForm();
					if(form.isValid()){//是合法有效
						form.submit({
							url:__ctxPath+ "/flow/nextProcessActivity.do",
							method:'post',
							waitMsg:'正在提交处理，请稍等',
							params:{
								piId:piId,
								signalName:signalName,
								activityName:activityName
							},
							success : function(fp, action) {
								Ext.ux.Toast.msg('操作信息','成功保存！');
								AppUtil.removeTab('ProcessForm'+piId);
								var myTaskView=Ext.getCmp("MyTaskView");
								if(myTaskView!=null){
									AppUtil.activateTab(myTaskView);
									myTaskView.getStore().reload();
								}
							},
							failure : function(fp, action) {
								Ext.MessageBox.show({
											title : '操作信息',
											msg : '操作出错，请联系管理员！',
											buttons : Ext.MessageBox.OK,
											icon : 'ext-mb-error'
								});
								AppUtil.removeTab('ProcessForm'+piId);
							}
						});
					}
				}
			}
	});
}