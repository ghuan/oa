Ext.ns('CarApplyView');
/**
 * [CarApply]列表
 */
var CarApplyView = function() {
	return new Ext.Panel({
		id : 'CarApplyView',
		title : '车辆申请列表',
		iconCls:'menu-car_apply',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CarApplySearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '车牌号'
					}, {
						xtype : 'textfield',
						name : 'Q_car.carNo_S_LK'
					},
//					{
//						text : '用车部门'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_department_S_LK'
//					}, {
//						text : '用车人'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_userFullname_S_LK'
//					},
						{
						text : '审批状态'
					}, {
						xtype : 'textfield',
						hiddenName : 'Q_approvalStatus_SN_EQ',
						xtype : 'combo',
						mode : 'local',
						allowBlank:false,
						editable : false,
						readOnly:true,
						triggerAction : 'all',
						store : [['0', '未审批'], ['1', '已审批']]
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('CarApplySearchForm');
							var grid = Ext.getCmp('CarApplyGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/admin/listCarApply.do',
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
CarApplyView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CarApplyView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'applyId',
					dataIndex : 'applyId',
					hidden : true
				}, {
					header : '车辆车牌号',
					dataIndex : 'carNo'
				}, {
					header : '用车部门',
					dataIndex : 'department'
				}, {
					header : '用车人',
					dataIndex : 'userFullname'
				}, {
					header : '申请日期',
					dataIndex : 'applyDate',
					renderer:function(value){
					  return value.substring(0,10);
					}
				}, {
					header : '原因',
					dataIndex : 'reason'
				}, {
					header : '开始时间',
					dataIndex : 'startTime'
				}, {
					header : '结束时间',
					dataIndex : 'endTime'
				}, {
					header : '申请人',
					dataIndex : 'proposer'
				},{
					header : '审批状态',
					dataIndex : 'approvalStatus',
					renderer:function(value){
					    if(value=='0'){
					        return '未审批';
					    }
					    if(value=='1'){
					        return '已审批';
					    }
					}
				}, {
					header : '管理',
					dataIndex : 'applyId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.applyId;
						var approvalStatus=record.data.approvalStatus;
						var str='';
						if(isGranted('__CarApplyDel')){
						str = '<button title="删除" value=" " class="btn-del" onclick="CarApplyView.remove('
								+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_CarApplyEdit')){
							if(approvalStatus==0){
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CarApplyView.edit('
										+ editId + ')">&nbsp;</button>';
							}
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
				id : 'CarApplyGrid',
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
							if(isGranted('_CarApplyEdit')){
								if(rec.data.approvalStatus==0){
								  CarApplyView.edit(rec.data.applyId);
								}
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CarApplyView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listCarApply.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'applyId',
										type : 'int'
									}

									, {name:'carNo',
									   mapping:'car.carNo'
									}, 'department', 'userFullname',
									'applyDate', 'reason', 'startTime',
									'endTime', 'proposer', 'mileage', 'oilUse',
									'notes', 'approvalStatus']
						}),
				remoteSort : true
			});
	store.setDefaultSort('applyId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CarApplyView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CarApplyFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_CarApplyAdd')){
			  toolbar.add(new Ext.Button({
			     iconCls : 'btn-carapply-add',
							text : '添加车辆申请单',
							handler : function() {
								new CarApplyForm();
//								Ext.getCmp('CarApplyForm').remove('depContainer');
//								Ext.getCmp('CarApplyForm').remove('approvalStatus');
							}
			  }));
			}
			if(isGranted('_CarApplyEdit')){
			 toolbar.add(new Ext.Button({
			   iconCls : 'btn-carapply-del',
							text : '删除车辆申请单',
							handler : function() {

								var grid = Ext.getCmp("CarApplyGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.applyId);
								}

								CarApplyView.remove(ids);
							}
			 }));
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
CarApplyView.remove = function(id) {
	var grid = Ext.getCmp("CarApplyGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/admin/multiDelCarApply.do',
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
CarApplyView.edit = function(id) {
	new CarApplyForm(id);
}
