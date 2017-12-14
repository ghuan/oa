Ext.ns('DictionaryView');
/**
 * [Dictionary]列表
 */
var DictionaryView = function() {
	return new Ext.Panel({
		id : 'DictionaryView',
		iconCls : 'menu-dictionary',
		title : '字典列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DictionarySearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '条目'
					}, {
						id : 'DicSearchFormItemName',
						width : 120,
						name : 'Q_itemName_S_LK',
						maxHeight : 200,
						xtype : 'combo',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [],
						listeners : {
							focus : function(combo) {
								var _store = Ext
										.getCmp('DicSearchFormItemName')
										.getStore();
								if (_store.getCount() <= 0)
									Ext.Ajax.request({
										url : __ctxPath
												+ '/system/itemsDictionary.do',
										method : 'post',
										success : function(response) {
											var result = Ext.util.JSON
													.decode(response.responseText);
											_store.loadData(result);
										}
									});
							},
							select : function(combo, rec, rowIndex) {
								var _store = Ext
										.getCmp('DicSearchFormItemValue')
										.getStore();
								Ext.Ajax.request({
											url : __ctxPath
													+ '/system/loadDictionary.do',
											method : 'post',
											params : {
												itemName : combo.value
											},
											success : function(response) {
												var result = Ext.util.JSON
														.decode(response.responseText);
												_store.loadData(result);
											}
										});
							}
						}
					}, {
						text : '数值'
					}, {
						id : 'DicSearchFormItemValue',
						width : 120,
						name : 'Q_itemValue_S_LK',
						maxHeight : 200,
						xtype : 'combo',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : []
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('DictionarySearchForm');
							var grid = Ext.getCmp('DictionaryGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/system/listDictionary.do',
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
DictionaryView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DictionaryView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'dicId',
					dataIndex : 'dicId',
					hidden : true
				}, {
					header : '条目',
					dataIndex : 'itemName'
				}, {
					header : '数值',
					dataIndex : 'itemValue'
				}, {
					header : '备注',
					dataIndex : 'descp',
					renderer : function(value) {
						if (value == null || value == ''
								|| value == 'undefined') {
							return '无';
						} else {
							return value;
						}
					}
				}, {
					header : '管理',
					dataIndex : 'dicId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.dicId;
						var str = '';
						if (isGranted('_DictionaryDel')) {
							str += '<button title="删除" value=" " class="btn-del" onclick="DictionaryView.remove('
									+ editId + ')">&nbsp;&nbsp;</button>';
						}
						if (isGranted('_DictionaryEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="DictionaryView.edit('
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
				id : 'DictionaryGrid',
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
							displayMsg : '当前显示{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							if (isGranted('_DictionaryEdit')) {
								DictionaryView.edit(rec.data.dicId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
DictionaryView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listDictionary.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'dicId',
										type : 'int'
									}

									, 'itemName', 'itemValue', 'descp']
						}),
				remoteSort : true
			});
	store.setDefaultSort('dicId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DictionaryView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'DictionaryFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_DictionaryAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加字典',
					handler : function() {
						new DictionaryForm();
					}
				}));
	}
	if (isGranted('_DictionaryDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除字典',
					handler : function() {

						var grid = Ext.getCmp("DictionaryGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.dicId);
						}

						DictionaryView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
DictionaryView.remove = function(id) {
	var grid = Ext.getCmp("DictionaryGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/system/multiDelDictionary.do',
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
DictionaryView.edit = function(id) {
	new DictionaryForm(id);
}
