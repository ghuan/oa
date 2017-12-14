Ext.ns('ReportTemplateView');
/**
 * 报表列表
 */
var ReportTemplateView = function() {
	return new Ext.Panel({
		id : 'ReportTemplateView',
		title : '报表列表',
		iconCls : 'menu-report',
//		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ReportTemplateSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '标题'
					}, {
						xtype : 'textfield',
						name : 'Q_title_S_LK'
					}, {
						text : '描述'
					}, {
						xtype : 'textfield',
						name : 'Q_descp_S_LK'
					}, {
						text : '创建时间'
					}, {
						xtype : 'textfield',
						name : 'Q_createtime_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('ReportTemplateSearchForm');
							var grid = Ext.getCmp('ReportTemplateGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/system/listReportTemplate.do',
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
ReportTemplateView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ReportTemplateView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'reportId',
					dataIndex : 'reportId',
					hidden : true
				}, {
					header : '标题',
					dataIndex : 'title'
				}, {
					header : '模版路径',
					dataIndex : 'reportLocation'
				}, {
					header : '创建时间',
					dataIndex : 'createtime'
				}, {
					header : '修改时间',
					dataIndex : 'updatetime'
				}, {
					header : '管理',
					dataIndex : 'reportId',
					sortable : false,
					width : 55,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.reportId;
						var editName = record.data.title;
						var str = '';
						if (isGranted('_ReportTemplateQuery')) {
							str = '<button title="查看" value=" " class="btn-preview" onclick="ReportTemplateView.preview('
									+ editId + ',\''+editName+ '\')"></button>';
						}
						if(isGranted('_ReportParamSetting')){
						   str+='&nbsp;<button title="设置参数" value=" " class="btn-setting" onclick="ReportTemplateView.param(' + editId +',\''+editName+ '\')"></button>';
						}
						if (isGranted('_ReportTemplateDel')) {
							str += '<button title="删除" value=" " class="btn-del" onclick="ReportTemplateView.remove('
									+ editId + ')"></button>';
						}
						if (isGranted('_ReportTemplateEdit')) {

							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ReportTemplateView.edit('
									+ editId + ')"></button>';
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
				id : 'ReportTemplateGrid',
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
							if (isGranted('_ReportTemplateEdit')) {
								ReportTemplateView.edit(rec.data.reportId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ReportTemplateView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listReportTemplate.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'reportId',
										type : 'int'
									}, 'title', 'descp', 'reportLocation',
									 'createtime', 'updatetime']
						}),
				remoteSort : true
			});
	store.setDefaultSort('reportId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ReportTemplateView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ReportTemplateFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_ReportTemplateAdd')) {

		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加报表',
					handler : function() {
						new ReportTemplateForm();
					}
				}));
	}
	if (isGranted('_ReportTemplateDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除报表',
					handler : function() {

						var grid = Ext.getCmp("ReportTemplateGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.reportId);
						}

						ReportTemplateView.remove(ids);
					}
				}));

	}
	return toolbar;
};

/**
 * 删除单个记录
 */
