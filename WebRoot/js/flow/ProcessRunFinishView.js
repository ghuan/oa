Ext.ns('ProcessRunFinishView');
/**
 * 申请列表
 */
var ProcessRunFinishView = function() {
	return new Ext.Panel({
		id : 'ProcessRunFinishView',
		title : '已办结的流程',
		iconCls:'menu-flowEnd',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'ProcessRunFinishSearchForm',
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
						name : 'Q_subject_S_LK'
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('ProcessRunFinishSearchForm');
							var grid = Ext.getCmp('ProcessRunGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/flow/listProcessRun.do',
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
ProcessRunFinishView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ProcessRunFinishView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'runId',
					dataIndex : 'runId',
					hidden : true
				}, {
					header : '标题',
					dataIndex : 'subject'
				},{
					header : '时间',
					dataIndex : 'createtime',
					width:60
				},  {
					header:'流程状态',
					dataIndex:'runStatus',
					renderer:function(val){
						if(val==0){
							return '<font color="red">草稿</font>';
						}else if(val==1){
							return '<font color="green">正在运行</font>';
						}else if(val==2){
							return '<font color="gray">结束</font>';
						}
					}
				},{
					header : '管理',
					dataIndex : 'runId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,colIndex) {
						var runId = record.data.runId;
						var defId=record.data.defId;
						var piId=record.data.piId;
						var subject=record.data.subject;
						var runStatus=record.data.runStatus
						var str="";
						//runId,defId,piId,name
						if(piId!=null && piId!=undefined && piId!=''){		
							str += '&nbsp;<button type="button" title="审批明细" value=" " class="btn-flowView" onclick="ProcessRunFinishView.detail('+
							runId+','+defId+',\''+ piId + '\',\''+ subject + '\')"></button>';
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
				id : 'ProcessRunFinishGrid',
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight : true,
				tbar:new Ext.Toolbar(),
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
	AppUtil.addPrintExport(grid);
	return grid;

};

/**
 * 初始化数据
 */
ProcessRunFinishView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/flow/listProcessRun.do?Q_runStatus_SN_EQ=2'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'runId',
										type : 'int'
									}
									, 'subject','createtime',
									'defId', 'piId','runStatus']
						}),
				remoteSort : true
			});
	store.setDefaultSort('runId', 'desc');
	return store;
};

/**
 * 显示明细
 * @param {} runId
 * @param {} name
 */
ProcessRunFinishView.detail=function(runId,defId,piId,name){
	var contentPanel=App.getContentPanel();
	var detailView=contentPanel.getItem('ProcessRunDetail'+runId);
	
	if(detailView==null){
		detailView=new ProcessRunDetail(runId,defId,piId,name);
		contentPanel.add(detailView);
	}
	contentPanel.activate(detailView);
};
