Ext.ns('SearchNews');
/**
 * 新闻列表
 */
var SearchNews = function(_searchContent) {
	return this.getView(_searchContent);
}
/**
 * 显示列表
 * 
 * @return {}
 */
SearchNews.prototype.getView = function(_searchContent) {
	return new Ext.Panel({
		id : 'SearchNews',
		title : '搜索新闻',
		iconCls:'menu-news',
		width : '100%',
		border:false,
		style:'padding-bottom:10px;',
		autoScroll : true,
		items : [{
					region : 'center',
					anchor :'100%',
					items : [new Ext.FormPanel({
							height : 35,
							frame : true,
							id : 'ALLNewsSearchForm',
							layout : 'column',
							defaults : {
								xtype : 'label'
							},
							items : [{
										text : '请输入条件:'
									}, {
										xtype : 'textfield',
										name : 'searchContent',
										width : 150
									},{
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										handler : function() {
											var searchPanel = Ext.getCmp('ALLNewsSearchForm');
											var grid = Ext.getCmp('SearchNewsGrid');
											if (searchPanel.getForm().isValid()) {
												searchPanel.getForm().submit({
													waitMsg : '正在提交查询',
													url : __ctxPath
															+ '/info/searchNews.do',
													success : function(
															formPanel, action) {
														var result = Ext.util.JSON.decode(action.response.responseText);
														grid.getStore().loadData(result);
													}
												});
											}

										}
									}, {
										xtype : 'button',
										text : '重置',
										iconCls : 'reset',
										handler : function() {
											var searchPanel = Ext
													.getCmp('ALLNewsSearchForm');
											searchPanel.getForm().reset();
										}
									}]
						}),this.setup(_searchContent)]
				}]
	});
};
/**
 * 建立视图
 */
SearchNews.prototype.setup = function(_searchContent) {
	return this.grid(_searchContent);
};
/**
 * 建立DataGrid
 */
SearchNews.prototype.grid = function(_searchContent) {
	var cm = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), {
					header : 'newsId',
					dataIndex : 'newsId',
					hidden : true
				},
				{
					header : '新闻图标',
					width : 120,
					dataIndex : 'subjectIcon',
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var icon = record.data.subjectIcon;
						var str = null;
						if(icon!=''){
							str = '<img style="border:0;" width="48" height="48" src="'+ __ctxPath+ '/attachFiles/'+ icon+ '" border="0"/>';
						}else{
							str = '<img style="border:0;" width="48" height="48" src="'+ __ctxPath+ '/images/default_newsIcon.jpg" border="0"/>';
						}
						return str;
					}
				}, {
					header : '新闻标题',
					width : 210,
					dataIndex : 'subject'
				}, {
					header : '作者',
					width : 120,
					dataIndex : 'author'
				}, {
					header : '创建时间',
					width:210,
					dataIndex : 'createtime'
				}, {
					header : '回复次数',
					width : 120,
					dataIndex : 'replyCounts'
				}, {
					header : '浏览数',
					width : 120,
					dataIndex : 'viewCounts'
				}, {
					header : '状态',
					width : 120,
					dataIndex : 'status',
					renderer : function(value) {
						return value == 0 ? '禁用' : '生效'
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});

	var store = this.store();
	store.load({
				params : {
					start : 0,
					limit : 7,
					searchContent:_searchContent
				}
			});
	var grid = new Ext.grid.GridPanel({
				id : 'SearchNewsGrid',
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				autoScroll : true,
				loadMask : true,
				autoHeight : true,
				sortable : false,
				cm : cm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 7,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							App.clickTopTab('NewsDetail',rec.data.newsId,function(){
										AppUtil.removeTab('NewsDetail');
									});
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
SearchNews.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/searchNews.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'newsId',
										type : 'int'
									}

									, 'typeId', 'subjectIcon', 'subject',
									'author', 'createtime', 'replyCounts',
									'viewCounts', 'content', 'updateTime',
									'status']
						}),
				remoteSort : true
			});
	store.setDefaultSort('newsId', 'desc');
	return store;
};
