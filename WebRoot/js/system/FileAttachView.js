Ext.ns('FileAttachView');
/**
 * ������列表
 */
var FileAttachView = function() {
	return new Ext.Panel({
		id : 'FileAttachView',
		title : '附件列表',
		iconCls : 'menu-attachment',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'FileAttachSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '文件名'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_fileName_S_LK'
					}, {
						text : '创建时间'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_createtime_S_LK'
					}, {
						text : '扩展名'
					}, {
						xtype : 'textfield',
						width : 60,
						name : 'Q_ext_S_LK'
					}, {
						text : '上传者'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_creator_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('FileAttachSearchForm');
							var grid = Ext.getCmp('FileAttachGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/system/listFileAttach.do',
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
FileAttachView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
FileAttachView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'fileId',
					dataIndex : 'fileId',
					hidden : true
				}, {
					header : '文件名',
					dataIndex : 'fileName'
				}, {
					header : '文件路径',
					dataIndex : 'filePath'
				}, {
					header : '创建时间',
					dataIndex : 'createtime'
				}, {
					header : '扩展名',
					dataIndex : 'ext'
				}, {
					header : '附件类型',
					dataIndex : 'type'
				}, {
					header : '说明',
					dataIndex : 'note'
				}, {
					header : '上传者',
					dataIndex : 'creator'
				}, {
					header : '管理',
					dataIndex : 'fileId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.fileId;
						var str = '';
						if (isGranted('_FileAttachDel')) {
							str = '<button title="删除" value=" " class="btn-del" onclick="FileAttachView.remove('
									+ editId + ')"></button>';
						}
						if (isGranted('_FileAttachEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="FileAttachDetail.show('
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
				id : 'FileAttachGrid',
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
							if (isGranted('_FileAttachEdit')) {
								FileAttachDetail.show(rec.data.fileId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
FileAttachView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listFileAttach.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'fileId',
										type : 'int'
									}

									, 'fileName', 'filePath', 'createtime',
									'ext', 'type', 'note', 'creator']
						}),
				remoteSort : true
			});
	store.setDefaultSort('fileId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
FileAttachView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'FileAttachFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
//	if (isGranted('_FileAttachAdd')) {
//		toolbar.add(new Ext.Button({
//					iconCls : 'btn-add',
//					text : '添加附件',
//					handler : function() {
//						new FileAttachForm();
//					}
//				}));
//	}

	if (isGranted('_FileAttachDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除附件',
					handler : function() {

						var grid = Ext.getCmp("FileAttachGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.fileId);
						}

						FileAttachView.remove(ids);
					}
				}));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
FileAttachView.remove = function(id) {
	var grid = Ext.getCmp("FileAttachGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/system/multiDelFileAttach.do',
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
FileAttachView.edit = function(id) {
	new FileAttachForm(id);
}
