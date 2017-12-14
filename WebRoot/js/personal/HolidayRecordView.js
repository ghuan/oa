Ext.ns('HolidayRecordView');
/**
 * 假期设置列表
 */
var HolidayRecordView = function() {
	return new Ext.Panel({
		id : 'HolidayRecordView',
		title : '假期设置列表',
		iconCls:'menu-holidayRecord',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'HolidayRecordSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '开始日期'
					}, {
						xtype : 'datefield',
						name : 'Q_startTime_D_GT',
						format:'Y-m-d'
					}, {
						text : '结束日期'
					}, {
						xtype : 'datefield',
						name : 'Q_endTime_S_LK',
						format:'Y-m-d'
					}, {
						text : '所属用户'
					}, {
						xtype:'textfield',
						readOnly:true,
						name:'HD_fullname',
						id:'HD_fullname',
						width:80
					},
					{
						xtype : 'hidden',
						name : 'Q_userId_L_EQ',
						id:'Q_userId_L_EQ'
					}, {
						xtype : 'button',
										text : '选择',
										iconCls : 'btn-select',
										width : 80,
										//人员选择器
										handler : function() {
											UserSelector.getView(
												function(ids, names) {
												  var userId = Ext.getCmp('Q_userId_L_EQ');
												  var fullname = Ext.getCmp('HD_fullname').setValue(names);
												  userId.setValue(ids);
												},true).show();//true表示单选
						}
					},{
						text : '全公司假期'
					}, {
						xtype : 'textfield',
						name : 'Q_isAll_SN_EQ',
						xtype:'checkbox',
						inputValue:'1'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('HolidayRecordSearchForm');
							var grid = Ext.getCmp('HolidayRecordGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/personal/listHolidayRecord.do',
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
HolidayRecordView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
HolidayRecordView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'recordId',
					dataIndex : 'recordId',
					hidden : true
				}, {
					header : '开始日期',
					dataIndex : 'startTime'
				}, {
					header : '结束日期',
					dataIndex : 'endTime'
				}, {
					header : '所属用户',
					dataIndex : 'fullname'
				}, {
					header : '全公司假期',
					dataIndex : 'isAll',
					renderer:function(val){
						if(val==1){
							return '是';
						}else{
							return '否';
						}
					}
				}, {
					header : '管理',
					dataIndex : 'recordId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.recordId;
						var str='';
						if(isGranted('_HolidayRecordDel')){
							str= '<button title="删除" value=" " class="btn-del" onclick="HolidayRecordView.remove('+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_HolidayRecordEdit')){
							str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="HolidayRecordView.edit('+ editId + ')">&nbsp;</button>';
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
				id : 'HolidayRecordGrid',
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
					   if(isGranted('_HolidayRecordEdit')){
							HolidayRecordView.edit(rec.data.recordId);
					   }
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
HolidayRecordView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/personal/listHolidayRecord.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'recordId',
										type : 'int'
									}
									,'fullname', 'startTime', 'endTime', 'userId', 'isAll']
						}),
				remoteSort : true
			});
	store.setDefaultSort('recordId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
HolidayRecordView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'HolidayRecordFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if(isGranted('_HolidayRecordAdd')){
		toolbar.add(new Ext.Button({
		    iconCls : 'btn-add',
			text : '添加假期设置',
			handler : function() {
				new HolidayRecordForm();
			}
		}));
	}
	if(isGranted('_HolidayRecordDel')){
	    toolbar.add(new Ext.Button({
	        iconCls : 'btn-del',
			text : '删除假期设置',
			handler : function() {
				var grid = Ext.getCmp("HolidayRecordGrid");
				var selectRecords = grid.getSelectionModel().getSelections();
				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var ids = Array();
				for (var i = 0; i < selectRecords.length; i++) {
					ids.push(selectRecords[i].data.recordId);
				}
				HolidayRecordView.remove(ids);
			}
	    }));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
HolidayRecordView.remove = function(id) {
	var grid = Ext.getCmp("HolidayRecordGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/personal/multiDelHolidayRecord.do',
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
HolidayRecordView.edit = function(id) {
	new HolidayRecordForm(id);
}
