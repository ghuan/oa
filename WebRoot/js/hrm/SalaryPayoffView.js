/**
 * @author:
 * @class SalaryPayoffView
 * @extends Ext.Panel
 * @description 薪酬发放管理
 * @company 广州宏天软件有限公司
 * @createtime:2010-01-16
 */
SalaryPayoffView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		// 初始化组件
		this.initComponents();
		// 调用父类构造
		SalaryPayoffView.superclass.constructor.call(this, {
					id : 'SalaryPayoffView',
					title : '薪酬发放审核',
					region : 'center',
					iconCls : 'menu-check-salay',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// [SalaryPayoff]分类ID
	typeId : null,

	// 条件搜索Panel
	searchPanel : null,

	// 数据展示Panel
	gridPanel : null,

	// GridPanel的数据Store
	store : null,

	// 头部工具栏
	topbar : null,

	// 初始化组件
	initComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new Ext.FormPanel({
					layout : 'column',
					region : 'north',
					bodyStyle : 'padding:6px 10px 6px 10px',
					border : false,
					defaults : {
						border : false,
						anchor : '98%,98%'
					},
					items : [{
								// columnWidth : .3,
								layout : 'form',
								items : {
									fieldLabel : '员工姓名',
									name : 'Q_fullname_S_LK',
									width : 100,
									xtype : 'textfield'
								}
							}, {
								// columnWidth : .3,
								layout : 'form',
								items : {
									fieldLabel : '审批状态',
									hiddenName : 'Q_checkStatus_SN_EQ',
									width : 110,
									xtype : 'combo',
									readOnly : true,
									mode : 'local',
									triggerAction : 'all',
									store : [['', '　'], ['0', '未审核'],
											['1', '审核通过'], ['2', '审核未通过']]
								}
							}, {
//								columnWidth : .3,
								layout : 'form',
								width : 100,
								items : {
									xtype : 'button',
									text : '查询',
									iconCls : 'search',
									handler : this.search.createCallback(this)
								}
							}]
				});// end of the searchPanel

		// 加载数据至store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + "/hrm/listSalaryPayoff.do",
					root : 'result',
					totalProperty : 'totalCounts',
					remoteSort : true,
					fields : [{
								name : 'recordId',
								type : 'int'
							}, 'fullname', 'userId', 'profileNo', 'idNo',
							'standAmount', 'encourageAmount', 'deductAmount',
							'achieveAmount', 'encourageDesc', 'deductDesc',
							'memo', 'acutalAmount', 'regTime', 'register',
							'checkName', 'checkTime', 'checkStatus',
							'startTime', 'endTime']
				});
		this.store.setDefaultSort('recordId', 'desc');
		// 加载数据
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});

		var actions = new Array();
		if (isGranted('_SalaryPayoffDel')) {
			actions.push({
						iconCls : 'btn-del',
						qtip : '删除',
						style : 'margin:0 3px 0 3px'
					});

		}
		if (isGranted('_SalaryPayoffEdit')) {
			actions.push({
						iconCls : 'btn-edit',
						qtip : '编辑',
						style : 'margin:0 3px 0 3px'
					});

		}
		if (isGranted('_SalaryPayoffCheck')) {
			actions.push({
						iconCls : 'btn-salary-pay',
						qtip : '审核',
						style : 'margin:0 3px 0 3px'
					});
		}

		if (isGranted('_SalaryPayoffQuery')) {
			actions.push({
						iconCls : 'btn-operation',
						qtip : '操作记录',
						style : 'margin:0 3px 0 3px'
					});
		}
		this.rowActions = new Ext.ux.grid.RowActions({
					header : '管理',
					width : 100,
					actions : actions
				});

		// 初始化ColumnModel
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : 'recordId',
						dataIndex : 'recordId',
						hidden : true
					}, {
						header : '员工姓名',
						dataIndex : 'fullname'
					}, {
						header : '档案编号',
						dataIndex : 'profileNo'
					}, {
						header : '身份证号',
						dataIndex : 'idNo'
					}, {
						header : '薪标金额',
						dataIndex : 'standAmount'
					}, {
						header : '实发金额',
						dataIndex : 'acutalAmount'
					}, {
						header : '登记时间',
						dataIndex : 'regTime',
						renderer : function(value) {
							return value.substring(0, 10);
						}
					}, {
						header : '审批状态',
						dataIndex : 'checkStatus',
						renderer : function(value) {
							if (value == '0') {
								return '未审核'
							} else if (value == '1') {
								return '<img title="通过审核" src="'
										+ __ctxPath
										+ '/images/flag/customer/effective.png"/>';
							} else {
								return '<img title="没通过审核" src="'
										+ __ctxPath
										+ '/images/flag/customer/invalid.png"/>';
							}
						}
					}, this.rowActions],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});
		// 初始化工具栏
		this.topbar = new Ext.Toolbar({
					height : 30,
					bodyStyle : 'text-align:left',
					items : []
				});
		if (isGranted('_SalaryPayoffAdd')) {
			this.topbar.add(new Ext.Button({
						iconCls : 'btn-add',
						text : '登记',
						handler : this.createRecord
					}));
		}
		if (isGranted('_SalaryPayoffDel')) {
			this.topbar.add(new Ext.Button({
						iconCls : 'btn-del',
						text : '删除',
						handler : this.delRecords,
						scope : this
					}));
		}
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'SalaryPayoffGrid',
					region : 'center',
					stripeRows : true,
					tbar : this.topbar,
					store : this.store,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					autoHeight : true,
					cm : cm,
					sm : sm,
					plugins : this.rowActions,
					viewConfig : {
						forceFit : true,
						autoFill : true, // 自动填充
						forceFit : true
						// showPreview : false
					},
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : '当前页记录索引{0}-{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});

		this.gridPanel.addListener('rowdblclick', function(grid, rowindex, e) {
					grid.getSelectionModel().each(function(rec) {
						if (isGranted('_SalaryPayoffEdit')) {
							var tabs = Ext.getCmp('centerTabPanel');
							var salaryPayoffForm = Ext
									.getCmp('SalaryPayoffForm');
							if (SalaryPayoffForm != null) {
								tabs.remove('SalaryPayoffForm');
							}
							salaryPayoffForm = new SalaryPayoffForm({
										recordId : rec.data.recordId
									});
							tabs.add(salaryPayoffForm);
							tabs.activate(salaryPayoffForm);
						}
					});
				});
		this.rowActions.on('action', this.onRowAction, this);
	},// end of the initComponents()

	/**
	 * 
	 * @param {}
	 *            self 当前窗体对象
	 */
	search : function(self) {
		if (self.searchPanel.getForm().isValid()) {// 如果合法
			self.searchPanel.getForm().submit({
				waitMsg : '正在提交查询',
				url : __ctxPath + '/hrm/listSalaryPayoff.do',
				success : function(formPanel, action) {
					var result = Ext.util.JSON
							.decode(action.response.responseText);
					self.gridPanel.getStore().loadData(result);
				}
			});
		}
	},

	/**
	 * 添加记录
	 */
	createRecord : function() {
		var tabs = Ext.getCmp('centerTabPanel');
		var salaryPayoffForm = Ext.getCmp('SalaryPayoffForm');
		if (SalaryPayoffForm != null) {
			tabs.remove('SalaryPayoffForm');
		}
		salaryPayoffForm = new SalaryPayoffForm();
		tabs.add(salaryPayoffForm);
		tabs.activate(salaryPayoffForm);
	},
	/**
	 * 按IDS删除记录
	 * 
	 * @param {}
	 *            ids
	 */
	delByIds : function(ids) {
		Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/hrm/multiDelSalaryPayoff.do',
									params : {
										ids : ids
									},
									method : 'POST',
									success : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '成功删除记录！');
										Ext.getCmp('SalaryPayoffGrid')
												.getStore().reload();
									},
									failure : function(response, options) {
										Ext.ux.Toast
												.msg('操作信息', '操作出错，请联系管理员！');
									}
								});
					}
				});// end of comfirm
	},
	/**
	 * 删除多条记录
	 */
	delRecords : function() {
		var gridPanel = Ext.getCmp('SalaryPayoffGrid');
		var selectRecords = gridPanel.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var ids = Array();
		for (var i = 0; i < selectRecords.length; i++) {
			ids.push(selectRecords[i].data.recordId);
		}
		this.delByIds(ids);
	},
	/**
	 * 编辑记录
	 * 
	 * @param {}
	 *            record
	 */
	editRecord : function(record) {
		var tabs = Ext.getCmp('centerTabPanel');
		var salaryPayoffForm = Ext.getCmp('SalaryPayoffForm');
		if (SalaryPayoffForm != null) {
			tabs.remove('SalaryPayoffForm');
		}
		salaryPayoffForm = new SalaryPayoffForm({
					recordId : record.data.recordId
				});
		tabs.add(salaryPayoffForm);
		tabs.activate(salaryPayoffForm);
	},
	/**
	 * 审核
	 * 
	 * @param {}
	 *            record
	 */
	check : function(record) {
		new CheckSalaryPayoffForm({
					recordId : record.data.recordId
				}).show();
	},
	/**
	 * 展示操作纪录
	 * 
	 * @param {}
	 *            record
	 */
	operation : function(record) {
		var window = new Ext.Window({
			id : 'SalaryPayoffViewOperationWin',
			title : '薪酬发放操作纪录',
			iconCls : 'btn-operation',
			width : 500,
			x : 300,
			y : 50,
			autoHeight : true,
			border : false,
			modal : true,
			layout : 'anchor',
			plain : true,
			bodyStyle : 'padding:5px;',
			buttonAlign : 'center',
			items : [new Ext.Panel({
						autoScroll : true,
						autoHeight : true,
						border : false,
						autoLoad : {
							url : __ctxPath
									+ '/pages/hrm/salaryPayoffOperation.jsp?recordId='
									+ record.data.recordId
						}
					})],
			buttons : [{
						text : '关闭',
						iconCls : 'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		window.show();
	},
	/**
	 * 管理列中的事件处理
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            record
	 * @param {}
	 *            action
	 * @param {}
	 *            row
	 * @param {}
	 *            col
	 */
	onRowAction : function(gridPanel, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.delRecords();
				break;
			case 'btn-edit' :
				this.editRecord(record);
				break;
			case 'btn-salary-pay' :
				this.check(record);
				break;
			case 'btn-operation' :
				this.operation(record);
				break;
			default :
				break;
		}
	}
});
