Ext.ns('ProductView');
/**
 * [Product]列表
 */
var ProductView = function() {
	return new Ext.Panel({
		id : 'ProductView',
		title : '产品列表',
		iconCls : 'menu-product',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ProductSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '产品名称'
					}, {
						xtype : 'textfield',
						name : 'Q_productName_S_LK'
					}, {
						text : '产品型号'
					}, {
						xtype : 'textfield',
						name : 'Q_productModel_S_LK'
					},
					/*
					 * { text : '成本价' }, { xtype : 'textfield', name :
					 * 'Q_costPrice_S_LK' }, { text : '出售价' }, { xtype :
					 * 'textfield', name : 'Q_productDesc_S_LK' },
					 */
					{
						text : '供应商'
					}, {
						xtype : 'textfield',
						name : 'Q_provider.providerName_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ProductSearchForm');
							var grid = Ext.getCmp('ProductGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listProduct.do',
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
ProductView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ProductView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'productId',
					dataIndex : 'productId',
					hidden : true
				}, {
					header : '名称',
					dataIndex : 'productName'
				}, {
					header : '型号',
					dataIndex : 'productModel'
				}, {
					header : '单位',
					dataIndex : 'unit'
				}, {
					header : '成本价',
					dataIndex : 'costPrice',
					renderer : function(value) {
						return '<img src="' + __ctxPath
								+ '/images/flag/customer/rmb.png"/>' + value;
					}
				}, {
					header : '出售价',
					dataIndex : 'salesPrice',
					renderer : function(value) {
						return '<img src="' + __ctxPath
								+ '/images/flag/customer/rmb.png"/>' + value;
					}
				}, {
					header : '供应商',
					dataIndex : 'provider',
					renderer : function(value) {
						return value.providerName;
					}
				}, {
					header : '收录时间',
					dataIndex : 'createtime'
				}, {
					header : '管理',
					dataIndex : 'productId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.productId;
						var str = '';
						if (isGranted('_ProductDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="ProductView.remove('
									+ editId + ')">&nbsp;&nbsp;</button>';
						}
						if (isGranted('_ProductEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ProductView.edit('
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
				id : 'ProductGrid',
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

	AppUtil.addPrintExport(grid);// 打印功能

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							if (isGranted('_ProductEdit')) {
									ProductView.edit(rec.data.productId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ProductView.prototype.store = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/customer/listProduct.do'
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'id',
					fields : [{
								name : 'productId',
								type : 'int'
							}

							, 'productName', 'productModel', 'unit',
							'costPrice', 'salesPrice', 'provider', 'createtime']
				}),
		remoteSort : true
	});
	store.setDefaultSort('productId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ProductView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ProductFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_ProductAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加产品',
					xtype : 'button',
					handler : function() {
						new ProductForm();
					}
				}))
	};
	if (isGranted('_ProductDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除产品',
					xtype : 'button',
					handler : function() {

						var grid = Ext.getCmp("ProductGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.productId);
						}

						ProductView.remove(ids);
					}
				}))
	};
	return toolbar;
};

/**
 * 删除单个记录
 */
ProductView.remove = function(id) {
	var grid = Ext.getCmp("ProductGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelProduct.do',
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
ProductView.edit = function(id) {
	new ProductForm(id);
}
