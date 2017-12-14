Ext.ns('NewsTypeView');


var NewsTypeView = function() {
	return new Ext.Panel({
		id : 'NewsTypeView',
		title : '新闻类别',
		iconCls:'menu-news_type',
		autoScroll : true,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'NewTypeSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '查询条件:'
					}, {
						text : '类别名称'
					}, {
						xtype : 'textfield',
						name : 'Q_typeName_S_LK'
					}, {
						text : '类别顺序'
					}, {
						xtype : 'numberfield',
						name : 'Q_sn_SN_EQ'
					},{
			    		text:'查询',
			    		xtype:'button'
			    		,iconCls:'search'
			    		,handler:function(){
			    			var grid = Ext.getCmp('NewsTypeGrid');
			    			Ext.getCmp('NewTypeSearchForm').getForm().submit({
				    			waitMsg:'正在提交查询信息',
				    			url : __ctxPath+ '/info/listNewsType.do',
				    			success: function(formPanel,action){
				    				var result = Ext.util.JSON.decode(action.response.responseText);
									grid.getStore().loadData(result);
				    			}
			    			});
			    		}
			    	}
			    	,{
						text:'重置',
						xtype:'button'
						,iconCls : 'reset'
						,handler:function(){
							Ext.getCmp('NewTypeSearchForm').getForm().reset();
						}
					}]
		}), this.setup()]
	});
};

NewsTypeView.prototype.setup=function(){
	var store=this.initData();
	var topbar=this.initTopToolbar();
	store.load({params:{start:0, limit:25}});
	var sm=new Ext.grid.CheckboxSelectionModel();
    var cm = new Ext.grid.ColumnModel({
		 columns:[sm,new Ext.grid.RowNumberer(),{
	          header: "类别ID",
	          hidden:true,
	          dataIndex: 'typeId',
	          width: 40
	      },{
	          header: "类别名",
	          dataIndex: 'typeName',
	          width: 100
	      },{
	          header: "类别顺序",
	          dataIndex: 'sn',
	          width: 50
	      },{
	      	  header:'管理',
	          dataIndex:'typeId',
	      	  width:150,
	      	  renderer:function(value,metadata,record,rowIndex,colIndex){
	      		var editId=record.data.typeId;
	      		var str='';
	      		   if(isGranted('_NewsTypeDel')){
	      		    str='<button title="删除" value=" " class="btn-del" onclick="NewsTypeView.remove('+editId+')">&nbsp</button>';
	      		   }
	      		   if(isGranted('_NewsTypeEdit')){
	      		    str+='&nbsp;&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="NewsTypeView.edit('+editId+')">&nbsp</button>';
	      			str+='&nbsp;&nbsp;<button title="置顶" value=" " class="btn-up" onclick="NewsTypeView.sort('+editId+','+1+')">&nbsp</button>'
	      			str+='&nbsp;&nbsp;<button title="上移" value=" " class="btn-top" onclick="NewsTypeView.sort('+editId+','+2+')">&nbsp</button>'
	      			str+='&nbsp;&nbsp;<button title="下移" value=" " class="btn-down" onclick="NewsTypeView.sort('+editId+','+3+')">&nbsp</button>'
	      			str+='&nbsp;&nbsp;<button title="置末" value=" " class="btn-last" onclick="NewsTypeView.sort('+editId+','+4+')">&nbsp</button>'
	      		   }
	      		return str;
	      	  }
	      }
      	],
	    defaults: {
	        menuDisabled: true,
	        width: 100
	    },
	    listeners: {
	        hiddenchange: function(cm, colIndex, hidden) {
	            saveConfig(colIndex, hidden);
	        }
	    }
	});

	var grid = new Ext.grid.GridPanel({
	  id:'NewsTypeGrid',
      autoWidth:true,
      autoHeight:true,
      tbar:topbar,
      closable:true,
      store: store,
      trackMouseOver:true,
      disableSelection:false,
      loadMask: true,
      cm:cm,
      sm:sm,
      // customize view config
      viewConfig: {
          forceFit:true,
          enableRowBody:false,
          showPreview:false  
      },

      // paging bar on the bottom
      bbar: new Ext.PagingToolbar({
          pageSize: 25,
          store: store,
          displayInfo: true,
          displayMsg: '当前显示从{0}至{1}， 共{2}条记录',
          emptyMsg: "当前没有记录"
      })
  });
    //为Grid增加双击事件,双击行可编辑
 	grid.addListener('rowdblclick', rowdblclickFn);      
	function rowdblclickFn(grid, rowindex, e){      
	    grid.getSelectionModel().each(function(rec){   
	    	if(isGranted('_NewsTypeEdit')){
	    		NewsTypeView.edit(rec.data.typeId);
	    	}
	    });      
	} 

  return grid;
	
};

