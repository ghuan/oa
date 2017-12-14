Ext.ns('ArchivesTypeView');
/**
 * [ArchivesType]列表
 */
var ArchivesTypeView = function() {
	return new Ext.Panel({
		id:'ArchivesTypeView',
		title:'[ArchivesType]列表',
		autoScroll:true,
		items:[
				new Ext.FormPanel({
				height:35,
				frame:true,
				id:'ArchivesTypeSearchForm',
				layout:'column',
				defaults:{xtype:'label'},
				items:[{text:'请输入查询条件:'}
	,{
		text : '类型名称'
	}, {
		xtype : 'textfield',
		name : 'Q_typeName_S_LK'
	}
	,{
		text : '类型描述'
	}, {
		xtype : 'textfield',
		name : 'Q_typeDesc_S_LK'
	}
						,{
							xtype:'button',
							text:'查询',
							iconCls:'search',
							handler:function(){
								var searchPanel=Ext.getCmp('ArchivesTypeSearchForm');
								var grid=Ext.getCmp('ArchivesTypeGrid');
								if(searchPanel.getForm().isValid()){
					    			searchPanel.getForm().submit({
					    				waitMsg:'正在提交查询',
					    				url:__ctxPath+'/archive/listArchivesType.do',
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
ArchivesTypeView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
ArchivesTypeView.prototype.grid = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'typeId',
					dataIndex : 'typeId',
					hidden : true
				}
,{
header : '类型名称',	
dataIndex : 'typeName'
	}
,{
header : '类型描述',	
dataIndex : 'typeDesc'
	}
				,{
					header : '管理',
					dataIndex : 'typeId',
					width : 50,
					sortable:false,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.typeId;
						var str = '<button title="删除" value=" " class="btn-del" onclick="ArchivesTypeView.remove('
								+ editId + ')">&nbsp;&nbsp;</button>';
						str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ArchivesTypeView.edit('
								+ editId + ')">&nbsp;&nbsp;</button>';
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
				id : 'ArchivesTypeGrid',
				tbar : this.topbar(),
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight:true,
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
							displayMsg : '当前显示{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						})
			});
			
	grid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					ArchivesTypeView.edit(rec.data.typeId);
				});
	});  
	return grid;

};

/**
 * 初始化数据
 */
ArchivesTypeView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/archive/listArchivesType.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'typeId',
										type : 'int'
									}
									
,'typeName'
,'typeDesc'
									]
						}),
				remoteSort : true
			});
	store.setDefaultSort('typeId', 'desc');
	return store;
};

/**
 * 建立操作的Toolbar
 */
ArchivesTypeView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'ArchivesTypeFootBar',
				height : 30,
				bodyStyle:'text-align:left',
				items : [
						{
							iconCls : 'btn-add',
							text : '添加[ArchivesType]',
							xtype : 'button',
							handler : function() {
								new ArchivesTypeForm();
							}
						}, {
							iconCls : 'btn-del',
							text : '删除[ArchivesType]',
							xtype : 'button',
							handler : function() {
								
								var grid=Ext.getCmp("ArchivesTypeGrid");
								
								var selectRecords=grid.getSelectionModel().getSelections();
								
								if(selectRecords.length==0){
									Ext.Msg.alert("信息","请选择要删除的记录！");
									return;
								}
								var ids=Array();
								for(var i=0;i<selectRecords.length;i++){
									ids.push(selectRecords[i].data.typeId);
								}
								
								ArchivesTypeView.remove(ids);
							}
						}
				]
			});
	return toolbar;
};

/**
 * 删除单个记录
 */
ArchivesTypeView.remove=function(id){
	var grid=Ext.getCmp("ArchivesTypeGrid");
	Ext.Msg.confirm('信息确认','您确认要删除该记录吗？',function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url:__ctxPath+'/archive/multiDelArchivesType.do',
					params:{
						ids:id
					},
					method:'post',
					success:function(){
						Ext.Msg.alert("信息提示","成功删除所选记录！");
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
ArchivesTypeView.edit=function(id){
	new ArchivesTypeForm(id);
}

