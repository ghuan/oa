Ext.ns('DutyRegisterView');
/**
 * 考勤管理
 */
var DutyRegisterView = function() {
	return new Ext.Panel({
		id : 'DutyRegisterView',
		iconCls:'menu-dutyRegister',
		title : '考勤管理',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'DutyRegisterSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [
					{
						text:'查询条件:'
					},
//				{
//						text : '登记时间从'
//					}, {
//						xtype:'datefield',
//						format:'Y-m-d',
//						name : 'Q_registerDate_DL_GE'
//					}, {
//						text:'至'
//					},{
//						xtype:'datefield',
//						format:'Y-m-d',
//						name : 'Q_registerDate_DG_LE'
//					},
						{
						text : '上下班'
					}, {
						hiddenName : 'Q_inOffFlag_SN_EQ',
						xtype : 'combo',
						width: 80,
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [['1', '上班'], ['2', '下班']]
					}, {
						text : '所属用户'
					}, {
						xtype:'textfield',
						readOnly:true,
						name:'DR_fullname',
						id:'DR_fullname',
						width:80
					},
					{
						xtype : 'hidden',
						name : 'Q_appUser.userId_L_EQ',
						id:'Q_appUser.userId_L_EQ'
					}, {
						xtype : 'button',
									text : '选择',
									iconCls : 'btn-select',
									width : 80,
									//人员选择器
									handler : function() {
										UserSelector.getView(
											function(ids, names) {
											  var userId = Ext.getCmp('Q_appUser.userId_L_EQ');
											  var fullname = Ext.getCmp('DR_fullname').setValue(names);
											  userId.setValue(ids);
											},true).show();//true表示单选
						}
					}, {
						text : '考勤选项'
					}, {
						hiddenName : 'Q_regFlag_SN_EQ',
						xtype : 'combo',
						width: 100,
						mode : 'local',
						editable : true,
						triggerAction : 'all',
						store : [['1', '√'], ['2', '迟到'],['3','早退']]
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('DutyRegisterSearchForm');
							var grid = Ext.getCmp('DutyRegisterGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath + '/personal/listDutyRegister.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON.decode(action.response.responseText);
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
DutyRegisterView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
DutyRegisterView.prototype.grid = function() {
	var weekdays=['周日','周一','周二','周三','周四','周五','周六'];
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'registerId',
					dataIndex : 'registerId',
					hidden : true
				}, {
					header : '登记时间',
					dataIndex : 'registerDate'
				}, {
					header : '登记人',
					dataIndex : 'fullname'
				}, {
					header : '登记标识',
					dataIndex : 'regFlag',
					renderer:function(val){
						if(val==1){
							return '<font color="green">√</font>';
						}else if (val==2){
							return '<font color="red">迟到</font>';
						}else if (val==3){
							return '<font color="red">早退</font>';
						}
					}
				},{
					header : '周几',
					dataIndex : 'dayOfWeek',
					renderer:function(val){
						return weekdays[val-1];
					}
				}, {
					header : '上下班标识',
					dataIndex : 'inOffFlag',
					renderer:function(val){
						if(val==1){
							return "上班";
						}else{
							return "下班";
						}
					}
				}, {
					header:'迟到或早退分钟',
					dataIndex:'regMins'
				},{
					header:'迟到或早退原因',
					dataIndex:'reason'
				},{
					header : '管理',
					dataIndex : 'registerId',
					width : 50,
					sortable : false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.registerId;
						var str='';
						if(isGranted('_DutyRegisterDel')){
						str= '<button title="删除" value=" " class="btn-del" onclick="DutyRegisterView.remove('
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
				id : 'DutyRegisterGrid',
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
//	
//	grid.addListener('rowdblclick', function(grid, rowindex, e) {
//				grid.getSelectionModel().each(function(rec) {
//							DutyRegisterView.edit(rec.data.registerId);
//						});
//			});
	return grid;

};

/**
 * 初始化数据
 */
DutyRegisterView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/personal/listDutyRegister.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'registerId',
										type : 'int'
									}, 'registerDate', 'fullname', 'regFlag',
									'regMins', 'reason', 'dayOfWeek',
									'inOffFlag']
						}),
				remoteSort : true
			});
	store.setDefaultSort('registerDate', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
DutyRegisterView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'DutyRegisterFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if(isGranted('_DutyRegisterAdd')){
	   toolbar.add(new Ext.Button({
	        iconCls : 'btn-add',
			text : '补签',
			handler : function() {
				new DutyRegisterForm();
			}
	   }));
	}
	if(isGranted('_DutyRegisterDel')){
	   toolbar.add(new Ext.Button({
	        iconCls : 'btn-del',
			text : '删除考勤',
			handler : function() {
				var grid = Ext.getCmp("DutyRegisterGrid");
				var selectRecords = grid.getSelectionModel().getSelections();
				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				Ext.MessageBox.confirm('操作信息','你确定要删除该记录吗？',function(op){
					if(op=='yes'){
						var ids = Array();
						for (var i = 0; i < selectRecords.length; i++) {
							ids.push(selectRecords[i].data.registerId);
						}
						DutyRegisterView.remove(ids);
					}
				});
			}
	   }));
	}
	return toolbar;
};

/**
 * 删除单个记录
 */
DutyRegisterView.remove = function(id) {
	var grid = Ext.getCmp("DutyRegisterGrid");
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/personal/multiDelDutyRegister.do',
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
