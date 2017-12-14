Ext.ns('AppointmentView');
/**
 * 约会列表
 */
var AppointmentView = function() {
	return new Ext.Panel({
		id : 'AppointmentView',
		title : '约会列表',
		iconCls:'menu-appointment',
		autoScroll : true,
		items : [new Ext.FormPanel({
			id : 'AppointmentSearchForm',
			bodyStyle:'padding:2px',
			frame:true,
			defaults:{height:60},
			items: [{
	            layout:'column',
	            border:false,
	            items:[
		            	{
			                columnWidth:.325,
			                layout: 'form',
			                border:false,
			                items: [{
			                    xtype:'datetimefield',
			                    fieldLabel: '开始时间',
			                    name: 'Q_startTime_D_GT',
			                    format: 'Y-m-d H:i:s',
			                    anchor:'95%'
			                }, {
			                		xtype : 'datetimefield',
			                		fieldLabel: '结束时间',
									name : 'Q_endTime_D_LT',
									format: 'Y-m-d H:i:s',
									anchor:'95%'
			                }]
		            	},//end of one column
		            	{
		            		columnWidth:.325,
		            		layout: 'form',
			                border:false,
			                items:[
			                	{
			                		xtype : 'textfield',
									name : 'Q_subject_S_LK',
									fieldLabel:'标题',
									anchor:'95%'
			                	},{
			                		xtype : 'textfield',
									name : 'Q_content_S_LK',
									fieldLabel:'内容',
									anchor:'95%'
			                	}
			                ]
		            	},{
		            		border:false,
			                columnWidth:.15,
			            	items:[
			            		{xtype : 'button',
								text : '查询',
								iconCls : 'search',
								handler : function() {
									var searchPanel = Ext.getCmp('AppointmentSearchForm');
									var grid = Ext.getCmp('AppointmentGrid');
									if (searchPanel.getForm().isValid()) {
										searchPanel.getForm().submit({
											waitMsg : '正在提交查询', url : __ctxPath + '/task/listAppointment.do',
											success : function(formPanel, action) {
												var result = Ext.util.JSON.decode(action.response.responseText);
												grid.getStore().loadData(result);
											}
										});
									}
								}
							},{
									xtype:'button',
									text:'重置',
									iconCls:'btn-reseted',
									handler:function(){
										var searchPanel = Ext.getCmp('AppointmentSearchForm');
										searchPanel.getForm().reset();
									}
							}
			            	]
			            }
	            	]
	            }]
		}), this.setup()]
	});
};
/**
 * 建立视图
 */
AppointmentView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
AppointmentView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'appointId',
					dataIndex : 'appointId',
					hidden : true
				}, {
					header : '主题',
					dataIndex : 'subject'
				}, {
					header : '开始时间',
					dataIndex : 'startTime'
				}, {
					header : '结束时间',
					dataIndex : 'endTime'
				}, {
					header : '地点',
					dataIndex : 'location'
				},{
					header : '管理',
					dataIndex : 'appointId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.appointId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="AppointmentView.remove('
								+ editId + ')">&nbsp;</button>';
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppointmentView.edit('
								+ editId + ')">&nbsp;</button>';
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
				id : 'AppointmentGrid',
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

		AppUtil.addPrintExport(grid);
			
		grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							AppointmentView.edit(rec.data.appointId);
				});
		});
			
	return grid;

};

/**
 * 初始化数据
 */
AppointmentView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/task/listAppointment.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'appointId',
										type : 'int'
									}

									, 'userId', 'subject', 'startTime',
									'endTime', 'content', 'notes', 'location',
									'inviteEmails']
						}),
				remoteSort : true
			});
	store.setDefaultSort('appointId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
AppointmentView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'AppointmentFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							text : '添加约会',
							xtype : 'button',
							handler : function() {
								new AppointmentForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除约会',
							xtype : 'button',
							handler : function() {

								var grid = Ext.getCmp("AppointmentGrid");

								var selectRecords = grid.getSelectionModel()
										.getSelections();

								if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
								var ids = Array();
								for (var i = 0; i < selectRecords.length; i++) {
									ids.push(selectRecords[i].data.appointId);
								}

								AppointmentView.remove(ids);
							}
						}]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
AppointmentView.remove = function(id) {
	var grid = Ext.getCmp("AppointmentGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/task/multiDelAppointment.do',
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
AppointmentView.edit = function(id) {
	new AppointmentForm(id);
}
