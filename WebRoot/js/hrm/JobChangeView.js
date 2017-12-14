/**
 * @author:lyy
 * @class JobChangeView
 * @extends Ext.Panel
 * @description [JobChange]管理
 * @company 广州宏天软件有限公司
 * @createtime:2010-01-16
 */
JobChangeView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		// 初始化组件
		this.initComponents();
		// 调用父类构造
		JobChangeView.superclass.constructor.call(this, {
					id : 'JobChangeView',
					title : '职位调动管理',
					region : 'center',
					iconCls : 'menu-jobchange',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	// [JobChange]分类ID
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
						anchor : '98%,98%',
						labelWidth : 60
					},
					items : [{
								// columnWidth : .3,
								layout : 'form',
								defaults : {
									anchor : '98%,98%'
								},
								items : {
									fieldLabel : '档案编号',
									width : 100,
									name : 'Q_profileNo_S_LK',
									xtype : 'textfield'
								}
							}, {
								// columnWidth : .3,
								defaults : {
									anchor : '98%,98%'
								},
								layout : 'form',
								items : {
									fieldLabel : '姓名',
									width : 100,
									name : 'Q_userName_S_LK',
									xtype : 'textfield'
								}
							}, {
								// columnWidth : .3,
								defaults : {
									anchor : '98%,98%'
								},
								layout : 'form',
								items : {
									fieldLabel : '原职位',
									width : 100,
									name : 'Q_orgJobName_S_LK',
									xtype : 'textfield'
								}
							}, {
								// columnWidth : .3,
								defaults : {
									anchor : '98%,98%'
								},
								layout : 'form',
								items : {
									fieldLabel : '新职位',
									width : 100,
									name : 'Q_newJobName_S_LK',
									xtype : 'textfield'
								}
							}, {
								// columnWidth : .3,
								layout : 'form',
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
					url : __ctxPath + "/hrm/listJobChange.do",
					root : 'result',
					totalProperty : 'totalCounts',
					remoteSort : true,
					fields : [{
								name : 'changeId',
								type : 'int'
							}, 'profileId', 'profileNo', 'userName',
							'orgJobId', 'orgJobName', 'newJobId', 'newJobName',
							'orgStandardNo', 'orgStandardName', 'orgDepId',
							'orgDepName', 'orgTotalMoney', 'newStandardNo',
							'newStandardName', 'newDepId', 'newDepName',
							'newTotalMoney', 'changeReason', 'regName',
							'regTime', 'checkName', 'checkTime',
							'checkOpinion', 'status', 'memo']
				});
		this.store.setDefaultSort('changeId', 'desc');
		// 加载数据
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});

		var actions = new Array();
		if (isGranted('_JobChangeCheck')) {
			actions.push({
						iconCls : 'btn-check',
						qtip : '审核',
						style : 'margin:0 3px 0 3px'
					});
		}
		if (isGranted('_JobChangeDel')) {
			actions.push({
						iconCls : 'btn-del',
						qtip : '删除',
						style : 'margin:0 3px 0 3px'
					});
		}
		if (isGranted('_JobChangeEdit')) {
			actions.push({
						iconCls : 'btn-edit',
						qtip : '编辑',
						style : 'margin:0 3px 0 3px'
					});
		}
		if (isGranted('_JobChangeQuery')) {
			actions.push({
						iconCls : 'btn-operation',
						qtip : '操作记录',
						style : 'margin:0 3px 0 3px'
					})
		}
		this.rowActions = new Ext.ux.grid.RowActions({
					header : '管理',
					width : 125,
					actions : actions
				});

		// 初始化ColumnModel
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : 'changeId',
						dataIndex : 'changeId',
						hidden : true
					}, {
						header : '档案编号',
						dataIndex : 'profileNo'
					}, {
						header : '姓名',
						dataIndex : 'userName'
					}, {
						header : '原职位名称',
						dataIndex : 'orgJobName'
					}, {
						header : '新职位名称',
						dataIndex : 'newJobName'
					}, {
						header : '原部门名称',
						dataIndex : 'orgDepName'
					}, {
						header : '新部门名称',
						dataIndex : 'newDepName'
					}, {
						header : '登记人',
						dataIndex : 'regName'
					}, {
						header : '登记时间',
						dataIndex : 'regTime'
					}, {
						header : '状态',
						dataIndex : 'status',
						renderer : function(value) {
							if (value == -1) {
								return '<font color="red">草稿</font>';
							} else if (value == 1) {
								return '<img title="通过审核" src="'
										+ __ctxPath
										+ '/images/flag/customer/effective.png"/>';
							} else if (value == 2) {
								return '<img title="没通过审核" src="'
										+ __ctxPath
										+ '/images/flag/customer/invalid.png"/>';
							} else {
								return '<font color="green">提交审核</font>';

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

		if (isGranted('_JobChangeAdd')) {
			this.topbar.add(new Ext.Button({
						iconCls : 'btn-add',
						text : '登记',
						handler : this.createRecord
					}));
		}
		if (isGranted('_JobChangeDel')) {
			this.topbar.add(new Ext.Button({
						iconCls : 'btn-del',
						text : '删除',
						handler : this.delRecords,
						scope : this
					}));
		}
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'JobChangeGrid',
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
								if(isGranted('_JobChangeEdit')){
								var tabs = Ext.getCmp('centerTabPanel');
								var JobChangeFormPanel = Ext
										.getCmp('JobChangeForm');
								if (JobChangeFormPanel != null) {
									tabs.remove('JobChangeForm');
								}
								JobChangeFormPanel = new JobChangeForm({
											changeId : rec.data.changeId
										});
								tabs.add(JobChangeFormPanel);
								tabs.activate(JobChangeFormPanel);
							}});
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
				url : __ctxPath + '/hrm/listJobChange.do',
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
		// new JobChangeForm().show();
		var tabs = Ext.getCmp('centerTabPanel');
		var JobChangeFormPanel = Ext.getCmp('JobChangeForm');
		if (JobChangeFormPanel != null) {
			tabs.remove('JobChangeForm');
		}
		JobChangeFormPanel = new JobChangeForm();
		tabs.add(JobChangeFormPanel);
		tabs.activate(JobChangeFormPanel);
	},
	/**
	 * 审核记录
	 * 
	 * @param {}
	 *            record
	 */
	checkRecord : function(record) {
		if (record.data.status != -1) {
			new CheckJobChangeWin({
						changeId : record.data.changeId
					}).show();
		} else {
			Ext.ux.Toast.msg('操作信息', '草稿不能被审核！');
		}
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
							url : __ctxPath + '/hrm/multiDelJobChange.do',
							params : {
								ids : ids
							},
							method : 'POST',
							success : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '成功删除记录！');
								Ext.getCmp('JobChangeGrid').getStore().reload();
							},
							failure : function(response, options) {
								Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
							}
						});
			}
		});// end of comfirm
	},
	/**
	 * 删除多条记录
	 */
	delRecords : function() {
		var gridPanel = Ext.getCmp('JobChangeGrid');
		var selectRecords = gridPanel.getSelectionModel().getSelections();
		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var ids = Array();
		for (var i = 0; i < selectRecords.length; i++) {
			ids.push(selectRecords[i].data.changeId);
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
		var JobChangeFormPanel = Ext.getCmp('JobChangeForm');
		if (JobChangeFormPanel != null) {
			tabs.remove('JobChangeForm');
		}
		JobChangeFormPanel = new JobChangeForm({
					changeId : record.data.changeId
				});
		tabs.add(JobChangeFormPanel);
		tabs.activate(JobChangeFormPanel);
	},
	/**
	 * 展示操作纪录
	 * 
	 * @param {}
	 *            record
	 */
	operation : function(record) {
		var window = new Ext.Window({
			id : 'JobChangeViewOperationWin',
			title : '职位调动操作纪录',
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
									+ '/pages/hrm/jobChangeOperation.jsp?changeId='
									+ record.data.changeId
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
			case 'btn-check' :
				this.checkRecord(record);
				break;
			case 'btn-del' :
				this.delRecords();
				break;
			case 'btn-edit' :
				this.editRecord(record);
				break;
			case 'btn-operation' :
				this.operation(record);
				break;
			default :
				break;
		}
	}
});
