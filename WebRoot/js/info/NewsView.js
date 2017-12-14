Ext.ns('NewsView');
/**
 * 新闻列表
 */
var NewsView = function() {
	return this.getView();
}
/**
 * 显示列表
 * 
 * @return {}
 */
NewsView.prototype.getView = function() {
	var newsTypeTree = new NewsTypeTree();
	return new Ext.Panel({
		id : 'NewsView',
		title : '新闻信息',
		iconCls:'menu-news',
		layout : 'border',
		width : '100%',
		autoScroll : true,
		items : [
					newsTypeTree
				, {
					region : 'center',
					anchor :'100%',
					items : [{
						items : [new Ext.FormPanel({
							height : 35,
							frame : true,
							id : 'NewsSearchForm',
							layout : 'column',
							defaults : {
								xtype : 'label'
							},
							items : [{
										text : '请输入条件:'
									}, {
										text : '标题'
									}, {
										xtype : 'textfield',
										name : 'Q_subject_S_LK',
										width : 80
									}, {
										text : '作者'
									}, {
										xtype : 'textfield',
										name : 'Q_author_S_LK',
										width : 80
									},
									{
										xtype : 'button',
										text : '查询',
										iconCls : 'search',
										handler : function() {
											var searchPanel = Ext
													.getCmp('NewsSearchForm');
											var grid = Ext.getCmp('NewsGrid');
											if (searchPanel.getForm().isValid()) {
												searchPanel.getForm().submit({
													waitMsg : '正在提交查询',
													url : __ctxPath
															+ '/info/listNews.do',
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
													.getCmp('NewsSearchForm');
											searchPanel.getForm().reset();
										}
									}]
						}), this.setup()]
					}]
				}]
	});
};
/**
 * 建立视图
 */
NewsView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
NewsView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
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
				}, {
					header : '管理',
					dataIndex : 'newsId',
					width : 210,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.newsId;
						var str='';
						if(isGranted('_NewsDel')){
						str = '<button title="删除" value=" " class="btn-del" onclick="NewsView.remove('
								+ editId + ')">&nbsp</button>';
						}
						if(isGranted('_NewsEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="NewsView.edit('
								+ editId + ')">&nbsp</button>';
						}
						return str;
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
					limit : 25
				}
			});
	var grid = new Ext.grid.GridPanel({
				id : 'NewsGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				autoScroll : true,
				loadMask : true,
				height : 445,
				sortable : false,
				cm : cm,
				sm : sm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							if(isGranted('_NewsEdit')){
							NewsView.edit(rec.data.newsId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
NewsView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/listNews.do'
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

/**
 * 建立操作的Toolbar
 */
NewsView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'NewsFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_NewsAdd')){
			   toolbar.add(new Ext.Button({
			     iconCls : 'btn-add',
							text : '添加',
							handler : function() {
								new NewsForm();
							}
			   }));
			}
			if(isGranted('_NewsDel')){
			  toolbar.add(new Ext.Button({
			    iconCls : 'btn-del',
							text : '删除',
							handler : function() {

								var grid = Ext.getCmp("NewsGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.newsId);
								}

								NewsView.remove(ids);
							}
			  }));
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
NewsView.remove = function(id) {
	var grid = Ext.getCmp("NewsGrid");
	Ext.Msg.confirm('信息确认', '删除新闻,则新闻下的<font color="red">评论</font>也删除,您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/info/multiDelNews.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
									grid.getStore().reload({
												params : {
													start : 0,
													limit : 25
												}
											});
								}
							});
				}
			});
};

/**
 * 
 */
NewsView.edit = function(id) {
	new NewsForm(id);
}
