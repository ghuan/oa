Ext.ns('ProviderView');
/**
 * [Provider]列表
 */
var ProviderView = function() {
	return new Ext.Panel({
		id : 'ProviderView',
		title : '供应商列表',
		iconCls : 'menu-provider',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ProviderSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '供应商名称'
					}, {
						xtype : 'textfield',
						name : 'Q_providerName_S_LK',
						width : 100
					}, {
						text : '联系人'
					}, {
						xtype : 'textfield',
						name : 'Q_contactor_S_LK',
						width : 100
					}, {
						text : '等级'
					}, {
						hiddenName : 'Q_rank_N_EQ',
						width : 100,
						xtype : 'combo',
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : [['null', '　'], ['1', '一级供应商'], ['2', '二级供应商'],
								['3', '三级供应商'], ['4', '四级供应商']]
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('ProviderSearchForm');
							var grid = Ext.getCmp('ProviderGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/customer/listProvider.do',
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
ProviderView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ProviderView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'providerId',
					dataIndex : 'providerId',
					hidden : true
				}, {
					header : '等级',
					dataIndex : 'rank',
					width : 40,
					renderer : function(value) {
						if (value == '1') {
							return '<img title="一级供应商" src="' + __ctxPath
									+ '/images/flag/customer/grade_one.png"/>';
						} else if (value == '2') {
							return '<img title="二级供应商" src="' + __ctxPath
									+ '/images/flag/customer/grade_two.png"/>';
						} else if (value == '3') {
							return '<img title="三级供应商" src="'
									+ __ctxPath
									+ '/images/flag/customer/grade_three.png"/>';
						} else {
							return '<img title="四级供应商" src="' + __ctxPath
									+ '/images/flag/customer/grade_four.png"/>';
						}
					}
				}, {
					header : '供应商名字',
					dataIndex : 'providerName',
					width : 120
				}, {
					header : '联系人',
					dataIndex : 'contactor',
					width : 80
				}, {
					header : '电话',
					dataIndex : 'phone',
					width : 80
				}, {
					header : '地址',
					dataIndex : 'address',
					width : 150
				}, {
					header : '管理',
					dataIndex : 'providerId',
					width : 100,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.providerId;
						var str ='';
						if (isGranted('_ProviderDel')) {
							str= '<button title="删除" value=" " class="btn-del" onclick="ProviderView.remove('
									+ editId + ')">&nbsp;&nbsp;</button>';
						}
						if (isGranted('_ProviderEdit')) {
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ProviderView.edit('
									+ editId + ')">&nbsp;&nbsp;</button>';
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
				id : 'ProviderGrid',
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

	AppUtil.addPrintExport(grid);// 打印功能

	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							if (isGranted('_ProviderEdit')) {
									ProviderView.edit(rec.data.providerId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
ProviderView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/customer/listProvider.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'providerId',
										type : 'int'
									}

									, 'rank', 'providerName', 'contactor',
									'phone', 'address'
							/*
							 * 'fax', 'site', 'email', 'zip', 'openBank',
							 * 'account', 'notes',
							 */]
						}),
				remoteSort : true
			});
	store.setDefaultSort('providerId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ProviderView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ProviderFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});

	if (isGranted('_ProviderAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加供应商',
					xtype : 'button',
					handler : function() {
						new ProviderForm();
					}
				}))
	};
	if (isGranted('_ProviderDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除供应商',
					xtype : 'button',
					handler : function() {

						var grid = Ext.getCmp("ProviderGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.providerId);
						}

						ProviderView.remove(ids);
					}
				}))
	};
	
	toolbar.add(new Ext.Button({
	    xtype:'button',
	    text:'发送邮件',
	    iconCls:'btn-mail_send',
	    handler:function(){
	    	var grid = Ext.getCmp("ProviderGrid");

			var selectRecords = grid.getSelectionModel()
					.getSelections();

			if (selectRecords.length == 0) {
				Ext.ux.Toast.msg("信息", "请选择要发送邮件的供应商！");
				return;
			}
			var ids = Array();
			var names=Array();
			for (var i = 0; i < selectRecords.length; i++) {
				ids.push(selectRecords[i].data.providerId);
				names.push(selectRecords[i].data.providerName)
			}
	       new SendMailForm(ids,names,1);
	    }
	}));
	
	return toolbar;
};

/**
 * 删除单个记录
 */
ProviderView.remove = function(id) {
	var grid = Ext.getCmp("ProviderGrid");
	Ext.Msg.confirm('信息确认', '删除供应商，则该供应商下的<font color="red">产品</font>也删除，您确认要删除该记录吗？',
	150,function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/customer/multiDelProvider.do',
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
ProviderView.edit = function(id) {
	new ProviderForm(id);
}
