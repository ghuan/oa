Ext.ns('DocumentSharedView');

var DocumentSharedView=function(){
    return new Ext.Panel({
		id:'DocumentSharedView',
		title:'共享文档列表',
		iconCls:'menu-folder-shared',
		autoScroll:true,
		items : [
		   new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'SharedDocumentForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [
				{
						text : '文档名称'
					}, {
						xtype : 'textfield',
						name : 'document.docName'
					},
					{
						text : '共享人'
					}, {
						xtype : 'textfield',
						name : 'document.fullname'
					},
					{
						text : '创建时间 从'
					}, {
						xtype : 'datefield',
						format:'Y-m-d',
						name : 'from'
					},{
						text : '至'
					},{
						xtype : 'datefield',
						format:'Y-m-d',
						name : 'to'
					},{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('SharedDocumentForm');
							var grid = Ext.getCmp('DocumentSharedGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/document/shareListDocument.do',
								    method:'post',
								    params:{start:0,limit:25},
//									params:{folderId:DocumentView.folderId},
									success : function(searchPanel, action) {
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
						iconCls:'reset',
						handler:function(){
							var searchPanel = Ext.getCmp('SharedDocumentForm');
							searchPanel.getForm().reset();
						}
					}]
		}),
		this.setup()]
	});
};
/**
 * 建立视图
 */
DocumentSharedView.prototype.setup = function() {
	return this.grid();
};

/**
 * 建立DataGrid
 */
DocumentSharedView.prototype.grid = function() {
var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : 'docId',
					dataIndex : 'docId',
					hidden : true
				}, {
					header : '文档名称',
					dataIndex : 'docName',
					width:120
				}, {
					header : '创建时间',
					dataIndex : 'createtime'
				}
				,{
				    header:'共享人',
				    detaIndex:'fullname'
				}
				,{
					header : '附件',
					dataIndex : 'haveAttach',
					renderer:function(value,metadata,record){
						
						if(value=='' || value=='0'){
							return '无附件';
						}else{
							var attachFiles=record.data.attachFiles;
							var str='';
							for(var i=0;i<attachFiles.length;i++){
								str+='<a href="#" onclick="FileAttachDetail.show('+attachFiles[i].fileId+');" class="attachment">'+attachFiles[i].fileName+'</a>';
								str+='&nbsp;';
							}
							
							return str;
						}
					}
				}, {
					header : '查看',
					dataIndex : 'docId',
					width : 50,
					renderer : function(value, metadata, record, rowIndex,
							colIndex) {
						var editId = record.data.docId;
						var editName=record.data.docName;
						
						var str = '<button title="查看" value=" " class="btn-readdocument" onclick="DocumentSharedView.read('
								+ editId + ',\''+editName+'\')">&nbsp;</button>';
						return str;
					}
				}],
		defaults : {
//			sortable : true,
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
				id : 'DocumentSharedGrid',
				store : store,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight:true,
				maxHeight:600,
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
							DocumentSharedView.read(rec.data.docId,rec.data.docName);
						});
			});
	return grid;


};

/**
 * 初始化数据
 */
DocumentSharedView.prototype.store = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/document/shareListDocument.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'docId',
										type : 'int'
									},'docName', 'content', 'createtime','haveAttach','attachFiles'
									,'fullname']
						}),
				remoteSort : true
			});
//	store.setDefaultSort('docId', 'desc');
	return store;
};

DocumentSharedView.read=function(id,name){
     var tabs = Ext.getCmp('centerTabPanel');
     var panel=Ext.getCmp('DocumentShared');
     if(panel==null){
           panel=new DocumentSharedPanel(id,name);
           tabs.add(panel);
           tabs.activate(panel);	
      }else{
           tabs.remove('DocumentShared');
           panel=new DocumentSharedPanel(id,name);
           tabs.add(panel);
           tabs.activate(panel);	
      }
}
