Ext.ns('AppUserView');
/**
 * 员工列表
 * 
 * @return {}
 */
var AppUserView = function() {
	return this.getView();
};
/**
 * AppUserView.getView()
 * @return {}
 */
AppUserView.prototype.getView = function() {
	return new Ext.Panel({
		id : 'AppUserView',
		// region:'center',
		title : '员工信息',
		iconCls:'menu-appuser',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'AppUserSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '用户账号'
					}, {
						width : 80,
						xtype : 'textfield',
						name : 'Q_username_S_LK'
					}, {
						text : '用户姓名'
					}, {
						width : 80,
						xtype : 'textfield',
						name : 'Q_fullname_S_LK'
					},
					{
						text : '入职时间:从'
					}, {
						width : 90,
						xtype : 'datefield',
						format: 'Y-m-d',
						name : 'Q_accessionTime_D_GT'
					}, {
						text : '至'
					},{
						width : 90,
						xtype : 'datefield',
						format: 'Y-m-d',
						name : 'Q_accessionTime_D_LT'
					},
					{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var appUserSearchForm = Ext.getCmp('AppUserSearchForm');
							var grid = Ext.getCmp('AppUserGrid');
							if (appUserSearchForm.getForm().isValid()) {
								appUserSearchForm.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/system/listAppUser.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}
//					,{
//						xtype : 'button',
//						text : '高级搜索',
//						iconCls : '',
//						handler : function(){
//							Ext.ux.Toast.msg('','待实现');
//						}
//					}
					]
		}), this.setup()]
	});
	return
};
/**
 * 这个方法是AppUserGrid
 * @return {}
 */
AppUserView.prototype.setup = function() {
	var store = this.initData();
	var toolbar = this.initToolbar();
	// var topbar=this.initTopToolbar();
	store.load({
				params : {
					start : 0,
					limit : 25
				}
	});
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : "userId",
					dataIndex : 'userId',
					hidden : true
				},{
					header : "状态",
					dataIndex : 'status',
					width : 30,
					renderer : function(value) {
						var str = '';
						if(value == '1'){//激活用户
							str += '<img title="激活" src="'+ __ctxPath +'/images/flag/customer/effective.png"/>'
						}else{//禁用用户
							str += '<img title="禁用" src="'+ __ctxPath +'/images/flag/customer/invalid.png"/>'
						}
						return str;
					}
				}, {
					header : "账号",
					dataIndex : 'username',
					width : 60
				}, {
					header:'地址',
					dataIndex:'address',
					hidden:true,
					exprint:true
				},{
					header : "用户名",
					dataIndex : 'fullname',
					width : 60
				}, {
					header : "邮箱",
					dataIndex : 'email',
					width : 120
				}, {// 先不显示
					header : "所属部门",
					dataIndex : 'department',
					renderer : function(value) {
						if(value==null){
						  return '';
						}else{
						  return value.depName;
						}
					},
					width : 60
				},
				{
					header : "所在职位",
					dataIndex : 'position',
					width : 60
				}, {
					header : "入职时间",
					dataIndex : 'accessionTime',
					width : 100
				},  {
					header : '管理',
					dataIndex : 'userId',
					sortable:false,
					width : 60,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.userId;
						var editName = record.data.username;
						var str='';
						if(editId!=1){
							if (isGranted('_AppUserDel')) {
								str += '<button title="删除" value=" " class="btn-del" onclick="AppUserView.remove('
										+ editId + ')"></button>';
							}
							if(isGranted('_AppUserEdit')){
								str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppUserView.edit('
										+ editId + ',\'' + editName + '\')"></button>';
							}
						}
						return str;
					}
				}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 100
		},
		listeners : {
			hiddenchange : function(cm, colIndex, hidden) {
				saveConfig(colIndex, hidden);
			}
		}
	});

	var grid = new Ext.grid.GridPanel({
				id : 'AppUserGrid',
				// title:'员工基本信息',
				tbar : toolbar,
				store : store,
				autoHeight:true,
				shim : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				sm : sm,
				// customize view config
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},

				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});
			
	AppUtil.addPrintExport(grid);		


	// 为Grid增加双击事件,双击行可编辑
	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			   var userId=rec.data.userId;
			        if(isGranted('_AppUserEdit')&&userId!=1){
					AppUserView.edit(userId, rec.data.username);
			        }
				});
	}

	return grid;
};

