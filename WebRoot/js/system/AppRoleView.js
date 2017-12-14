Ext.ns('AppRoleView');
/**
 * 用户角色列表
 */
var AppRoleView = function() {
	return new Ext.Panel({
		id:'AppRoleView',
		title:'角色列表',
		iconCls:'menu-role',
		autoScroll:true,
		items:[
			new Ext.FormPanel({
				height:35,
				frame:true,
				id:'AppRoleSearchForm',
				layout:'column',
				defaults:{xtype:'label'},
				items:[
						{
							text : '角色名称'
						}, {
							xtype : 'textfield',
							name : 'Q_roleName_S_LK'
						}, {
							text : '角色描述'
						}, {
							xtype : 'textfield',
							name : 'Q_roleDesc_S_LK'
						},{
							xtype:'button',
							text:'查询',
							iconCls:'search',
							handler:function(){
								var searchPanel=Ext.getCmp('AppRoleSearchForm');
								var grid=Ext.getCmp('AppRoleGrid');
								if(searchPanel.getForm().isValid()){
					    			searchPanel.getForm().submit({
					    				waitMsg:'正在提交查询',
					    				url:__ctxPath+'/system/listAppRole.do',
					    				success:function(formPanel,action){
								            var result=Ext.util.JSON.decode(action.response.responseText);
								            grid.getStore().loadData(result);
					    				}
					    			});
					    		}
								
							}
						}
				]
			}),
			this.setup()
		]
	});
};
/**
 * 建立视图
 */
AppRoleView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
AppRoleView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'roleId',
					dataIndex : 'roleId',
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
				},  {
					header : "角色名称",
					dataIndex : 'roleName',
					width : 200
				}, {
					header : "角色描述",
					dataIndex : 'roleDesc',
					width : 400
				},{
					header : '管理',
					dataIndex : 'roleId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,colIndex) {
						var editId = record.data.roleId;
						var roleName=record.data.roleName;
						var isDefaultIn=record.data.isDefaultIn;
						var str='';
						if(editId!=-1){
							if(isDefaultIn=='0'){
								
									if(isGranted('_AppRoleDel'))
									str = '<button title="删除" value=" " class="btn-del" onclick="AppRoleView.remove('+ editId + ')"></button>';
									if(isGranted('_AppRoleEdit'))
									str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppRoleView.edit('+ editId + ')"></button>';
									if(isGranted('_AppRoleGrant'))
									str += '&nbsp;<button title="授权" value=" " class="btn-grant" onclick="AppRoleView.grant('+ editId + ',\'' + roleName + '\')">&nbsp;</button>';
								
							}else{
								str = '<button title="复制" value=" " class="btn-copyrole" onclick="AppRoleView.copy('+ editId + ')"></button>';
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
				id : 'AppRoleGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight:true,
				//fbar : this.footbar(),
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
			
			grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
				   if(rec.data.isDefaultIn=='0'&&rec.data.roleId!=-1){
					AppRoleView.edit(rec.data.roleId);
				   }
			});
	});  
	return grid;

};

/**
 * 初始化数据
 */
AppRoleView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listAppRole.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'roleId',
										type : 'int'
									}, 'roleName', 'roleDesc', {
										name : 'status',
										type : 'int'
									},'isDefaultIn']
						}),
				remoteSort : true
			});
	store.setDefaultSort('roleId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
AppRoleView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'AppRoleFootBar',
				height : 30,
				bodyStyle:'text-align:left',
				items : []
			});
	if(isGranted('_AppRoleAdd')){	
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加角色',
					handler : function() {
						new AppRoleForm();
					}
				}));
	}
	if (isGranted('_AppRoleDel')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除角色',
					handler : function() {
						var grid = Ext.getCmp("AppRoleGrid");
						var selectRecords = grid.getSelectionModel().getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						var idsN='';
						for (var i = 0; i < selectRecords.length; i++) {
							if(selectRecords[i].data.isDefaultIn=='0'&&selectRecords[i].data.roleId!=-1){
								ids.push(selectRecords[i].data.roleId);
							}else{
								idsN+=selectRecords[i].data.roleName+',';
							}
						}
						if(idsN==''){
						  AppRoleView.remove(ids);
						}else{
							Ext.ux.Toast.msg("信息", idsN+"不能被删除！");
						}
					}
				}));
	}
			
	return toolbar;
};

/**
 * 删除单个记录
 */
AppRoleView.remove=function(id){
	var grid=Ext.getCmp("AppRoleGrid");
	Ext.Msg.confirm('信息确认','您确认要删除该记录吗？',function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url:__ctxPath+'/system/multiDelAppRole.do',
					params:{
						ids:id
					},
					method:'post',
					success:function(){
						Ext.ux.Toast.msg("信息","成功删除所选记录！");
						grid.getStore().reload({params:{
							start : 0,
							limit : 25
						}});
					}
				});
		 }
	});
};

/**
 * 
 */
AppRoleView.edit=function(id){
	new AppRoleForm(id,0);//0代表不是复制
};

AppRoleView.grant=function(id,roleName){
	new RoleGrantRightView(id,roleName);
};

AppRoleView.copy=function(id){
	new AppRoleForm(id,1);//1代表是复制
}

