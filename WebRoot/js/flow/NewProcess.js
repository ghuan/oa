/**
 *新建流程 
 */
var NewProcess = function(){
	return this.getView();
};

NewProcess.prototype.getView=function(){
		var selectedNode;
 		var proDefView=new ProDefinitionView(false);//不能进行数据的管理
 		var treePanel = new Ext.tree.TreePanel({
				region : 'west',
				title : '流程分类',
				collapsible : true,
				split : true,
				width : 150,
				height : 900,
				tbar:new Ext.Toolbar({items:[{
						xtype:'button',
						iconCls:'btn-refresh',
						text:'刷新',
						handler:function(){
							treePanel.root.reload();
						}
					}
					]}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/flow/rootProType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : function(node){
						proDefView.setTypeId(node.id);
						//注意id区别于流程管理的Grid
						var defGridView=Ext.getCmp('ProDefinitionGrid0');
						defGridView.getStore().proxy.conn.url=__ctxPath + '/flow/listProDefinition.do?typeId='+node.id;
						defGridView.getStore().load({
											params : {
												start : 0,
												limit : 25
											}
										});
						
					}
				}
			});

	var panel = new Ext.Panel({
			title : '新建流程',
			layout : 'border',
			iconCls:'menu-flowNew',
			id:'NewProcess',
			height : 800,
			items : [treePanel,proDefView.getView()]
	});
	
	return panel;

}