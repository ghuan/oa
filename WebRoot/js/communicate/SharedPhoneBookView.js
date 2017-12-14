Ext.ns('SharedPhoneBookView');

var SharedPhoneBookView=function(){
    return new Ext.Panel({
		id:'SharedPhoneBookView',
		iconCls:"menu-phonebook-shared",
		title:'共享联系人列表',
		autoScroll:true,
		items:[
				new Ext.FormPanel({
				height:35,
				frame:true,
				id:'PhoneSearchForm',
				layout:'column',
				defaults:{xtype:'label'},
				items:[{text:'请输入查询条件:'}
				,{
					text : '姓名'
				}, {
					xtype : 'textfield',
					name : 'fullname'
				}
				,{
					text : '共享人'
				}, {
					xtype : 'textfield',
					name : 'sharedUser'
				},{
							xtype:'button',
							text:'查询',
							iconCls:'search',
							handler:function(){
								var searchPanel=Ext.getCmp('PhoneSearchForm');
								var grid=Ext.getCmp('PhoneBookGrid');
								if(searchPanel.getForm().isValid()){
					    			searchPanel.getForm().submit({
					    				waitMsg:'正在提交查询',
					    				url:__ctxPath+'/communicate/sharePhoneBook.do',
					    				success:function(formPanel,action){
								            var result=Ext.util.JSON.decode(action.response.responseText);
								            grid.getStore().loadData(result);
					    				}
					    			});
					    		}
								
							}
						}]
			})
		,
			this.setup()
			]
	});
};
/**
 * 建立视图
 */
SharedPhoneBookView.prototype.setup = function() {
	return this.grid();
};
/**
 * 建立DataGrid
 */
SharedPhoneBookView.prototype.grid = function() {
	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), {
					header : 'phoneId',
					dataIndex : 'phoneId',
					hidden : true
				},{
					header : '名字',	
					dataIndex : 'fullname'
				},{
					header : '职位',	
					dataIndex : 'duty'
				},{
					header : '电话',	
					dataIndex : 'mobile'
				},{
					header : '共享人',	
					dataIndex : 'sharefullname'
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
				id : 'PhoneBookGrid',
				store : store,				
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				autoHeight:true,
				cm : cm,
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
					var sharedPhoneBookWin=Ext.getCmp('SharedPhoneBookWin');
					if(sharedPhoneBookWin==null){
					  SharedPhoneBookView.read(rec.data.phoneId);
					}
				});
	});  
	return grid;

};

/**
 * 初始化数据
 */
SharedPhoneBookView.prototype.store = function() {
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : __ctxPath + '/communicate/sharePhoneBook.do'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'result',
			totalProperty : 'totalCounts',
			id : 'id',
			fields : [ {
				name : 'phoneId',
				type : 'int'
			}

			, 'fullname', 'title', 'birthday', 'nickName', 'duty', 'spouse',
			'childs', 'companyName', 'companyAddress', 'companyPhone',
			'companyFax', 'homeAddress', 'homeZip', 'mobile', 'phone',
			'email', 'qqNumber', 'msn', 'note', 
			{
			name:'sharefullname',
			mapping:'appUser.fullname'			
			}, 'groupId',
			'isShared' ]
		}),
		remoteSort : true
	});
	store.setDefaultSort('phoneId', 'desc');
	return store;
};

SharedPhoneBookView.read=function(id){ 
     new SharedPhoneBookWin(id);
}