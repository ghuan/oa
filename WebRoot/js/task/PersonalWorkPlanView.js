Ext.ns('PersonalWorkPlanView');
/**
 * 工作计划列表
 */
var PersonalWorkPlanView = function() {
	return new Ext.Panel({
		id : 'PersonalWorkPlanView',
		title : '我的计划列表',
		iconCls:'menu-myplan',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'PersonalWorkPlanSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '计划名称'
					}, {
						xtype : 'textfield',
						name : 'Q_planName_S_LK'
					},{
						text : '计划类型'
					}, {
						xtype : 'textfield',
						hiddenName : 'Q_planType.typeId_L_EQ',
						xtype : 'combo',
						editable : false,
						triggerAction : 'all',
						displayField : 'name',
						valueField : 'id',
						mode : 'local',
						store : new Ext.data.SimpleStore({
									autoLoad : true,
									url : __ctxPath
											+ '/task/comboPlanType.do',
									fields : ['id', 'name']
								})
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PersonalWorkPlanSearchForm');
							var grid = Ext.getCmp('PersonalWorkPlanGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/task/personalWorkPlan.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					},{
					 xtype:'button',
					 text:'重置',
					 handler:function(){
					   var searchPanel = Ext.getCmp('PersonalWorkPlanSearchForm');
					   searchPanel.getForm().reset();
					 }
					}]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
PersonalWorkPlanView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
PersonalWorkPlanView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'planId',
					dataIndex : 'planId',
					hidden : true
				}, {
					header : '标识',
					dataIndex : 'icon',
					renderer:function(value){
					   return '<div class="'+value+'"></div>';
					}
				}, {
					header : '计划名称',
					dataIndex : 'planName'
				}, {
					header : '开始日期',
					dataIndex : 'startTime'
				}, {
					header : '结束日期',
					dataIndex : 'endTime'
				}, {
					header : '计划类型',
					dataIndex : 'typeName'
				}, {
					header : '创建人',
					dataIndex : 'userName'
				}, {
					header : '负责人',
					dataIndex : 'principal'
				},{
				   header:'是否生效',
				   dataIndex:'startTime',
				   renderer:function(value, metadata, record, rowIndex,
								colIndex){
				      var startTime=new Date(getDateFromFormat(value, "yyyy-MM-dd H:mm:ss"));				
				     var endTime=new Date(getDateFromFormat(record.data.endTime, "yyyy-MM-dd H:mm:ss"));
				      var today=new Date();
				      if(startTime>today){
				        return '<a style="color:blue;">未生效</a>';
				      }else if(startTime<=today&&endTime>=today){
				        return '<a style="color:green;">已生效</a>'; 
				      }else if(endTime<today){
				       return '<a style="color:red;">已失效</a>';
				      }
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
				id : 'PersonalWorkPlanGrid',
//				tbar : this.topbar(),
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
							PersonalWorkPlanView.detail(rec.data.planId,rec.data.planName);
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
PersonalWorkPlanView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/task/personalWorkPlan.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'planId',
										type : 'int'
									}

									, 'planName', 'planContent', 'startTime',
									'endTime', {
									  name:'typeName',
									  mapping:'planType.typeName'
									}, {
									  name:'userName',
									  mapping:'appUser.fullname'
									},'principal',
									'note', 'status', 'isPersonal', 'icon']
						}),
				remoteSort : true
			});
	store.setDefaultSort('planId', 'desc');
	return store;
};

PersonalWorkPlanView.detail = function(id,name) {
	new WorkPlanDetail(id,name);
}
