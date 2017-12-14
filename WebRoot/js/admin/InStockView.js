Ext.ns('InStockView');
/**
 * ������������������������������������������������������������列表
 */
var InStockView = function() {
	return new Ext.Panel({
		id : 'InStockView',
		title : '入库用品列表',
		iconCls : 'menu-instock',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'InStockSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '商品名称'
					}, {
						xtype : 'textfield',
						name : 'Q_officeGoods.goodsName_S_LK'
					}, {
						text : '供应商'
					}, {
						xtype : 'textfield',
						name : 'Q_providerName_S_LK'
					}, {
						text : '购买人'
					}, {
						xtype : 'textfield',
						name : 'Q_buyer_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('InStockSearchForm');
							var grid = Ext.getCmp('InStockGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/admin/listInStock.do',
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
InStockView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
InStockView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'buyId',
					dataIndex : 'buyId',
					hidden : true
				}, {
					header : '商品名称',
					dataIndex : 'goodsName'
				}, {
					header : '供应商',
					dataIndex : 'providerName'
				}, {
					header : '库存号',
					dataIndex : 'stockNo'
				}, {
					header : '价格',
					dataIndex : 'price'
				}, {
					header : '入货数量',
					dataIndex : 'inCounts'
				}, {
					header : '总额',
					dataIndex : 'amount'
				}, {
					header : '入库日期',
					dataIndex : 'inDate',
					renderer:function(value){
					  return value.substring(0,10);
					}
				}, {
					header : '购买人',
					dataIndex : 'buyer'
				}, {
					header : '管理',
					dataIndex : 'buyId',
					sortable : false,
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.buyId;
						var str = '';
						if (isGranted('_InStockDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="InStockView.remove('
									+ editId + ')">&nbsp;</button>';
						}
						if (isGranted('_InStockEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="InStockView.edit('
									+ editId + ')">&nbsp;</button>';
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
				id : 'InStockGrid',
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
				if (isGranted('_InStockEdit')) {
					grid.getSelectionModel().each(function(rec) {
								InStockView.edit(rec.data.buyId);
							});
				}
			});
	return grid;

};

/**
 * 初始化数据
 */
InStockView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listInStock.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'buyId',
										type : 'int'
									}

									, {
										name : 'goodsName',
										mapping : 'officeGoods.goodsName'
									}, 'providerName', 'stockNo', 'price',
									'inCounts', 'amount', 'inDate', 'buyer']
						}),
				remoteSort : true
			});
	store.setDefaultSort('buyId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
InStockView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'InStockFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_InStockAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加入库单',
					handler : function() {
						new InStockForm();
						Ext.getCmp('InStockFormContainer').remove('stockNo');
						Ext.getCmp('InStockFormContainer').remove('amount');
					}
				}));
	}
	if (isGranted('_InStockDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除入库单',
					handler : function() {

						var grid = Ext.getCmp("InStockGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.buyId);
						}

						InStockView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
InStockView.remove = function(id) {
	var grid = Ext.getCmp("InStockGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/admin/multiDelInStock.do',
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
InStockView.edit = function(id) {
	new InStockForm(id);
}
