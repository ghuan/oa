/**
 * 下属选择器
 */
var UserSubSelector = {
	getView : function(callback,isSingle) {
		var panel=this.initPanel(isSingle);
		var window = new Ext.Window({
			title : '选择下属',
			iconCls:'menu-subuser',
			width : 440,
			height : 420,
			layout:'fit',
			items : [panel],
			modal:true,
			buttonAlign : 'center',
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						scope:'true',
						handler : function(){
							var grid = Ext.getCmp('SubGrid');
							var rows = grid.getSelectionModel().getSelections();
							var userIds = '';
							var fullnames = '';
							for (var i = 0; i < rows.length; i++) {
					
								if (i > 0) {
									userIds += ',';
									fullnames += ',';
								}
								userIds += rows[i].data.userId;
								fullnames += rows[i].data.fullname;
							}
					
							if (callback != null) {
								callback.call(this, userIds, fullnames);
							}
							window.close();
						}
					}, {
						text : '关闭',
						iconCls:'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		return window;
	},

	initPanel : function(isSingle) {

		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/system/subAdepartmentAppUser.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'userId',
											type : 'int'
										}, 'fullname','title']
							}),
					remoteSort : true
				});
		store.setDefaultSort('id', 'desc');

		store.load({
					params : {
						start : 0,
						limit : 12
					}
				});
		var sm=null;
		if(isSingle){
			var sm=new Ext.grid.CheckboxSelectionModel({singleSelect: true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, new Ext.grid.RowNumberer(), {
								header : "用户名",
								dataIndex : 'fullname',
								renderer:function(value,meta,record){
									var title=record.data.title;
									if(title==1){
										return '<img src="'+__ctxPath+'/images/flag/man.png"/>&nbsp;'+value;
									}else{
										return '<img src="'+__ctxPath+'/images/flag/women.png"/>&nbsp;'+value;
									}
								},
								width : 60
							}],
					defaults : {
						sortable : true,
						menuDisabled : true,
						width : 120
					},
					listeners : {
						hiddenchange : function(cm, colIndex, hidden) {
							saveConfig(colIndex, hidden);
						}
					}
				});

		var treePanel = new Ext.tree.TreePanel({
					id : 'treePanels',
					title : '按部门分类 ',
					iconCls:'dep-user',
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/system/listDepartment.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						'click' : this.clickNode
					}
				});

		var rolePanel = new Ext.tree.TreePanel({
					id : 'rolePanel',
					iconCls:'role-user',
					title : '按角色分类 ',
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/system/treeAppRole.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						'click' : this.clickRoleNode
					}
				});
		var onlinePanel = new Ext.Panel({
					id : 'onlinePanel',
					iconCls:'online-user',
					title : '在线人员  ',
					listeners:{
						'expand':this.clickOnlinePanel
					}
				});

		var SubGrid = new Ext.grid.GridPanel({
					id : 'SubGrid',
					height : 345,
					store : store,
					shim : true,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					cm : cm,
					sm : sm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},

					bbar : new Ext.PagingToolbar({
								pageSize : 12,
								store : store,
								displayInfo : true,
								displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});

		var contactPanel = new Ext.Panel({
					id : 'contactPanel',
					width : 400,
					height : 400,
					layout : 'border',
					border : false,
					items : [{
								region : 'west',
								split : true,
								collapsible : true,
								width : 120,
								margins : '5 0 5 5',
								layout : 'accordion',
								items : [treePanel, rolePanel, onlinePanel]
							}, {
								region : 'center',
								margins : '5 0 5 5',
								width : 230,
								items : [SubGrid]
							}]
				});
		return contactPanel;
	},

	clickNode : function(node) {
		if (node != null) {
			var users = Ext.getCmp('SubGrid');
			var store = users.getStore();
			store.proxy.conn.url = __ctxPath + '/system/subAdepartmentAppUser.do';
			store.baseParams = {
				depId : node.id
			};
			store.load({
						params : {
							start : 0,
							limit : 12
						}
					});
		}
	},

	clickRoleNode : function(node) {
		if (node != null) {
			var users = Ext.getCmp('SubGrid');
			var store = users.getStore();
			store.baseParams = {
				roleId : node.id
			};
			store.proxy.conn.url =__ctxPath + '/system/subAroleAppUser.do';
			store.load({
					params : {
						start : 0,
						limit : 12
					}
				});
		}
	},
	clickOnlinePanel:function(){
		var users = Ext.getCmp('SubGrid');
		var store = users.getStore();
		store.proxy.conn.url =__ctxPath + '/system/onlineAsubAppUser.do';
		store.load({
				params : {
					start : 0,
					limit : 200
				}
		});
	}
};
