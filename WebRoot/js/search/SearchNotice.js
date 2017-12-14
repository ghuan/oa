Ext.ns('SearchNotice');
/**
 * 新闻列表
 */
var SearchNotice = function(_searchContent) {
	return this.getView(_searchContent);
}
/**
 * 显示列表
 * 
 * @return {}
 */
SearchNotice.prototype.getView = function(_searchContent) {
	return new Ext.Panel({
		id : 'SearchNotice',
		title : '搜索公告',
		iconCls:'menu-notice',
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
							id : 'ALLNoticeSearchForm',
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
											var searchPanel = Ext.getCmp('ALLNoticeSearchForm');
											var grid = Ext.getCmp('SearchNoticeGrid');
											if (searchPanel.getForm().isValid()) {
												searchPanel.getForm().submit({
													waitMsg : '正在提交查询',
													url : __ctxPath
															+ '/info/searchNotice.do',
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
													.getCmp('ALLNoticeSearchForm');
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
SearchNotice.prototype.setup = function(_searchContent) {
	return this.grid(_searchContent);
};
/**
 * 建立DataGrid
 */
SearchNotice.prototype.grid = function(_searchContent) {
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), {
					header : 'noticeId',
					dataIndex : 'noticeId',
					hidden : true
				}, {
					header : '发布者',
					dataIndex : 'postName'
				}, {
					header : '公告标题',
					dataIndex : 'noticeTitle'
				},{
					header : '生效日期',
					dataIndex : 'effectiveDate',
					renderer:function(value){
						return value.substring(0,10);
					}
				}, {
					header : '失效日期',
					dataIndex : 'expirationDate',
					renderer : function(value){
						return value.substring(0,10);
					}
				}, {
					header : '状态',
					dataIndex : 'state',
					renderer : function(value) {
						return value == "1" ? "正式发布" : "草稿";
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
				id : 'SearchNoticeGrid',
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
							App.clickTopTab('NoticeDetail',rec.data.noticeId,function(){
										AppUtil.removeTab('NoticeDetail');
									});
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
SearchNotice.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/searchNotice.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'noticeId',
										type : 'int'
									}, 'postName', 'noticeTitle', 'effectiveDate',
									'expirationDate', 'state']
						}),
				remoteSort : true
			});
	store.setDefaultSort('noticeId', 'desc');
	return store;
};
