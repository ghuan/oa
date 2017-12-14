Ext.ns('CusConnectionView');
/**
 * [CusConnection]列表
 */
var CusConnectionView = function() {
	return new Ext.Panel({
		id : 'CusConnectionView',
		title : '交往记录',
		iconCls : 'menu-connection',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CusConnectionSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '客户名称'
					}, {
						xtype : 'textfield',
						name : 'Q_customer.custoemrName_S_LK',
						width : 80
					}, {
						text : '联系人'
					}, {
						xtype : 'textfield',
						name : 'Q_contactor_S_LK',
						width : 80
					}, {
						text : '交往日期   从'
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						readOnly : true,
						name : 'Q_startDate_S_LK',
						width : 80
					}, {
						text : ' 至  '
					}, {
						xtype : 'datefield',
						format : 'Y-m-d',
						readOnly : true,
						name : 'Q_endDate_S_LK',
						width : 80
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('CusConnectionSearchForm');
							var grid = Ext.getCmp('CusConnectionGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listCusConnection.do',
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
CusConnectionView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CusConnectionView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'connId',
					dataIndex : 'connId',
					hidden : true
				}, {
					header : '内容',
					dataIndex : 'content'
				}, {
					header : '客户名称',
					dataIndex : 'customer',
					renderer : function(value) {
						return value.customerName;
					}
				}, {
					header : '联系人',
					dataIndex : 'contactor'
				}, {
					header : '交往日期',
					width : 200,
					dataIndex : 'startDate',
					renderer : function(value, metadata, record) {
						return value + "——" + record.data.endDate;
					}
				}, {
					header : '创建人',
					dataIndex : 'creator'
				}, {
					header : '管理',
					dataIndex : 'connId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.connId;
						var str = '';
						if (isGranted('_CusConnectionDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="CusConnectionView.remove('
									+ editId + ')">&nbsp</button>';
						}
						if (isGranted('_CusConnectionEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CusConnectionView.edit('
									+ editId + ')">&nbsp</button>';
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
				id : 'CusConnectionGrid',
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
							if (isGranted('_CusConnectionEdit')) {
								CusConnectionView.edit(rec.data.connId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CusConnectionView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listCusConnection.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'connId',
										type : 'int'
									}

									, 'customer', 'contactor', 'startDate',
									'endDate', 'content', 'notes', 'creator']
						}),
				remoteSort : true
			});
	store.setDefaultSort('connId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CusConnectionView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CusConnectionFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_CusConnectionAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加记录',
					handler : function() {
						new CusConnectionForm();
					}
				}));
	}
	if (isGranted('_CusConnectionDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除记录',
					handler : function() {

						var grid = Ext.getCmp("CusConnectionGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.connId);
						}

						CusConnectionView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
CusConnectionView.remove = function(id) {
	var grid = Ext.getCmp("CusConnectionGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelCusConnection.do',
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
CusConnectionView.edit = function(id) {
	new CusConnectionForm(id);
}