AppUserView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listAppUser.do'
						}),
				// create reader that reads the Topic records
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'userId',
										type : 'int'
									}, 'username', 'password', 'fullname','address',
									'email', 'department', 'title',// 性别
									'position', {
										name : 'accessionTime'
									}, {
										name : 'status',
										type : 'int'
									}]
						}),
				remoteSort : true
			});
	store.setDefaultSort('id', 'desc');
	return store;
};
// 初始化操作菜单
AppUserView.prototype.initToolbar = function() {
	var toolbar = new Ext.Toolbar({
				width : '100%',
				height : 30,
				items : []
			});
	if(isGranted('_AppUserAdd')){
	   toolbar.add(new Ext.Button({
	                text : '添加员工',
					iconCls : 'add-user',
					handler : function() {
						var tabs = Ext.getCmp('centerTabPanel');
						var addUser = Ext.getCmp('AppUserForm');
						if (addUser == null) {
							addUser = new AppUserForm('增加员工');
							tabs.add(addUser);
						} else {
							tabs.remove(addUser)
							addUser = new AppUserForm('增加员工');
							tabs.add(addUser);
						}
						tabs.activate(addUser);
					}
	   }));
	}
	if (isGranted('_AppUserDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除员工',
					handler : function() {
						var grid = Ext.getCmp("AppUserGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						var idsN='';
						for (var i = 0; i < selectRecords.length; i++) {
							if(selectRecords[i].data.userId!=1){
							  ids.push(selectRecords[i].data.userId);
							}else{
							  idsN+=selectRecords[i].data.fullname+',';
							}
						}
                       if(idsN==''){
						 AppUserView.remove(ids);
                       }else{
                         Ext.ux.Toast.msg("信息", idsN+"不能被删除！");
                       }
					}
				}));
	}		
	return toolbar;
};


/**
 * 用户删除
 * 
 * @param {}
 *            userId
 */
AppUserView.remove = function(_ids) {
	Ext.Msg.confirm('删除操作', '你确定要删除该用户吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelAppUser.do',
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.msg == ''){
										Ext.ux.Toast.msg("操作信息", "用户删除成功");
									}else{
										Ext.ux.Toast.msg("操作信息", result.msg);
									}
									Ext.getCmp('AppUserGrid').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "用户删除失败");
								}
							});
				}
			});

}
/**
 * 用户编辑
 * 
 * @param {}
 *            userId
 */
AppUserView.edit = function(userId, username) {
	// 只允许有一个编辑窗口
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = Ext.getCmp('AppUserForm');
	if (edit == null) {
		edit = new AppUserForm(username + '-详细信息', userId);
		tabs.add(edit);
	} else {
		tabs.remove('AppUserForm');
		edit = new AppUserForm(username + '-详细信息', userId);
		tabs.add(edit);
	}
	tabs.activate(edit);
	// 不可显示密码,不能修改账号
	var appUserMustInfo = Ext.getCmp('AppUserMustInfo');
	appUserMustInfo.remove('appUser.password');
	Ext.getCmp('appUser.username').getEl().dom.readOnly = true;
	appUserMustInfo.doLayout(true);
	// 显示修改密码按钮
	var appUserFormToolbar = Ext.getCmp('AppUserFormToolbar');
	Ext.getCmp('resetPassword').show();
	appUserFormToolbar.doLayout(true);
	// 往编辑窗口中填充新闻数据
	edit.form.load({
				url : __ctxPath + '/system/getAppUser.do',
				params : {
					userId : userId
				},
				method : 'post',
				waitMsg : '正在载入数据...',
				success : function(edit, o) {
					// 载入照片
					var photo = Ext.getCmp('appUser.photo');
					var display = Ext.getCmp('displayUserPhoto');
					var appUserTitle = Ext.getCmp('appUserTitle');
					if (photo.value != '' && photo.value !=null && photo.value !='undefined') {
						display.body.update('<img src="' + __ctxPath
								+ '/attachFiles/' + photo.value + '" width="100%" height="100%"/>');
					}else if(appUserTitle.value == '0'){
						display.body.update('<img src="' + __ctxPath
								+ '/images/default_image_female.jpg" />');
					}
					var user = Ext.util.JSON.decode(o.response.responseText).data[0];

					var accessionTime = getDateFromFormat(user.accessionTime,'yyyy-MM-dd HH:mm:ss');
					Ext.getCmp('appUser.accessionTime').setValue(new Date(accessionTime));
					// 载入部门信息
					Ext.getCmp('appUser.depId').setValue(user.department.depId);
					Ext.getCmp('depTreeSelector').setValue(user.department.depName);
				},
				failure : function() {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
			});
}
