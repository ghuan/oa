Ext.ns('NewsCommentView');
/**
 * [NewsComment]列表
 */
var NewsCommentView = function() {
	return new Ext.Panel({
		id : 'NewsCommentView',
		title : '评论列表',
		iconCls:'menu-info',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'NewsCommentSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '新闻标题'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_news.subject_S_LK'
					}, {
						text : '时间'
					}, {
						xtype : 'datefield',
						width : 80,
						format : 'Y-m-d',
						name : 'Q_createtime_D_GE'
					}, {
						text : '-'
					}, {
						xtype : 'datefield',
						width : 80,
						format : 'Y-m-d',
						name : 'Q_createtime_D_LE'
					}, {
						text : '评论人'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_fullname_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('NewsCommentSearchForm');
							var grid = Ext.getCmp('NewsCommentGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/info/listNewsComment.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
NewsCommentView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
NewsCommentView.prototype.grid = function() {
	var expander = new Ext.ux.grid.RowExpander({
		tpl : new Ext.Template(
		    '<p style="padding:5px 5px 5px 62px;"><b>评论内容:</b> {content}</p>'
		)
		
    });
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), expander,{
					header : 'commentId',
					dataIndex : 'commentId',
					hidden : true
				}, {
					header : '所属新闻',
					dataIndex : 'news',
					renderer : function(value){
						return value.subject;
					}
				},
//					{
//					header : '评论内容',
//					dataIndex : 'content'
//				}, 
					{
					header : '评论时间',
					dataIndex : 'createtime'
				}, {
					header : '评论人',
					dataIndex : 'fullname'
				},
//				{
//					header : '',
//					dataIndex : 'userId'
//				}, 
					{
					header : '管理',
					dataIndex : 'commentId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.commentId;
						var str='';
						if(isGranted('_NewsCommentDel')){
							str= '<button title="删除" value=" " class="btn-del" onclick="NewsCommentView.remove('
									+ editId + ')">&nbsp;&nbsp;</button>';
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
				id : 'NewsCommentGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				plugins: expander,
				autoHeight : true,
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
							displayMsg : '当前显示{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							NewsCommentView.edit(rec.data.commentId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
NewsCommentView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/listNewsComment.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'commentId',
										type : 'int'
									}

									, 'news', 'content', 'createtime',
									'fullname', 'userId']
						}),
				remoteSort : true
			});
	store.setDefaultSort('commentId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
NewsCommentView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'NewsCommentFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if(isGranted('_NewsCommentDel')){
	  toolbar.add(new Ext.Button({
	    iconCls : 'btn-del',
		text : '删除评论',
		handler : function() {

			var grid = Ext.getCmp("NewsCommentGrid");

			var selectRecords = grid.getSelectionModel()
					.getSelections();

			if (selectRecords.length == 0) {
				Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
				return;
			}
			var ids = Array();
			for (var i = 0; i < selectRecords.length; i++) {
				ids.push(selectRecords[i].data.commentId);
			}

			NewsCommentView.remove(ids);
		}
	  }));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
NewsCommentView.remove = function(id) {
	var grid = Ext.getCmp("NewsCommentGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/info/multiDelNewsComment.do',
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
NewsCommentView.edit = function(id) {
	new NewsCommentForm(id);
}
