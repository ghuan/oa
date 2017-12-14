Ext.ns("PersonalPhoneBookView");

/**
 * 个人通讯薄目录视图
 */
var PersonalPhoneBookView = function() {
	var selectedNode;

	var phoneBookView = new PhoneBookView();

	var treePanel = new Ext.tree.TreePanel({
				region : 'west',
				id : 'leftBookPanel',
				title : '我的通讯分组',
				collapsible : true,
				split : true,
				width : 160,
				height : 800,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : '刷新',
										handler : function() {
											treePanel.root.reload();
										}
									}, {
										xtype : 'button',
										text : '展开',
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, {
										xtype : 'button',
										text : '收起',
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/communicate/listPhoneGroup.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : function(node) {
						if (node != null) {
							phoneBookView.setPhoneId(node.id);
							var bookView = Ext.getCmp('PhoneBookView');
							if (node.id == 0) {
								bookView.setTitle('所有联系人');
							} else {
								bookView.setTitle(node.text + '组列表');
							}

							var store = PhoneBookView.store;
							store.url = __ctxPath
									+ '/communicate/listPhoneBook.do';
							store.baseParams = {
								groupId : node.id
							};
							// store.params={start:0,limit:8};
							store.reload({
										params : {
											start : 0,
											limit : 8
										}
									});
						}
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
	// 树的右键菜单的
	treePanel.on('contextmenu', contextmenu, treePanel);

	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu({
				tbar : new Ext.Toolbar({
							items : [{
										text : '刷新',
										handler : function() {
											alert('refresh');
										}
									}]
						}),
				id : 'PhoneBookTreeMenu',
				items : [{
							text : '新建组',
							scope : this,
							iconCls : 'btn-add',
							handler : createNode
						}, {
							text : '修改组',
							scope : this,
							iconCls : 'btn-edit',
							handler : editNode
						}, {
							text : '删除组',
							scope : this,
							iconCls : 'btn-delete',
							handler : deleteNode
						}, {
							text : '上移',
							scope : this,
							iconCls : 'btn-up',
							handler : upMove
						}, {
							text : '下移',
							scope : this,
							iconCls : 'btn-last',
							handler : downMove
						}, {
							text : '置顶',
							scope : this,
							iconCls : 'btn-top',
							handler : topMove
						}, {
							text : '置底',
							scope : this,
							iconCls : 'btn-down',
							handler : underMove
						}]
			});

	// 新建目录
	function createNode() {
		new PhoneGroupForm(null);

	};
	// 编辑目录
	function editNode() {
		var groupId = selectedNode.id;
		if (groupId > 0) {
			new PhoneGroupForm(groupId);
		} else {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : '该处不能被修改',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
		}
	};
	// 删除目录，子目录也一并删除
	function deleteNode() {
		var groupId = selectedNode.id;
		Ext.Ajax.request({
			url : __ctxPath + '/communicate/countPhoneGroup.do',
			params : {
				'Q_phoneGroup.groupId_L_EQ' : groupId
			},
			method : 'post',
			success : function(result, request) {
				var count = Ext.util.JSON.decode(result.responseText).count;
				Ext.Msg.confirm('删除操作', '组里还有' + count + '个联系人，你确定删除目录组吗?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : __ctxPath
											+ '/communicate/multiDelPhoneGroup.do',
									params : {
										ids : groupId
									},
									method : 'post',
									success : function(result, request) {
										Ext.ux.Toast.msg('操作信息', '成功删除目录！');
										treePanel.root.reload();
										var store = PhoneBookView.store;
										store.reload({
													params : {
														start : 0,
														limit : 8
													}
												});
									},

									failure : function(result, request) {
										Ext.MessageBox.show({
													title : '操作信息',
													msg : '信息保存出错，请联系管理员！',
													buttons : Ext.MessageBox.OK,
													icon : 'ext-mb-error'
												});
									}

								});

							}
						});
				
			},
			failure : function(result, request) {
			}
		});

	};

	function upMove() {
		var groupId = selectedNode.id;
		Ext.Ajax.request({
					url : __ctxPath + '/communicate/movePhoneGroup.do',
					params : {
						groupId : groupId,
						optId : 1
					},
					method : 'post',
					success : function(result, request) {
						treePanel.root.reload();
					},

					failure : function(result, request) {
					}

				});
	};

	function downMove() {
		var groupId = selectedNode.id;
		Ext.Ajax.request({
					url : __ctxPath + '/communicate/movePhoneGroup.do',
					params : {
						groupId : groupId,
						optId : 2
					},
					method : 'post',
					success : function(result, request) {
						treePanel.root.reload();
					},

					failure : function(result, request) {
					}

				});
	};

	function topMove() {
		var groupId = selectedNode.id;
		Ext.Ajax.request({
					url : __ctxPath + '/communicate/movePhoneGroup.do',
					params : {
						groupId : groupId,
						optId : 3
					},
					method : 'post',
					success : function(result, request) {
						treePanel.root.reload();
					},

					failure : function(result, request) {
					}

				});
	};

	function underMove() {
		var groupId = selectedNode.id;
		Ext.Ajax.request({
					url : __ctxPath + '/communicate/movePhoneGroup.do',
					params : {
						groupId : groupId,
						optId : 4
					},
					method : 'post',
					success : function(result, request) {
						treePanel.root.reload();
					},

					failure : function(result, request) {
					}

				});
	};

	var panel = new Ext.Panel({
				title : '我的通讯薄',
				iconCls : "menu-personal-phoneBook",
				layout : 'border',
				id : 'PersonalPhoneBookView',
				height : 800,
				items : [treePanel, phoneBookView.getView()]
			});

	return panel;
};
