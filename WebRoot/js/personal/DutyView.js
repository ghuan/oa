Ext.ns('DutyView');
/**
 * 排班列表
 */
var DutyView = function() {
	return new Ext.Panel({
		id : 'DutyView',
		iconCls:'menu-duty',
		title : '排班列表',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DutySearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '姓名'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_fullname_S_LK'
					}, {
						text : '班制'
					}, {
						xtype : 'textfield',
						width : 80,
						name : 'Q_dutySystem_S_LK'
					}, {
						text : '开始时间'
					}, {
						xtype : 'datefield',
						width : 80,
						format: 'Y-m-d',
						name : 'Q_startTime_D_GE'
					}, {
						text : '结束时间'
					}, {
						xtype : 'datefield',
						width : 80,
						format:'Y-m-d',
						name : 'Q_endTime_D_LE'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('DutySearchForm');
							var grid = Ext.getCmp('DutyGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/personal/listDuty.do',
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
DutyView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DutyView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'dutyId',
					dataIndex : 'dutyId',
					hidden : true
				}, {
					header : '姓名 ',
					dataIndex : 'fullname'
				}, {header:'部门',
					dataIndex:'appUser',
					renderer:function(val){
						if(val.department==null){
						   return '';
						}else{
						   return val.department.depName;
						}
					}
				},{
					header : '班制',
					dataIndex : 'dutySystem',
					renderer:function(val){
						return val.systemName;
					}
				}, {
					header : '开始时间',
					dataIndex : 'startTime'
				}, {
					header : '结束时间',
					dataIndex : 'endTime'
				}, {
					header : '管理',
					dataIndex : 'dutyId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.dutyId;
						var str='';
						if(isGranted('_DutyDel')){
							str= '<button title="删除" value=" " class="btn-del" onclick="DutyView.remove('
								+ editId + ')">&nbsp;&nbsp;</button>';
						}
						if(isGranted('_DutyEdit')){
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="DutyView.edit('
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
				id : 'DutyGrid',
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
						  if(isGranted('_DutyEdit')){
							DutyView.edit(rec.data.dutyId);
						  }
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
DutyView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/personal/listDuty.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'dutyId',
										type : 'int'
									}
									, 'userId', 'fullname', 'dutySystem','appUser',
									'startTime', 'endTime']
						}),
				remoteSort : true
			});
	store.setDefaultSort('dutyId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DutyView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'DutyFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
    if(isGranted('_DutyAdd')){
		toolbar.add(new Ext.Button({
			iconCls : 'btn-add',
			text : '添加排班',
			handler : function() {
				new DutyForm();
			}
		}));
    }
    if(isGranted('_DutyDel')){
        toolbar.add(new Ext.Button({
            iconCls : 'btn-del',
			text : '删除排班',
			handler : function() {
	
				var grid = Ext.getCmp("DutyGrid");
				var selectRecords = grid.getSelectionModel().getSelections();
	
				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var ids = Array();
				for (var i = 0; i < selectRecords.length; i++) {
					ids.push(selectRecords[i].data.dutyId);
				}
	
				DutyView.remove(ids);
			}
        }));
    }
	return toolbar;
};

/**
 * 删除单个记录
 */
DutyView.remove = function(id) {
	var grid = Ext.getCmp("DutyGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/personal/multiDelDuty.do',
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
DutyView.edit = function(id) {
	new DutyForm(id);
}
