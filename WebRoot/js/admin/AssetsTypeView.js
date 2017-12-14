Ext.ns('AssetsTypeView');
/**
 * [AssetsType]列表
 */
var AssetsTypeView = function() {
	return new Ext.Panel({
		id : 'AssetsTypeView',
		title : '[AssetsType]列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'AssetsTypeSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '分类名称'
					}, {
						xtype : 'textfield',
						name : 'Q_typeName_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('AssetsTypeSearchForm');
							var grid = Ext.getCmp('AssetsTypeGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listAssetsType.do',
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
AssetsTypeView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
AssetsTypeView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'assetsTypeId',
					dataIndex : 'assetsTypeId',
					hidden : true
				}, {
					header : '分类名称',
					dataIndex : 'typeName'
				}, {
					header : '管理',
					dataIndex : 'assetsTypeId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.assetsTypeId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="AssetsTypeView.remove('
								+ editId + ')">&nbsp;</button>';
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AssetsTypeView.edit('
								+ editId + ')">&nbsp;</button>';
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
				id : 'AssetsTypeGrid',
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
							AssetsTypeView.edit(rec.data.assetsTypeId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
AssetsTypeView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listAssetsType.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'assetsTypeId',
										type : 'int'
									}

									, 'typeName']
						}),
				remoteSort : true
			});
	store.setDefaultSort('assetsTypeId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
AssetsTypeView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'AssetsTypeFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加[AssetsType]',
							xtype : 'button',
							handler : function() {
								new AssetsTypeForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除[AssetsType]',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("AssetsTypeGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids
											.push(selectRecords[i].data.assetsTypeId);
								}

								AssetsTypeView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
AssetsTypeView.remove = function(id) {
	var grid = Ext.getCmp("AssetsTypeGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelAssetsType.do',
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
AssetsTypeView.edit = function(id) {
	new AssetsTypeForm(id);
}
