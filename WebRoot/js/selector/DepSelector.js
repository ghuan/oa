/**
 * 部门选择器
 */
var DepSelector = {
	/**
	 * @param callback　回调函数
	 * @param isSingle　是否单选
	 */
	getView : function(callback,isSingle) {
		var treeDep = new Ext.tree.TreePanel({
					title : '部门信息显示',
					region : 'west',
					width : 180,
					height : 300,
					split : true,
					collapsible : true,
					autoScroll : true,
					bbar:new Ext.Toolbar({items:[{
						xtype:'button',
						iconCls:'btn-refresh',
						text:'刷新',
						handler:function(){
							treeDep.root.reload();
						}
					},
					{
						xtype:'button',
						text:'展开',
						iconCls:'btn-expand',
						handler:function(){
							treeDep.expandAll();
						}
					},
					{
						xtype:'button',
						text:'收起',
						iconCls:'btn-collapse',
						handler:function(){
							treeDep.collapseAll();
						}
					}
					]}),
					loader : new Ext.tree.TreeLoader({
								url : __ctxPath + '/system/listDepartment.do'
							}),
					root : new Ext.tree.AsyncTreeNode({
								expanded : true
							}),
					rootVisible : false,
					listeners : {
						 'click': function(node) {
								if (node != null) {
									var deps = Ext.getCmp('DepSelectorGrid');
									var store = deps.getStore();
									store.proxy.conn.url = __ctxPath + '/system/selectDepartment.do';
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
								}
					}
				});
				
		// ---------------------------------start grid
		// panel--------------------------------
		var sm=null;
		if(isSingle){
			var sm=new Ext.grid.CheckboxSelectionModel({singleSelect: true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, new Ext.grid.RowNumberer(), {
								header : 'depId',
								dataIndex : 'depId',
								hidden : true
							}, {
								header : "部门名称",
								dataIndex : 'depName',
								renderer:function(value,metadata,record){
									var str='';
									var level=record.data.depLevel;
									if(level!=null&& !isNaN(level)){
										for(var i=2;i<=level;i++){
											str+='<img src="' + __ctxPath+ '/images/system/down.gif"/>';
										}
									}
									str+=value;
									return str;
								},
								width : 60
							}]
				});

		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/system/selectDepartment.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'depId',
								fields : [{
											name : 'depId',
											type : 'int'
										}, 'depName',{name:'depLevel',type:'int'}]
							}),
					remoteSort : true
				});

		var gridPanel = new Ext.grid.GridPanel({
					id : 'DepSelectorGrid',
					width : 400,
					height : 300,
					region : 'center',
					title : '部门列表',
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
					// paging bar on the bottom
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : store,
								displayInfo : true,
								displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});

		store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		// --------------------------------end grid
		// panel-------------------------------------



		var window = new Ext.Window({
					title : '部门选择器',
					iconCls:'menu-department',
					width : 630,
					height : 380,
					layout:'border',
					border:false,
					items : [treeDep, gridPanel],
					modal : true,
					buttonAlign : 'center',
					buttons : [{
								iconCls:'btn-ok',
								text : '确定',
								handler : function() {
										var grid = Ext.getCmp('DepSelectorGrid');
										var rows = grid.getSelectionModel().getSelections();
										var depIds = '';
										var depNames = '';
										for (var i = 0; i < rows.length; i++) {
								
											if (i > 0) {
												depIds += ',';
												depNames += ',';
											}
								
											depIds += rows[i].data.depId;
											depNames += rows[i].data.depName;
								
										}
								
										if (callback != null) {
											callback.call(this, depIds, depNames);
										}
										window.close();
								}
							}, {
								text : '取消',
								iconCls:'btn-cancel',
								handler : function() {
									window.close();
								}
							}]
				});
		return window;
	}

};