Ext.ns('NewsTypeTree');
var NewsTypeTree = function() {
	return this.setup();
};

NewsTypeTree.prototype.setup = function() {
	var selected;// 右键菜单所点的树结点

	// 类别管理树
	var treePanel = new Ext.tree.TreePanel({
				id : 'typeTree',
				title : '新闻类别',
				region : 'west',
				width : 200,
				height : 480,
				autoScroll : true,
				collapsible : true,
				split : true,
				tbar : new Ext.Toolbar({
							width : '100%',
							id : 'newsTypeBar',
							height : 30,
							items : [{
										text : '刷新',
										iconCls : 'refresh',
										handler : function() {
											treePanel.root.reload();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/info/treeNewsType.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : NewsTypeTree.clickNode
				}
			});
	if (isGranted('_NewsTypeAdd') || isGranted('_NewsTypeEdit')
			|| isGranted('_NewsTypeDel')) {
		// 树的右键菜单的
		Ext.getCmp('newsTypeBar').add(new Ext.Button({
					text : '添加',
					iconCls : 'btn-add',
					handler : function() {
						new NewsTypeForm();
					}

				}));
		treePanel.on('contextmenu', contextmenu, treePanel);

	}
	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu({
				id : 'NewsTypeTreeMenu',
				items : []
			});
	if (isGranted('_NewsTypeAdd')) {
		treeMenu.add({
					text : '新建',
					iconCls : 'btn-add',
					scope : this,
					handler : createNode
				});
	}
	if (isGranted('_NewsTypeEdit')) {
		treeMenu.add({
					text : '修改',
					iconCls : 'btn-edit',
					scope : this,
					handler : editNode
				});

	}
	if (isGranted('_NewsTypeDel')) {
		treeMenu.add({
					text : '删除',
					iconCls : 'btn-delete',
					scope : this,
					handler : deteleNode
				});
	}

	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		treeMenu.showAt(e.getXY());
	}
	/**
	 * 菜单事件
	 */
	function createNode() {// 增加结点
		var newsTypeForm = Ext.getCmp('newsTypeForm');
		if (newsTypeForm == null) {
			new NewsTypeForm();
		}

	}
	function deteleNode() {// 删除结点
		var typeId = selected.id;
		var type = Ext.getCmp('typeTree');
		if (typeId > 0) {
			Ext.Msg.confirm('删除操作', '你确定删除新闻类型?', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
										url : __ctxPath
												+ '/info/removeNewsType.do',
										params : {
											typeId : typeId
										},
										method : 'post',
										success : function() {
											Ext.ux.Toast.msg('操作信息', '删除成功!');
											var newsTypeGrid = Ext
													.getCmp('NewsTypeView');
											if (newsTypeGrid != null) {
												newsTypeGrid.getStore()
														.reload();
											}
											if (type != null) {
												type.root.reload();
											}
										}
									});
						}
					});
		}
	}
	function editNode() {// 修改结点
		var typeId = selected.id;
		var newsTypeForm = Ext.getCmp('newsTypeForm');
		if (newsTypeForm == null) {
			new NewsTypeForm();
			newsTypeForm = Ext.getCmp('newsTypeForm');
		}
		newsTypeForm.form.load({
					url : __ctxPath + '/info/detailNewsType.do',
					params : {
						typeId : typeId
					},
					method : 'post',
					deferredRender : true,
					layoutOnTabChange : true,
					waitMsg : '正在载入数据...',
					success : function() {
					},
					failure : function() {
						Ext.ux.Toast.msg('编辑', '载入失败');
					}
				});
	}
	return treePanel;
}
/**
 * 按类别查找新闻
 */
NewsTypeTree.clickNode = function(node) {
	if (node != null) {
		var news = Ext.getCmp('NewsGrid');
		var store = news.getStore();
		store.proxy = new Ext.data.HttpProxy({
					url : __ctxPath + '/info/categoryNews.do'
				});
		store.baseParams = {
			typeId : node.id
		};
		store.reload({
					params : {
						start : 0,
						limit : 25
					}
				});
	}
}