/**
 * 
 * @param {} piId 流程实例id
 * @param {} name 流程名称
 * @param {} defId  流程定义id
 */
var ProcessRunDetail=function(runId,defId,piId,name){
	this.runId=runId;
	this.defId=defId;
	this.piId=piId;
	this.name=name;
	
	return this.setup();
};

ProcessRunDetail.prototype.setup=function(){
	var piId=this.piId;
	var defId=this.defId;
	var leftPanel=new Ext.Panel({
 		title:'流程示意图',
 		width:500,
 		autoScroll:true,
 		height:800,
 		split:true,
 		collapsible: true,
 		/*collapsed:true,*/
 		region:'west',
 		margin:'5 5 5 5',
 		html:'<img src="'+__ctxPath+ '/jbpmImage?piId='+piId+'&defId='+defId+'&rand='+ Math.random()+'"/>'
 	});
 	
 	var rightPanel=this.getRightPanel(this.piId,this.runId);
 	
 	var toolbar=new Ext.Toolbar({
 		height:28,
 		items:[
 			{
 				text:'刷新',
 				iconCls:'btn-refresh',
 				handler:function(){
 					leftPanel.body.update('<img src="'+__ctxPath+ '/jbpmImage?piId='+piId+'&defId='+defId+'&rand='+ Math.random()+'"/>');
 					rightPanel.doAutoLoad();
 				}
 			}
 		]
 	});
 	
 	var topPanel=new Ext.Panel({
 		id:'ProcessRunDetail'+this.runId,
 		title:'流程详细－'+this.name,
 		iconCls:'menu-flowEnd',
 		layout:'border',
 		tbar:toolbar,
 		autoScroll:true,
 		items:[
 			leftPanel,rightPanel
 		]
 	});
 	return topPanel;
};

ProcessRunDetail.prototype.getRightPanel=function(piId,runId){
	var panel=new Ext.Panel({
		title:'流程审批信息',
		region:'center',
		width:400,
		autoScroll:true,
		autoLoad:{
			url:__ctxPath+'/flow/processRunDetail.do?piId='+piId + "&runId="+ runId
		}
	});
	return panel;
};