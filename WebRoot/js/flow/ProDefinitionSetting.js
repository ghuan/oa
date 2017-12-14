Ext.ns("ProDefinitionSetting");
/**
 * 流程定义人员设置
 */
 var ProDefinitionSetting=function(defId,name){
 	this.defId=defId;
 	this.name=name;
 	var leftPanel=new Ext.Panel({
 		title:'流程示意图',
 		width:500,
 		height:800,
 		split:true,
 		region:'west',
 		margin:'5 5 5 5',
 		html:'<img src="'+__ctxPath+ '/jbpmImage?defId='+this.defId+ '"/>'
 	});
 	
 	var rightPanel=this.getRightPanel(defId);
 	
 	var topPanel=new Ext.Panel({
 		id:'ProDefinitionSetting'+this.defId,
 		title:'流程参与人员设置－'+this.name,
 		layout:'border',
 		iconCls:'btn-setting',
 		items:[
 			leftPanel,rightPanel
 		]
 	});
 	
 	return topPanel;
 };
 
 ProDefinitionSetting.prototype.getRightPanel=function(defId){
 	var toolbar = new Ext.Toolbar({
		width : '100%',
		items : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var params = [];
				for (i = 0, cnt = store.getCount(); i < cnt; i += 1) {
					var record = store.getAt(i);
					if(record.data.assignId=='' || record.data.assignId==null){//设置未保存的assignId标记，方便服务端进行gson转化
						record.set('assignId',-1);
					}
					if (record.dirty) // 得到所有修改过的数据
						params.push(record.data);
				}
				if (params.length == 0) {
					Ext.ux.Toast.msg('信息', '没有对数据进行任何更改');
					return;
				}
				Ext.Ajax.request({
					method : 'post',
					url : __ctxPath
							+ '/flow/saveProUserAssign.do',
					success : function(request) {
						Ext.ux.Toast.msg('操作信息', '成功设置流程表单');
						store.reload();
						grid.getView().refresh();
					},
					failure : function(request) {
						Ext.MessageBox.show({
							title : '操作信息',
							msg : '信息保存出错，请联系管理员！',
							buttons : Ext.MessageBox.OK,
							icon : 'ext-mb-error'
						});
					},
					params : {
						data : Ext.encode(params)
					}
				});
			}
		}]
	});
	
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/flow/listProUserAssign.do?defId='+this.defId
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							id : 'id',
							fields : ['assignId', 'deployId', 'activityName',
									'userId','username', 'roleId','roleName']
						})
			}); 
     
     store.load();
	
    var row = 0;
	var col = 0;
	//用户的行选择器
	var userEditor = new Ext.form.TriggerField({
				triggerClass : 'x-form-browse-trigger',
				onTriggerClick : function(e) {
					UserSelector.getView(function(ids, names) {
								var store = grid.getStore();
								var record = store.getAt(row);
								record.set('userId', ids);
								record.set('username', names);
							},false,true).show();
				}
	});
	
	var roleEditor=new Ext.form.TriggerField({
				triggerClass : 'x-form-browse-trigger',
				onTriggerClick : function(e) {
					RoleSelector.getView(function(ids, names) {
								var store = grid.getStore();
								var record = store.getAt(row);
								record.set('roleId', ids);
								record.set('roleName', names);
							}).show();
				}
			});
	var grid = new Ext.grid.EditorGridPanel({
				title:'人员设置',
				width : 400,
				id:'ProDefinitionSettingGrid'+this.defId,
				height : 800,
				store : store,
				region:'center',
				tbar : toolbar,
				columns : [new Ext.grid.RowNumberer(),{
							header : "assignId",
							dataIndex : 'assignId',
							hidden : true
						}, {
							header : "deployId",
							dataIndex : 'deployId',
							hidden : true
						}, {
							header : "流程任务",
							dataIndex : 'activityName',
							width : 100,
							sortable : true
						}, {
							dataIndex:'userId',
							header:'userId',
							hidden : true
						},{
							header : "用户",
							dataIndex : 'username',
							width : 150,
							sortable : true,
							editor:userEditor
						}, {
							dataIndex : 'roleId',
							hidden:true
						}, {
							header : '角色',
							dataIndex:'roleName',
							width:150,
							editor:roleEditor
						}]
			});
			
			var showUserDlg=function(grid){
				
			}
			//Grid this, Number rowIndex, Number columnIndex, Ext.EventObject e
			grid.on('cellclick', function(grid,rowIndex,columnIndex,e) {
				row=rowIndex;
				col=columnIndex;
			});

		 	/*# grid - This grid
			# record - The record being edited
			# field - The field name being edited
			# value - The value being set
			# originalValue - The original value for the field, before the edit.
			# row - The grid row index
			# column - The grid column index
			# cancel - Set this to true to cancel the edit or return false from your handler*/

			grid.on('validateedit', function(e) {
				
				return false;
			});
	return grid;
 };
 
 /**
  * 角色选择
  * @param {} rowIndex
  * @param {} colIndex
  * @param {} defId
  */
 ProDefinitionSetting.roleSelect=function(rowIndex,colIndex,defId){
 	
 	var grid=Ext.getCmp("ProDefinitionSettingGrid"+defId);
 	var record=grid.getStore().getAt(rowIndex);
 	
 	grid.getStore().reload();
 	grid.doLayout();
 };
 
