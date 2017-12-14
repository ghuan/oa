Ext.ns('SalaryItemView');
/**
 * [SalaryItem]列表
 */
var SalaryItemView = function() {
	return new Ext.Panel({
		id : 'SalaryItemView',
		title : '工资项列表',
		iconCls : 'menu-salary',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'SalaryItemSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '工资项名称'
					}, {
						xtype : 'textfield',
						name : 'Q_itemName_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('SalaryItemSearchForm');
							var grid = Ext.getCmp('SalaryItemGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/hrm/searchSalaryItem.do',
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
SalaryItemView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
SalaryItemView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'salaryItemId',
					dataIndex : 'salaryItemId',
					hidden : true
				}, {
					header : '薪资项名称',
					dataIndex : 'itemName'
				}, {
					header : '缺省值',
					dataIndex : 'defaultVal',
					renderer:function(value){
						return '<img src="' + __ctxPath
								+ '/images/flag/customer/rmb.png"/>' + value;
					}
				}, {
					header : '管理',
					dataIndex : 'salaryItemId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.salaryItemId;
						var str ='';
						if(isGranted('_SalaryItemDel')){
						str+= '<button title="删除" value=" " class="btn-del" onclick="SalaryItemView.remove('
								+ editId + ')">&nbsp;&nbsp;</button>';
						}
						if(isGranted('_SalaryItemEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="SalaryItemView.edit('
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
				id : 'SalaryItemGrid',
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
							SalaryItemView.edit(rec.data.salaryItemId);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
SalaryItemView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/hrm/listSalaryItem.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'salaryItemId',
										type : 'int'
									}

									, 'itemName', 'defaultVal']
						}),
				remoteSort : true
			});
	store.setDefaultSort('salaryItemId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
SalaryItemView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'SalaryItemFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if(isGranted('_SalaryItemAdd')){
	toolbar.add(new Ext.Button({
	   iconCls : 'btn-add',
							text : '添加薪酬项目',
							handler : function() {
								new SalaryItemForm();
							}
	}));
	}
	if(isGranted('_SalaryItemDel')){
	toolbar.add(new Ext.Button({
	  iconCls : 'btn-del',
							text : '删除薪酬项目',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("SalaryItemGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids
											.push(selectRecords[i].data.salaryItemId);
								}

								SalaryItemView.remove(ids);
							}
	}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
SalaryItemView.remove = function(id) {
	var grid = Ext.getCmp("SalaryItemGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/hrm/multiDelSalaryItem.do',
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
SalaryItemView.edit = function(id) {
	new SalaryItemForm(id);
}
