Ext.ns('ContractView');
/**
 * [Contract]列表
 */
var ContractView = function() {
	return new Ext.Panel({
		id : 'ContractView',
		title : '合同列表',
		iconCls : 'menu-contract',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ContractSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '合同编号'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_contractNo_S_LK'
					}, {
						text : '合同标题'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_subject_S_LK'
					}, {
						text : '签约人'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_signupUser_S_LK'
					}, {
						text : '所属项目'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_projectId_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ContractSearchForm');
							var grid = Ext.getCmp('ContractGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listContract.do',
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
ContractView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ContractView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'contractId',
					dataIndex : 'contractId',
					hidden : true
				}, {
					header : '合同编号',
					dataIndex : 'contractNo'
				}, {
					header : '合同标题',
					dataIndex : 'subject'
				}, {
					header : '合同金额',
					dataIndex : 'contractAmount',
					renderer : function(value) {
						return value + '元';
					}
				}, {
					header : '签约人',
					dataIndex : 'signupUser'
				}, {
					header : '签约时间',
					dataIndex : 'signupTime'
				}, {
					header : '所属项目',
					dataIndex : 'project',
					renderer : function(value) {
						return value.projectName;
					}
				}, {
					header : '管理',
					dataIndex : 'contractId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.contractId;
						var str = '';
						if (isGranted('_ContractDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="ContractView.remove('
									+ editId + ')">&nbsp</button>';
						}
						if (isGranted('_ContractEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ContractView.edit('
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
				id : 'ContractGrid',
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
							if (isGranted('_ContractEdit')) {
								ContractView.edit(rec.data.contractId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ContractView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listContract.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'contractId',
										type : 'int'
									}

									, 'contractNo', 'subject',
									'contractAmount', 'creator', 'createtime',
									'project', 'signupUser', 'signupTime']
						}),
				remoteSort : true
			});
	store.setDefaultSort('contractId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ContractView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ContractFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_ContractAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加合同',
					handler : function() {
						new ContractForm();
					}
				}));

	}
	if (isGranted('_ContractDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除合同',
					handler : function() {

						var grid = Ext.getCmp("ContractGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.contractId);
						}

						ContractView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
ContractView.remove = function(id) {
	var grid = Ext.getCmp("ContractGrid");
	Ext.Msg.confirm('信息确认', '删除合同，则合同下的<font color="red">附件</font>及<font color="red">配置单信息</font>也删除，您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelContract.do',
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
ContractView.edit = function(id) {
	new ContractForm(id);
}
