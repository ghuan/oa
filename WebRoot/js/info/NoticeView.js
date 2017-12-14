Ext.ns('NoticeView');
/**
 * 公告列表
 */
var NoticeView = function() {
	return new Ext.Panel({
		id : 'NoticeView',
		title : '公告列表',
		iconCls : 'menu-notice',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'NoticeSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '发布者'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_postName_S_LK'
					}, {
						text : '标题'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_noticeTitle_S_LK'
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('NoticeSearchForm');
							var grid = Ext.getCmp('NoticeGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/info/listNotice.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
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
							var searchPanel = Ext.getCmp('NoticeSearchForm');
							searchPanel.getForm().reset();

						}
					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
NoticeView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
NoticeView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
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
				}, {
					header : '管理',
					dataIndex : 'noticeId',
					sortable : false,
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.noticeId;
						var str = '';
						if (isGranted('_NoticeDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="NoticeView.remove('
									+ editId + ')"></button>';
						}
						if (isGranted('_NoticeEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="NoticeView.edit('
									+ editId + ')"></button>';
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
				id : 'NoticeGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
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
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							if (isGranted('_NoticeEdit')) {
								NoticeView.edit(rec.data.noticeId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
NoticeView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/listNotice.do'
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

/**
 * 建立操作的Toolbar
 */
NoticeView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'NoticeFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_NoticeAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加公告',
					handler : function() {
						new NoticeForm();
					}
				}));
	}
	if (isGranted('_NoticeDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除公告',
					handler : function() {

						var grid = Ext.getCmp("NoticeGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.noticeId);
						}

						NoticeView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
NoticeView.remove = function(id) {
	var grid = Ext.getCmp("NoticeGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/info/multiDelNotice.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("操作信息", "成功删除所选记录！");
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
NoticeView.edit = function(id) {
	new NoticeForm(id);
}
