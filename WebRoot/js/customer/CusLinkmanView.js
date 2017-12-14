Ext.ns('CusLinkmanView');
/**
 * [CusLinkman]列表
 */
var CusLinkmanView = function() {
	return new Ext.Panel({
		id : 'CusLinkmanView',
		title : '联系人信息',
		iconCls : 'menu-cusLinkman',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CusLinkmanSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '所属客户'// 下拉列表选择?模糊查找吧
					}, {
						xtype : 'textfield',
						name : 'Q_customerId_S_LK',
						width : 80
					}, {
						text : '姓名'
					}, {
						xtype : 'textfield',
						name : 'Q_fullname_S_LK',
						width : 80
					}, {
						text : '手机'
					}, {
						xtype : 'textfield',
						name : 'Q_mobile_S_LK',
						width : 80
					}, {
						text : 'QQ'
					}, {
						xtype : 'textfield',
						name : 'Q_qq_S_LK',
						width : 80
					}, {
						text : '主要联系人'// 是否
					}, {
						xtype : 'textfield',
						name : 'Q_isPrimary_S_LK',
						width : 40
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('CusLinkmanSearchForm');
							var grid = Ext.getCmp('CusLinkmanGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listCusLinkman.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}
//					, {
//						xtype : 'button',
//						text : '高级查询',
//						iconCls : 'search',
//						handler : function() {
//							Ext.ux.Toast.msg('信息', '待实现．');
//						}
//					}
					]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
CusLinkmanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CusLinkmanView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'linkmanId',
					dataIndex : 'linkmanId',
					hidden : true
				}, {
					header : '主联系人',
					dataIndex : 'isPrimary',
					width : 70,
					renderer : function(value) {
						if (value == '1') {
							return '<img title="主要联系人" src="' + __ctxPath
									+ '/images/flag/mail/important.png"/>';
						}
					}
				}, {
					header : '性别',
					dataIndex : 'sex',
					width : 45,
					renderer : function(value) {
						if (value == '1') {
							return '<img title="先生" src="' + __ctxPath
									+ '/images/flag/customer/male.png"/>';
						} else {
							return '<img title="女士" src="' + __ctxPath
									+ '/images/flag/customer/female.png"/>';
						}
					}
				}, {
					header : '所属客户',
					dataIndex : 'customer',
					renderer : function(value) {
						return value.customerName;
					}
				}, {
					header : '姓名',
					dataIndex : 'fullname'
				}, {
					header : '职位',
					dataIndex : 'position'
				}, {
					header : '电话',
					dataIndex : 'phone'
				}, {
					header : '手机',
					dataIndex : 'mobile'
				}, {
					header : 'Email',
					dataIndex : 'email'
				},
//				{
//					header : 'MSN',
//					dataIndex : 'msn'
//				}, {
//					header : 'QQ',
//					dataIndex : 'qq'
//				},
				{
					header : '管理',
					dataIndex : 'linkmanId',
					width : 100,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.linkmanId;
						var str = '';
						if (isGranted('_CusLinkmanDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="CusLinkmanView.remove('
									+ editId + ')">&nbsp</button>';
						}
						if (isGranted('_CusLinkmanEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CusLinkmanView.edit('
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
				id : 'CusLinkmanGrid',
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
							if (isGranted('_CusLinkmanEdit')) {
								CusLinkmanView.edit(rec.data.linkmanId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CusLinkmanView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listCusLinkman.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'linkmanId',
										type : 'int'
									}

									, 'customer', 'fullname', 'sex',
									'position', 'phone', 'mobile', 'email',
									'msn', 'qq', 'birthday', 'homeAddress',
									'homeZip', 'homePhone', 'hobby',
									'isPrimary', 'notes']
						}),
				remoteSort : true
			});
	store.setDefaultSort('linkmanId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CusLinkmanView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CusLinkmanFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_CusLinkmanAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加联系人',
					handler : function() {
						new CusLinkmanForm();
					}
				}));
	}
	if (isGranted('_CusLinkmanDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除联系人',
					handler : function() {

						var grid = Ext.getCmp("CusLinkmanGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.linkmanId);
						}

						CusLinkmanView.remove(ids);
					}
				}));

	}
	return toolbar;
};

/**
 * 删除单个记录
 */
CusLinkmanView.remove = function(id) {
	var grid = Ext.getCmp('CusLinkmanGrid');
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelCusLinkman.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
									if (grid != null) {
										grid.getStore().reload({
													params : {
														start : 0,
														limit : 25
													}
												});
									}
								}
							});
				}
			});
};

/**
 * 
 */
CusLinkmanView.edit = function(id) {
	new CusLinkmanForm(id);
}
