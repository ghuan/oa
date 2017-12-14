Ext.ns('CartRepairView');
/**
 * [CartRepair]列表
 */
var CartRepairView = function() {
	return new Ext.Panel({
		id : 'CartRepairView',
		title : '车辆维修列表',
		iconCls:'menu-car_repair',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CartRepairSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '车牌号码'
					}, {
						xtype : 'textfield',
						name : 'Q_car.carNo_S_LK'
					}, 
//						{
//						text : '维护日期'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_repairDate_S_LK'
//					}, {
//						text : '维护原因'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_reason_S_LK'
//					}, {
//						text : '经办人'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_executant_S_LK'
//					}, {
//						text : '备注'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_notes_S_LK'
//					}, 
						{
						text : '维修类型'
					}, {
						xtype : 'textfield',
						name : 'Q_repairType_S_LK'
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('CartRepairSearchForm');
							var grid = Ext.getCmp('CartRepairGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listCartRepair.do',
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
CartRepairView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CartRepairView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'repairId',
					dataIndex : 'repairId',
					hidden : true
				}, {
					header : '车辆车牌号',
					dataIndex : 'carNo'
				}, {
					header : '维护日期',
					dataIndex : 'repairDate',
					renderer:function(value){
					  return value.substring(0,10);
					}
				}, {
					header : '维护原因',
					dataIndex : 'reason'
				}, {
					header : '经办人',
					dataIndex : 'executant'
				}, {
					header : '备注',
					dataIndex : 'notes'
				}, {
					header : '维修类型',
					dataIndex : 'repairType'
				}, {
					header : '费用',
					dataIndex : 'fee'
				}, {
					header : '管理',
					dataIndex : 'repairId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.repairId;
						var str='';
						if(isGranted('_CarRepairDel')){
						str = '<button title="删除" value=" " class="btn-del" onclick="CartRepairView.remove('
								+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_CarRepairEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CartRepairView.edit('
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
				id : 'CartRepairGrid',
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
							if(isGranted('_CarRepairEdit')){
							 CartRepairView.edit(rec.data.repairId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CartRepairView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listCartRepair.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'repairId',
										type : 'int'
									}

									, {
									name:'carNo',
									mapping:'car.carNo'
									}, 'repairDate', 'reason',
									'executant', 'notes', 'repairType', 'fee']
						}),
				remoteSort : true
			});
	store.setDefaultSort('repairId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CartRepairView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CartRepairFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_CarRepairAdd')){
			   toolbar.add(new Ext.Button({
			      iconCls : 'btn-add',
							text : '添加维修单',
							handler : function() {
								new CartRepairForm();
							}
			   }));
			}
			if(isGranted('_CarRepairDel')){
			   toolbar.add(new Ext.Button({
			      iconCls : 'btn-del',
							text : '删除维修单',
							handler : function() {

								var grid = Ext.getCmp("CartRepairGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.repairId);
								}

								CartRepairView.remove(ids);
							}
			   }));
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
CartRepairView.remove = function(id) {
	var grid = Ext.getCmp("CartRepairGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelCartRepair.do',
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
CartRepairView.edit = function(id) {
	new CartRepairForm(id);
}
