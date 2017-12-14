Ext.ns('GoodsApplyView');
/**
 * ������������������列表
 */
var GoodsApplyView = function() {
	return new Ext.Panel({
		id : 'GoodsApplyView',
		title : '办公用品申请列表',
		iconCls : 'menu-goods-apply',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'GoodsApplySearchForm',
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
						text : '申请号'
					}, {
						xtype : 'textfield',
						name : 'Q_applyNo_S_LK'
					}, {
						text : '申请人'
					}, {
						xtype : 'textfield',
						name : 'Q_proposer_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('GoodsApplySearchForm');
							var grid = Ext.getCmp('GoodsApplyGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listGoodsApply.do',
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
GoodsApplyView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
GoodsApplyView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'applyId',
					dataIndex : 'applyId',
					hidden : true
				}, {
					header : '商品名称',
					dataIndex : 'goodsName'
				}, {
					header : '申请日期',
					dataIndex : 'applyDate',
					renderer:function(value){
					  return value.substring(0,10);
					}
				}, {
					header : '申请号',
					dataIndex : 'applyNo'
				}, {
					header : '申请数量',
					dataIndex : 'useCounts'
				}, {
					header : '申请人',
					dataIndex : 'proposer'
				}, {
					header : '备注',
					dataIndex : 'notes'
				}, {
					header : '审批状态',
					dataIndex : 'approvalStatus',
					renderer : function(value) {
						if (value == '0') {
							return '未审批';
						}
						if (value == '1') {

							return '已审批';
						}
					}
				}, {
					header : '管理',
					dataIndex : 'applyId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.applyId;
						var approvalStatus=record.data.approvalStatus;
						var str = '';
						if (isGranted('_GoodsApplyDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="GoodsApplyView.remove('
									+ editId + ')">&nbsp;</button>';
						}
						if (isGranted('_GoodsApplyEdit')) {
							if(approvalStatus==0){
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="GoodsApplyView.edit('
										+ editId + ')">&nbsp;</button>';
							}
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
				id : 'GoodsApplyGrid',
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
							if (isGranted('_GoodsApplyEdit')) {
								if(rec.data.approvalStatus==0){
									GoodsApplyView.edit(rec.data.applyId);
								}
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
GoodsApplyView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listGoodsApply.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'applyId',
										type : 'int'
									}

									, {
										name : 'goodsName',
										mapping : 'officeGoods.goodsName'
									}, 'applyDate', 'applyNo', 'useCounts',
									'proposer', 'notes', 'approvalStatus']
						}),
				remoteSort : true
			});
	store.setDefaultSort('applyId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
GoodsApplyView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'GoodsApplyFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_GoodsApplyAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加 申请单',
					handler : function() {
						new GoodsApplyForm();
						Ext.getCmp('GoodsApplyForm').remove('applyNo');
						Ext.getCmp('GoodsApplyForm').remove('approvalStatus');
					}
				}));
	}
	if (isGranted('_GoodsApplyDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除申请单',
					handler : function() {

						var grid = Ext.getCmp("GoodsApplyGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.applyId);
						}

						GoodsApplyView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
GoodsApplyView.remove = function(id) {
	var grid = Ext.getCmp("GoodsApplyGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelGoodsApply.do',
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
GoodsApplyView.edit = function(id) {
	new GoodsApplyForm(id);
}
