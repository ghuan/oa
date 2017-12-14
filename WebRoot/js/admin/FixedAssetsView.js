Ext.ns('FixedAssetsView');
/**
 * [FixedAssets]列表
 */
var FixedAssetsView = function() {
}

FixedAssetsView.prototype.setTypeId = function(typeId) {
	this.typeId = typeId;
	FixedAssetsView.typeId = typeId;
}

FixedAssetsView.prototype.getTypeId = function() {
	return this.typeId;
}

FixedAssetsView.prototype.getView = function() {
	return new Ext.Panel({
		id : 'FixedAssetsView',
		title : '固定资产列表',
		region : 'center',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'FixedAssetsSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '资产名称'
					}, {
						xtype : 'textfield',
						name : 'Q_assetsName_S_LK'
					},{
						text : '所属部门'
					}, {
						xtype : 'textfield',
						name : 'Q_beDep_S_LK'
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext
									.getCmp('FixedAssetsSearchForm');
							var grid = Ext.getCmp('FixedAssetsGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/admin/listFixedAssets.do',
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
FixedAssetsView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
FixedAssetsView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'assetsId',
					dataIndex : 'assetsId',
					hidden : true
				}, {
					header : '资产编号',
					dataIndex : 'assetsNo'
				}, {
					header : '资产名称',
					dataIndex : 'assetsName'
				}, {
					header : '资产类别',
					dataIndex : 'assetsTypeName'
				},{
					header : '折旧类型',
					dataIndex : 'depType',
					renderer:function(value){
					     return value.typeName;
					}
				}, {
					header : '开始折旧日期',
					dataIndex : 'startDepre'
				}, {
					header : '资产值',
					dataIndex : 'assetValue'
				},
				 {
				 header : '资产当前值',
				 dataIndex : 'assetCurValue'
				 },
				{
					header : '管理',
					dataIndex : 'assetsId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.assetsId;
						var calMethod=record.data.depType.calMethod;
						var str='';
						if(isGranted('_Depreciate')){
						str = '<button title="开始折算" value=" " class="btn-pred" onclick="FixedAssetsView.depreciate('
								+ editId+','+calMethod+')">&nbsp;</button>';
						}
						if(isGranted('_FixedAssetsDel')){
						str += '&nbsp;<button title="删除" value=" " class="btn-del" onclick="FixedAssetsView.remove('
								+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_FixedAssetsEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="FixedAssetsView.edit('
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
				id : 'FixedAssetsGrid',
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
							if(isGranted('_FixedAssetsEdit')){
							FixedAssetsView.edit(rec.data.assetsId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
FixedAssetsView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listFixedAssets.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'assetsId',
										type : 'int'
									}

									, 'assetsNo', 'assetsName', 'model', {
										name : 'assetsTypeName',
										mapping : 'assetsType.typeName'
									}, 'manufacturer', 'manuDate', 'buyDate',
									'beDep', 'custodian', 'notes',
									'remainValRate', {
										name : 'depType',
										mapping : 'depreType'
									}, 'startDepre', 'intendTerm',
									'intendWorkGross', 'workGrossUnit',
									'assetValue', 'assetCurValue','depreRate']
						}),
				remoteSort : true
			});
	store.setDefaultSort('assetsId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
FixedAssetsView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'FixedAssetsFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_FixedAssetsAdd')){
			   toolbar.add(new Ext.Button({
			      iconCls : 'btn-add',
					text : '创建固定资产项',
					handler : function() {
						new FixedAssetsForm();
						Ext.getCmp('intendTermContainer').hide();
						Ext.getCmp('WorkGrossPanel').hide();
						Ext.getCmp('FixedAssetsForm').remove('assetCurValue');
						Ext.getCmp('depreTypeId').getStore().reload();
						Ext.getCmp('assetsTypeId').getStore().reload();
						Ext.getCmp('FixedAssetsForm').remove('assetsNoContainer');
					}
			   }));
			}
			if(isGranted('_FixedAssetsDel')){
			  toolbar.add(new Ext.Button({
			   iconCls : 'btn-del',
					text : '删除固定资产项',
					handler : function() {

						var grid = Ext.getCmp("FixedAssetsGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.assetsId);
						}

						FixedAssetsView.remove(ids);
					}
			  }));
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
FixedAssetsView.remove = function(id) {
	var grid = Ext.getCmp("FixedAssetsGrid");
	Ext.Msg.confirm('信息确认', '将折算记录一起删除，您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/admin/multiDelFixedAssets.do',
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
FixedAssetsView.edit = function(id) {
	new FixedAssetsForm(id);
	Ext.getCmp('intendTermContainer').hide();
	Ext.getCmp('WorkGrossPanel').hide();
	Ext.getCmp('depreTypeId').getStore().reload();
	Ext.getCmp('assetsTypeId').getStore().reload();

}

/**
 * 折旧
 */
FixedAssetsView.depreciate = function(id,method) {
	if(method==2){
		     new WorkGrossWin(id);
	}else if(method==1||method==3||method==4){
	  Ext.Msg.confirm('操作提示','你决定开始折算了吗？',function(btn){
	      if(btn=='yes'){
	         Ext.Ajax.request({
				url : __ctxPath + '/admin/depreciateDepreRecord.do',
				params : {ids : id},
				method : 'post',
				success : function(response, options) {
					var result = Ext.util.JSON.decode(response.responseText);
					if(result.success){					
					    Ext.ux.Toast.msg("信息提示", "成功产生折旧记录！");
					}else{
					    Ext.ux.Toast.msg("信息提示", result.message);
					}
				},
				failure:function(response, options){
				    var result = Ext.util.JSON.decode(response.responseText);
					Ext.ux.Toast.msg("信息提示",result.message);
				}
			});
	      }
	  	
	  });	
	
	}else{
	   Ext.ux.Toast.msg("信息提示","抱歉，该类型的折算方法待实现！");
	}
}