ReportTemplateView.remove = function(id) {
	var grid = Ext.getCmp("ReportTemplateGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/system/multiDelReportTemplate.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("操作信息", "成功删除秘选记录！");
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
 * 编辑报表
 */
ReportTemplateView.edit = function(id) {
	new ReportTemplateForm(id);
}
ReportTemplateView.param = function(id,name){
    new ReportParamView(id,name);
}
/**
 * 查看报表
 */
ReportTemplateView.preview = function(id,name) {
	// 只允许有一个编辑窗口
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = Ext.getCmp('ReportPreview' + id);
	if (edit == null) {
		edit = new ReportTemplatePreview(id,name);
		tabs.add(edit);
	} else {
		tabs.remove('ReportPreview' + id);
		edit = new ReportTemplatePreview(id,name);
		tabs.add(edit);
	}
	tabs.activate(edit);
}
var ReportTemplatePreview = function(reportId,title) {
	var formPanel = new Ext.FormPanel({
				id : "reportSearchForm" + reportId,
				autoHeight :true ,
//				width:600,
				frame : true,
				layout : 'column',
				items : []
			});
	Ext.Ajax.request({
		url : __ctxPath + "/system/loadReportTemplate.do?reportId=" + reportId,
		success : function(response, options) {
			formPanel.removeAll();
			var object = Ext.util.JSON.decode(response.responseText)
			formPanel.add(object.data);
			formPanel.add([{
				xtype : 'button',
				text : '查询',
				iconCls : 'search',
				handler : function() {
					var searchPanel = Ext.getCmp("reportSearchForm" + reportId);
					if (searchPanel.getForm().isValid()) {
						searchPanel.getForm().submit({
							waitMsg : '正在提交查询',
							url : __ctxPath + '/system/submitReportTemplate.do',
							method : 'post',
							success : function(formPanel, action) {
								var object = Ext.util.JSON
										.decode(action.response.responseText)
								var temp = Ext.getCmp('reportTemp' + reportId);
								temp.body
										.update('<iframe src="report/report.jsp?reportId='
												+ reportId
												+ object.data+ '" width="100%" height="400" scrolling="auto"></iframe>');
							},
							failure : function(formPanel, action) {
							}
						});
					}

				}
			}]);
			formPanel.doLayout();
		}
	});
	var toolbar=new Ext.Toolbar({ 
	id:'createToolbar',
	items:[{
				xtype : 'button',
				text : 'pdf',
				iconCls : 'btn-pdf',
				handler : function() {
					var searchPanel = Ext.getCmp("reportSearchForm" + reportId);
					if (searchPanel.getForm().isValid()) {
						searchPanel.getForm().submit({
							waitMsg : '正在提交查询',
							url : __ctxPath + '/system/submitReportTemplate.do',
							method : 'post',
							success : function(formPanel, action) {
								var object = Ext.util.JSON
										.decode(action.response.responseText)
								window.open(__ctxPath+ '/report/report.jsp?reportId=' + 
								                reportId+object.data+
								'&reportType=pdf');
							},
							failure : function(formPanel, action) {
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : 'excel',
				iconCls : 'btn-xls',
				handler : function() {
					var searchPanel = Ext.getCmp("reportSearchForm" + reportId);
					if (searchPanel.getForm().isValid()) {
						searchPanel.getForm().submit({
							waitMsg : '正在提交查询',
							url : __ctxPath + '/system/submitReportTemplate.do',
							method : 'post',
							success : function(formPanel, action) {
								var object = Ext.util.JSON
										.decode(action.response.responseText)
								document.location.href = __ctxPath+ '/report/report.jsp?reportId=' + 
								                reportId+ object.data+
								'&reportType=xls';
							},
							failure : function(formPanel, action) {
							}
						});
					}
				}
			}, {
				xtype : 'button',
				text : 'html',
				iconCls : 'btn-ie',
				handler : function() {
					var searchPanel = Ext.getCmp("reportSearchForm" + reportId);
					if (searchPanel.getForm().isValid()) {
						searchPanel.getForm().submit({
							waitMsg : '正在提交查询',
							url : __ctxPath + '/system/submitReportTemplate.do',
							method : 'post',
							success : function(formPanel, action) {
								var object = Ext.util.JSON
										.decode(action.response.responseText)
								window.open( __ctxPath+ '/report/report.jsp?reportId=' + 
								                reportId+ object.data+
								'&reportType=html','blank');
							},
							failure : function(formPanel, action) {
							}
						});
					}
				}
			}]});
	var panel = new Ext.Panel({
				id : 'ReportPreview' + reportId,
				title : '查看-'+title,
				iconCls:'menu-report',
				collapsible : true,
				autoScroll : false,
				autoHeight:true,
				items : [formPanel, {
					id : 'reportTemp' + reportId,
					tbar:toolbar,
					autoHeight:true,
					autoScroll : true,
					xtype : 'panel',
					// 根据页面传来reportId，动态加载报表模版路径，显示报表
					html : '<iframe src="'+__ctxPath+'/report/report.jsp?reportId='
							+ reportId
							+ '" height="400" width="100%" scrolling="auto"></iframe>'
				}]
			});
	return panel;
}
