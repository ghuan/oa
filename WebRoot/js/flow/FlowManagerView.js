/**
 * 流程管理页
 */
 var FlowManagerView=function(){
 	return this.getView();
 };
 
 FlowManagerView.prototype.getView=function(){
 	    var selectedNode;
 		var proDefView=new ProDefinitionView(true);
 		var treePanel = new Ext.tree.TreePanel({
 				id:'proTypeLeftPanel',
				region : 'west',
				title : '流程分类',
				collapsible : true,
				split : true,
				width : 150,
				height : 900,
				tbar:new Ext.Toolbar({
				id:'proTypeAdd',
				items:[{
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
						
						var defGridView=Ext.getCmp('ProDefinitionGrid');
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

    
	function contextmenu(node, e) {
		selectedNode = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
		});
		treeMenu.showAt(e.getXY());
	}
	if(isGranted('_ProTypeManage')){
	Ext.getCmp('proTypeAdd').add(new Ext.Button({
						text:'添加分类',
						iconCls:'btn-add',
						handler:function(){
							new ProTypeForm();
						}
	}));
	//树的右键菜单的
	treePanel.on('contextmenu', contextmenu, treePanel);
	}

	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu({
				id : 'FlowManagerTreeMenu',
				items : [{
							text : '新建分类',
							scope : this,
							iconCls:'btn-add',
							handler : createNode
						}, {
							text : '修改分类',
							scope : this,
							iconCls:'btn-edit',
							handler : editNode
						}, {
							text : '删除分类',
							scope : this,
							iconCls:'btn-delete',
							handler : deleteNode
						}]
			});

	//新建分类
	function createNode() {
		new ProTypeForm();
	};
	//编辑分类
	function editNode() {
		var typeId=selectedNode.id;
		new ProTypeForm(typeId);
	};
	//删除分类
	function deleteNode() {
		var typeId=selectedNode.id;
		$request({
			url:__ctxPath+'/flow/removeProType.do',
			params:{typeId:typeId},
			success:function(result,request){
				treePanel.root.reload();
			}
		});
	};

	var panel = new Ext.Panel({
			title : '流程管理',
			layout : 'border',
			iconCls:'menu-flowManager',
			id:'FlowManagerView',
			height : 800,
			items : [treePanel,proDefView.getView()]
	});
	
	return panel;
 };