NewsTypeView.prototype.initData=function(){
	var store = new Ext.data.Store({  
        proxy: new Ext.data.HttpProxy({  
            url: __ctxPath+'/info/listNewsType.do'
        }),  
        // create reader that reads the Topic records  
        reader: new Ext.data.JsonReader({  
            root: 'result',  
            totalProperty: 'totalCounts',  
            id: 'typeId',  
            fields: [  
            {name:'typeId',type:'int'}, 'typeName', {name:'sn',type:'int'}
            ]  
        }), 
        remoteSort: true  
    });  
    return store;
};
//初始化操作菜单
NewsTypeView.prototype.initTopToolbar=function(){
	var toolbar=new Ext.Toolbar({
	    width: '100%',
	    height: 30,
	    items: []
	});
	if(isGranted('_NewsTypeAdd')){
	  toolbar.add(new Ext.Button({
	     text: '添加',
			    iconCls:'btn-add',
			    handler: function() {
			    		new NewsTypeForm();
			    }
	  }));
	}
	if(isGranted('_NewsTypeDel')){
	   toolbar.add(new Ext.Button({
	       text: '删除'
				,iconCls:'btn-del'
				,handler:function(){
					var newsTypeGrid = Ext.getCmp('NewsTypeGrid');
					
					var selectRecords =newsTypeGrid.getSelectionModel().getSelections();
					
					if (selectRecords.length == 0) {
									Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
									return;
								}
					Ext.Msg.confirm('删除操作','你确定要删除所选新闻?',function(btn){
					   if(btn=='yes'){
					   		Ext.ux.Toast.msg('信息','待实现!');
//					   		Ext.Ajax.request({
//					   			
//					   		});
					   }
					});
				}
	   }));
	}
	return toolbar;
};

/**
 * 类别删除
 * @param {} userId
 */
NewsTypeView.remove=function(typeId){
	Ext.Msg.confirm('删除操作','你确定要删除该类别吗?',function(btn){
		var newsTypeView = Ext.getCmp('NewsTypeView');
        var type = Ext.getCmp('typeTree');
		if(btn=='yes'){
			Ext.Ajax.request({
				url: __ctxPath+'/info/removeNewsType.do',
				method:'post',
				params:{typeId:typeId},
				success:function(){
					var typeTree = Ext.getCmp('typeTree');
					Ext.ux.Toast.msg("操作信息","类别删除成功");
					Ext.getCmp('NewsTypeGrid').getStore().reload();
					if(typeTree!=null){
						typeTree.root.reload();
					}
				},
				failure:function(){
					Ext.ux.Toast.msg("操作信息","类别删除失败");
					NewsTypeView.grid.getStore().reload();
				}
			});
		}
	});
	
}
/**
 * 类别编辑
 * @param {} userId
 */
NewsTypeView.edit=function(typeId){
		var newsTypeForm = Ext.getCmp('newsTypeForm');
		if(newsTypeForm==null){
			new NewsTypeForm();
			newsTypeForm = Ext.getCmp('newsTypeForm');
		}
		newsTypeForm.form.load({
			url:__ctxPath+'/info/detailNewsType.do',
			params:{typeId:typeId},
			method:'post',
			deferredRender :true,
			layoutOnTabChange :true,
			waitMsg : '正在载入数据...',
	        success : function() {
	        },
	        failure : function() {
	            Ext.ux.Toast.msg('编辑', '载入失败');
	        }
		});
}
/**
 * 类别排序
*/
NewsTypeView.sort = function(typeId,opt){
		Ext.Ajax.request({
			url: __ctxPath+'/info/sortNewsType.do',
			method:'post',
			params:{typeId:typeId,opt:opt},
			success:function(){
				var typeTree = Ext.getCmp('typeTree');
				Ext.getCmp('NewsTypeGrid').getStore().reload();
				if(typeTree!=null){
					typeTree.root.reload();
				}
			},
			failure:function(){
				Ext.ux.Toast.msg("操作信息","操作失败");
				Ext.getCmp('NewsTypeGrid').getStore().reload();
			}
		});
}
