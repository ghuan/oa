Ext.ns('DepreRecordView');
/**
 * [DepreRecord]列表
 */
var DepreRecordView = function() {
	return new Ext.Panel({
		id : 'DepreRecordView',
		title : '固定资产折旧记录列表',
		iconCls:'menu-depRecord',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DepreRecordSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '资产名称'
					}, {
						xtype : 'textfield',
						name : 'Q_fixedAssets.assetsName_S_LK'
					}, {
						text : '折旧时间:从'
					}, {				
						xtype : 'datefield',
						name : 'Q_calTime_D_GE',
						format:'Y-m-d'
					},{ 
						text:'到:'
					},{
					    xtype:'datefield',
					    name:'Q_calTime_D_LE',
					    format:'Y-m-d'
					    
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('DepreRecordSearchForm');
							var grid = Ext.getCmp('DepreRecordGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listDepreRecord.do',
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
DepreRecordView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DepreRecordView.prototype.grid = function() {
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), {
					header : 'recordId',
					dataIndex : 'recordId',
					hidden : true
				}, {
					header : '资产名称',
					dataIndex : 'assets'
				},{
				   header:'折算类型',
				   dataIndex:'depType'
				}, {
					header : '工作量',
					id:'workCapacity',
					dataIndex : 'workCapacity',
					renderer : function(value, metadata, record, rowIndex,colIndex){
						if(value!=null){
							var unit=record.data.workGrossUnit;	
							return value+' '+unit;
						}else{
							return '';						
						}
					}
				}, {
					header : '折旧值',
					dataIndex : 'depreAmount'
				}, {
					header : '计算时间',
					dataIndex : 'calTime'
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
				id : 'DepreRecordGrid',
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight : true,
				cm : cm,
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

	return grid;

};

/**
 * 初始化数据
 */
DepreRecordView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listDepreRecord.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'recordId',
										type : 'int'
									}

									,{ name:'assets',
									   mapping:'fixedAssets.assetsName'
									}, 'workCapacity',
									'depreAmount', 'calTime',{name:'workGrossUnit',
									mapping:'fixedAssets.workGrossUnit'}
									,{
									name:'depType',
									   mapping:'fixedAssets.depreType.typeName'
									}]
						}),
				remoteSort : true
			});
	store.setDefaultSort('recordId', 'desc');
	return store;
};
