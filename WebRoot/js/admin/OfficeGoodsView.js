Ext.ns('OfficeGoodsView');
/**
 * ������������列表
 */
var OfficeGoodsView = function() {
}

OfficeGoodsView.prototype.setTypeId = function(typeId) {
	this.typeId = typeId;
	OfficeGoodsView.typeId = typeId;
};
OfficeGoodsView.prototype.getTypeId = function() {
	return this.typeId;
}

OfficeGoodsView.prototype.getView = function() {
	return new Ext.Panel({
		id : 'OfficeGoodsView',
		title : '办公用品列表',
		region : 'center',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'OfficeGoodsSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '物品名称'
					}, {
						xtype : 'textfield',
						name : 'Q_goodsName_S_LK'
					}, {
						text : '所属分类'
					}, {
						xtype : 'textfield',
						name : 'Q_officeGoodsType.typeName_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('OfficeGoodsSearchForm');
							var grid = Ext.getCmp('OfficeGoodsGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listOfficeGoods.do',
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
OfficeGoodsView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
OfficeGoodsView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'goodsId',
					dataIndex : 'goodsId',
					hidden : true
				}, {
					header : '所属分类',
					dataIndex : 'typeName'
				}, {
					header : '物品名称',
					dataIndex : 'goodsName'
				}, {
					header : '编号',
					dataIndex : 'goodsNo'
				}, {
					header : '规格',
					dataIndex : 'specifications'
				}, {
					header : '计量单位',
					dataIndex : 'unit'
				}, {
					header : '是否启用库存警示',
					dataIndex : 'isWarning',
					renderer : function(value) {
						if (value == '0') {
							return '未启动';
						}
						if (value == '1') {
							return '已启动';
						}
					}
				}, {
					header : '备注',
					dataIndex : 'notes'
				}, {
					header : '库存总数',
					dataIndex : 'stockCounts',
					renderer:function(value,metadata,record,rowIndex,colIndex){
					     var warnCounts=record.data.warnCounts;
					     var isWarning=record.data.isWarning;
					     if(value<=warnCounts&&isWarning=='1'){
					         return '<a style="color:red;" title="已少于警报库存！">'+value+'</a>';
					     }else{
					         return value;
					     }
					}
				}, {
					header : '管理',
					dataIndex : 'goodsId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.goodsId;
						var str='';
						if(isGranted('_OfficeGoodsDel')){
							str = '<button title="删除" value=" " class="btn-del" onclick="OfficeGoodsView.remove('
									+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_OfficeGoodsEdit')){
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="OfficeGoodsView.edit('
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
				id : 'OfficeGoodsGrid',
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
				if(isGranted('_OfficeGoodsEdit')){
					grid.getSelectionModel().each(function(rec) {
								OfficeGoodsView.edit(rec.data.goodsId);
							});
				}
			});
	return grid;

};

/**
 * 初始化数据
 */
OfficeGoodsView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listOfficeGoods.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'goodsId',
										type : 'int'
									}

									, {
										name : 'typeName',
										mapping : 'officeGoodsType.typeName'
									}, 'goodsName', 'goodsNo',
									'specifications', 'unit', 'isWarning','warnCounts',
									'notes', 'stockCounts']
						}),
				remoteSort : true
			});
	store.setDefaultSort('goodsId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
OfficeGoodsView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'OfficeGoodsFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [
//					{
//							iconCls : 'btn-add',
//							text : '添加办公用品',
//							xtype : 'button',
//							handler : function() {
//								new OfficeGoodsForm();
//								Ext.getCmp('OfficeGoodsFormItems')
//										.remove('goodsNo');
//								Ext.getCmp('OfficeGoodsFormS')
//										.remove('stockCounts');
//							}
//						}, {
//							iconCls : 'btn-del',
//							text : '删除办公用品',
//							xtype : 'button',
//							handler : function() {
//
//								var grid = Ext.getCmp("OfficeGoodsGrid");
//
//								var selectRecords = grid.getSelectionModel()
//										.getSelections();
//
//								if (selectRecords.length == 0) {
//									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
//									return;
//								}
//								var ids = Array();
//								for (var i = 0; i < selectRecords.length; i++) {
//									ids.push(selectRecords[i].data.goodsId);
//								}
//
//								OfficeGoodsView.remove(ids);
//							}
//						}
						]
			});
			if(isGranted('_OfficeGoodsAdd')){
				toolbar.add(new Ext.Button({
				                iconCls : 'btn-add',
								text : '添加办公用品',
	//							xtype : 'button',
								handler : function() {
									new OfficeGoodsForm();
									Ext.getCmp('OfficeGoodsFormItems')
											.remove('goodsNo');
									Ext.getCmp('OfficeGoodsFormS')
											.remove('stockCounts');
								}
					
				}));
			}
			if(isGranted('_OfficeGoodsDel')){
			   toolbar.add(new Ext.Button({
			                iconCls : 'btn-del',
							text : '删除办公用品',
//							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("OfficeGoodsGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.goodsId);
								}

								OfficeGoodsView.remove(ids);
							}
			   }));
			}
			
	return toolbar;
};

/**
 * 删除单个记录
 */
OfficeGoodsView.remove = function(id) {
	var grid = Ext.getCmp("OfficeGoodsGrid");
	Ext.Msg.confirm('信息确认', '会把入库和申请记录一起删除，您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelOfficeGoods.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg('信息提示', '成功删除所选记录！');
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
OfficeGoodsView.edit = function(id) {
	new OfficeGoodsForm(id);
}
