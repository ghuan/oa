Ext.ns('DepreTypeView');
/**
 * [DepreType]列表
 */
var DepreTypeView = function() {
	return new Ext.Panel({
		id : 'DepreTypeView',
		title : '折算类型列表',
		iconCls:'menu-depre-type',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DepreTypeSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '类型名称'
					}, {
						xtype : 'textfield',
						name : 'Q_typeName_S_LK'
					},
//					{
//						text : ''
//					}, {
//						xtype : 'textfield',
//						name : 'Q_depreRate_S_LK'
//					}, {
//						text : '单位为月'
//					}, {
//						xtype : 'textfield',
//						name : 'Q_deprePeriod_S_LK'
//					}, {
//						text : ''
//					}, {
//						xtype : 'textfield',
//						name : 'Q_typeDesc_S_LK'
//					}, 
						{
						text : '折算类型'  //1=平均年限法2=工作量法 加速折旧法3=双倍余额递减法4=年数总和法
					}, {
						xtype : 'textfield',
						hiddenName : 'Q_calMethod_SN_EQ',
						xtype : 'combo',
						allowBlank : false,
						mode : 'local',
						editable : false,
						triggerAction : 'all',
						store : [['1', '平均年限法'], ['2', '工作量法'],['3','双倍余额递减法'],['4','年数总和法']]
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('DepreTypeSearchForm');
							var grid = Ext.getCmp('DepreTypeGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/admin/listDepreType.do',
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
DepreTypeView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DepreTypeView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'depreTypeId',
					dataIndex : 'depreTypeId',
					hidden : true
				}, {
					header : '分类名称',
					dataIndex : 'typeName'
				}, {
					header : '折旧周期(月)',
					dataIndex : 'deprePeriod'
				}, {
					header : '折旧方法',
					dataIndex : 'calMethod',
					renderer:function(value){
					    if(value=='1'){
					        return '平均年限法';
					    }
					    if(value=='2'){
					    	return '工作量法';
					    }
					    if(value=='3'){
					        return '双倍余额递减法';
					    }
					    if(value=='4'){
					    	return '年数总和法';
					    }
					}
				}, {
					header : '方法描述',
					dataIndex : 'typeDesc'
				}, {
					header : '管理',
					dataIndex : 'depreTypeId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.depreTypeId;
						var str='';
						if(isGranted('_DepreTypeDel')){
						str = '<button title="删除" value=" " class="btn-del" onclick="DepreTypeView.remove('
								+ editId + ')">&nbsp;</button>';
						}
						if(isGranted('_DepreTypeEdit')){
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="DepreTypeView.edit('
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
				id : 'DepreTypeGrid',
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
							if(isGranted('_DepreTypeEdit')){
							DepreTypeView.edit(rec.data.depreTypeId);
							}
						});
			});
	return grid;

};

/**
 * 初始化数据
 */
DepreTypeView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/admin/listDepreType.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'depreTypeId',
										type : 'int'
									}

									, 'typeName',  'deprePeriod',
									'typeDesc', 'calMethod']
						}),
				remoteSort : true
			});
	store.setDefaultSort('depreTypeId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DepreTypeView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'DepreTypeFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
			if(isGranted('_DepreTypeAdd')){
			   toolbar.add(new Ext.Button({
			      iconCls : 'btn-add',
							text : '添加折旧类型',
							handler : function() {
								new DepreTypeForm();
							}
			   }))
			}
			
			if(isGranted('_DepreTypeDel')){
			  toolbar.add(new Ext.Button({
			     iconCls : 'btn-del',
							text : '删除折旧类型',
							handler : function() {

								var grid = Ext.getCmp("DepreTypeGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.depreTypeId);
								}

								DepreTypeView.remove(ids);
							}
			  }));
			}
	return toolbar;
};

/**
 * 删除单个记录
 */
DepreTypeView.remove = function(id) {
	var grid = Ext.getCmp("DepreTypeGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/admin/multiDelDepreType.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function(result,request) {
									var res = Ext.util.JSON.decode(result.responseText);
									if(res.success==false){
									    Ext.ux.Toast.msg("信息提示", res.message);
									}else{
										Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
										grid.getStore().reload({
													params : {
														start : 0,
														limit : 25
													}
												});
												
									}
								}
							});
				}
			});
};

/**
 * 
 */
DepreTypeView.edit = function(id) {
	new DepreTypeForm(id);
}
