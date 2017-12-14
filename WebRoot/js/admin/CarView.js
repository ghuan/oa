Ext.ns('CarView');
/**
 * [Car]列表
 */
var CarView= function() {
	return new Ext.Panel({
		id : 'CarView',
		title : '车辆列表',
		iconCls:'menu-car',
		autoScroll : true,
		items : [
		 new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'CarSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '车牌号码'
					}, {
						xtype : 'textfield',
						name : 'Q_carNo_S_LK'
					}, {
						text : '车类型'
					}, {
						name : 'Q_carType_S_LK',
						xtype : 'combo',
						anchor : '95%',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [['1', '轿车'], ['2', '货车'],['3','商务车']]
					}, {
						text : '当前状态' // 1=可用2=维修中 0=报废
					}, {
						hiddenName : 'Q_status_SN_EQ',
						xtype : 'combo',
						anchor : '95%',
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [['1', '可用'], ['2', '维修中'],['0','已报废']]
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('CarSearchForm');
							var grid = Ext.getCmp('CarGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/admin/listCar.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}]
		}), 
		this.setup()]
	});
};
/**
 * 建立视图
 */
CarView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
CarView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'carId',
					dataIndex : 'carId',
					hidden : true
				}, {
					header : '车牌号码',
					dataIndex : 'carNo'
				}, {
					header : '车辆类型',
					dataIndex : 'carType'
				}, {
					header : '发动机型号',
					dataIndex : 'engineNo'
				}, {
					header : '购买保险时间',
					dataIndex : 'buyInsureTime'
				}, {
					header : '年审时间',
					dataIndex : 'auditTime'
				},  {
					header : '厂牌型号',
					dataIndex : 'factoryModel'
				}, {
					header : '驾驶员',
					dataIndex : 'driver'
				}, {
					header : '购置日期',
					dataIndex : 'buyDate'
				}, {
					header : '当前状态', // 1=可用2=维修中0=报废
					dataIndex : 'status',
					renderer:function(value){
					      if(value=='1'){
					         return '可用';
					      }
					      if(value=='2'){
					      	 return '维修中';
					      }
					      if(value=='0'){
					        return '已报废';
					      }
					
					}
				},{
					header : '管理',
					dataIndex : 'carId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.carId;
						var str='';
						if(isGranted('_CarDel')){
						str = '<button title="删除" value=" " class="btn-del" onclick="CarView.remove('
								+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_CarEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="CarView.edit('
								+ editId + ')">&nbsp;</button>';
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
				id : 'CarGrid',
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
							if(isGranted('_CarEdit')){
							CarView.edit(rec.data.carId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
CarView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listCar.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'carId',
										type : 'int'
									}

									, 'carNo', 'carType', 'engineNo',
									'buyInsureTime', 'auditTime', 'notes',
									'factoryModel', 'driver', 'buyDate',
									'status', 'cartImage']
						}),
				remoteSort : true
			});
	store.setDefaultSort('carId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
CarView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'CarFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_CarAdd')){
			toolbar.add(new Ext.Button({
			                iconCls : 'btn-car_add',
							text : '添加车辆',
							handler : function() {
								new CarForm();
							}
			}));
			}
			if(isGranted('_CarDel')){
			  toolbar.add(new Ext.Button({
			                iconCls : 'btn-car_del',
							text : '删除车辆',
							handler : function() {

								var grid = Ext.getCmp("CarGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.carId);
								}

								CarView.remove(ids);
							}
			  }));
				
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
CarView.remove = function(id) {
	var grid = Ext.getCmp("CarGrid");
	Ext.Msg.confirm('信息确认', '删除车辆会把该车辆申请记录和维修记录一起删除，您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/admin/multiDelCar.do',
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
CarView.edit = function(id) {
	new CarForm(id);
}
