/**
 * @author:
 * @class JobView
 * @extends Ext.Panel
 * @description 职位管理
 * @company 广州宏天软件有限公司
 * @createtime:2010-01-16
 */
JobView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				if (_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);
				// 初始化组件
				this.initComponents();
				// 调用父类构造
				JobView.superclass.constructor.call(this, {
							id : 'JobView',
							iconCls : 'menu-job',
							title : '职位管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor

			// 职位分类ID
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
											fieldLabel : '职位名称',
											name : 'Q_jobName_S_LK',
											xtype : 'textfield'
										}
									}, {
										// columnWidth : .3,
										layout : 'form',
										items : {
											fieldLabel : '所属部门',
											name : 'Q_depId_S_LK',
											xtype : 'textfield'
										}
									}, {
										// columnWidth : .3,
										layout : 'form',
										items : {
											fieldLabel : '备注',
											name : 'Q_memo_S_LK',
											xtype : 'textfield'
										}
									}, {
										// columnWidth : .3,
										layout : 'form',
										items : {
											fieldLabel : '状态为未删除的',// 0=未删除 1=删除',
											name : 'Q_delFlag_SN_EQ',
											width : 80,
											xtype : 'hidden',
											value : 0
										}
									},{
										// columnWidth : .3,
										layout : 'form',
										items : {
											xtype : 'button',
											text : '查询',
											iconCls : 'search',
											handler : this.search
													.createCallback(this)
										}
									}]
						});// end of the searchPanel

				// 加载数据至store
				this.store = new Ext.data.JsonStore({
							url : __ctxPath + "/hrm/listJob.do",
							baseParams : {
								"Q_delFlag_SN_EQ" : 0
							},// 只查询未被删除的档案
							root : 'result',
							totalProperty : 'totalCounts',
							remoteSort : true,
							fields : [{
										name : 'jobId',
										type : 'int'
									}, 'jobName', 'department', 'memo']
						});
				this.store.setDefaultSort('jobId', 'desc');
				// 加载数据
				this.store.load({
							params : {
								start : 0,
								limit : 25
							}
						});

				var actions = new Array();
				if (isGranted('_JobDel')) {
					actions.push({
								iconCls : 'btn-del',
								qtip : '删除',
								style : 'margin:0 3px 0 3px'
							});
				}
				if (isGranted('_JobEdit')) {
					actions.push({
								iconCls : 'btn-edit',
								qtip : '编辑',
								style : 'margin:0 3px 0 3px'
							});
				}
				this.rowActions = new Ext.ux.grid.RowActions({
							header : '管理',
							width : 80,
							actions : actions
						});

				// 初始化ColumnModel
				var sm = new Ext.grid.CheckboxSelectionModel();
				var cm = new Ext.grid.ColumnModel({
							columns : [sm, new Ext.grid.RowNumberer(), {
										header : 'jobId',
										dataIndex : 'jobId',
										hidden : true
									}, {
										header : '职位名称',
										dataIndex : 'jobName'
									}, {
										header : '所属部门',
										dataIndex : 'department',
										renderer : function(value) {
											return value.depName;
										}
									}, {
										header : '备注',
										dataIndex : 'memo'
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
				if (isGranted('_JobAdd')) {
					this.topbar.add(new Ext.Button({
								iconCls : 'btn-add',
								text : '添加职位',
								handler : this.createRecord
							}));
				}
				if(isGranted('_JobDel')){
				  this.topbar.add(new Ext.Button({
								iconCls : 'btn-del',
										text : '删除职位',
										handler : this.delRecords,
										scope : this
							}));
				}
				if (isGranted('_JobRec')) {
					this.topbar.add(new Ext.Button({
								iconCls : 'btn-empProfile-recovery',
								text : '恢复职位',
								handler : this.recovery
							}));
				}
				this.gridPanel = new Ext.grid.GridPanel({
							id : 'JobGrid',
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

				this.gridPanel.addListener('rowdblclick', function(grid,
								rowindex, e) {
							grid.getSelectionModel().each(function(rec) {
										if(isGranted('_JobEdit')){
										new JobForm({
													jobId : rec.data.jobId
												}).show();
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
						url : __ctxPath + '/hrm/listJob.do',
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
				new JobForm().show();
			},
			delByIds : function(ids) {
				Ext.Msg.confirm('信息确认', '您确认要删除所选记录吗？', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
											url : __ctxPath
													+ '/hrm/multiDelJob.do',
											params : {
												ids : ids
											},
											method : 'POST',
											success : function(response,
													options) {
												Ext.ux.Toast.msg('操作信息',
														'成功删除信息！');
												Ext.getCmp('JobGrid')
														.getStore().reload();
											},
											failure : function(response,
													options) {
												Ext.ux.Toast.msg('操作信息',
														'操作出错，请联系管理员！');
											}
										});
							}
						});// end of comfirm
			},
			/**
			 * 删除记录
			 * 
			 * @param {}
			 *            record
			 */
			delRecords : function(record) {
				var gridPanel = Ext.getCmp('JobGrid');
				var selectRecords = gridPanel.getSelectionModel()
						.getSelections();
				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var ids = Array();
				for (var i = 0; i < selectRecords.length; i++) {
					ids.push(selectRecords[i].data.jobId);
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
				new JobForm({
							jobId : record.data.jobId
						}).show();
			},
			/**
			 * 恢复职位
			 */
			recovery : function(record) {
				new RecoveryJobWin().show();
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
					default :
						break;
				}
			}
		});
