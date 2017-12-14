Ext.ns('ProjectView');
/**
 * [Project]列表
 */
var ProjectView = function() {
	return new Ext.Panel({
		id : 'ProjectView',
		title : '项目列表',
		iconCls : 'menu-project',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ProjectSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '项目名称'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_projectName_S_LK'
					}, {
						text : '项目编号'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_projectNo_S_LK'
					}, {
						text : '联系人'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_fullname_S_LK'
					}, {
						text : '客户'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_customerId_S_LK'
					}, {
						text : '业务员'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_userId_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ProjectSearchForm');
							var grid = Ext.getCmp('ProjectGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listProject.do',
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
ProjectView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ProjectView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'projectId',
					dataIndex : 'projectId',
					hidden : true
				}, {
					header : '合同',
					width : 40,
					dataIndex : 'isContract',
					renderer : function(value) {
						if (value == '1') {
							return '<img title="有合同" src="' + __ctxPath
									+ '/images/menus/customer/contract.png"/>';
						}
					}
				}, {
					header : '项目编号',
					width : 80,
					dataIndex : 'projectNo'
				}, {
					header : '项目名称',
					width : 110,
					dataIndex : 'projectName'
				}, {
					header : '联系人',
					width : 60,
					dataIndex : 'fullname'
				}, {
					header : '手机',
					width : 80,
					dataIndex : 'mobile'
				}, {
					header : '电话',
					width : 80,
					dataIndex : 'phone'
				}, {
					header : '所属客户',
					width : 80,
					dataIndex : 'customer',
					renderer : function(value) {
						return value.customerName;
					}
				}, {
					header : '业务员',
					width : 60,
					dataIndex : 'appUser',
					renderer : function(value) {
						return value.fullname;
					}
				}, {
					header : '管理',
					width : 100,
					dataIndex : 'projectId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.projectId;
						var str = '';
						if (isGranted('_ProjectDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="ProjectView.remove('
									+ editId + ')">&nbsp</button>';
						}
						if (isGranted('_ProjectEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ProjectView.edit('
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
				id : 'ProjectGrid',
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
							if (isGranted('_ProjectEdit')) {
								ProjectView.edit(rec.data.projectId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ProjectView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listProject.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'projectId',
										type : 'int'
									}

									, 'projectName', 'projectNo', 'isContract',
									'fullname', 'mobile', 'phone',
									'otherContacts', 'customer', 'appUser']
						}),
				remoteSort : true
			});
	store.setDefaultSort('projectId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ProjectView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ProjectFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_ProjectAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加项目',
					handler : function() {
						new ProjectForm();
					}
				}));
	}

	if (isGranted('_ProjectDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除项目',
					xtype : 'button',
					handler : function() {

						var grid = Ext.getCmp("ProjectGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.projectId);
						}

						ProjectView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
ProjectView.remove = function(id) {
	var grid = Ext.getCmp("ProjectGrid");
	Ext.Msg.confirm('信息确认', '删除项目，则项目下的<font color="red">合同信息</font>及<font color="red">附件</font>也删除，您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelProject.do',
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
ProjectView.edit = function(id) {
	new ProjectForm(id);
}
