var DepartmentForm=function(nodeId){
	var formPanel=this.initUI(nodeId);	
	var window = new Ext.Window({
        title: '部门信息',
        iconCls:'menu-department',
        width: 400,
        height:250,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: formPanel,
        buttons: [{
            text: '保存',
            iconCls:'btn-save',
            handler:function(){
        	   var tree1 = Ext.getCmp('treePanel');
        	   if(formPanel.getForm().isValid()){
            		formPanel.getForm().submit({
            			waitMsg:'正在提交部门信息',
			            success: function(formPanel, o){
            				Ext.ux.Toast.msg('操作信息','添加部门成功！')
            				window.close();            				
            				tree1.root.reload();
            			}
            		});
            	}
            }
            
        },{
            text: '取消',
            handler:function(){
        	window.close();
        }
        }]
    });
    window.show();
};

DepartmentForm.prototype.initUI=function(nodeId){
var formPanel = new Ext.form.FormPanel({

	        id:'departmentForm',
	        baseCls: 'x-plain',
	        layout:'absolute',
	        defaultType: 'textfield',
	        url:__ctxPath+'/system/addDepartment.do',      
	        defaultType: 'textfield',
	        reader: new Ext.data.JsonReader(
		        	{
		        	root:'data'
		        	},
		        	[
		        		 {name:'depId',mapping:'depId'}
		        		,{name:'depName',mapping:'depName'}
		        		,{name:'depDesc',mapping:'depDesc'}
		        		,{name:'parentId',mapping:'parentId'}
		        	]
		        	),
	        
	        defaults: {
	            anchor: '95%,95%',
	            allowBlank: false,
	            selectOnFocus: true,
	            msgTarget: 'side'
	        },
	        items:[{
		        	xtype:'hidden'
		        	,name:'department.depId'
		        	,id:'depId'
		        },{
	            	xtype:'hidden',
	            	name:'department.parentId',
	            	id:'parentId',
	            	value:nodeId
	            },
	            {
	            	xtype:'hidden',
	            	name:'department.path',
	            	id:'path'
	            },
	            {
	            	x:0,
	            	y:5,
	            	xtype:'label',
	            	text:'部门名'
	            },
	            {
	            	x:0,
	            	y:25,
	            	name:'department.depName',
	            	blankText: '部门名为必填!',
	            	id:'depName'
	            }
	            ,
	            {
	            	x:0,
	            	y:55,
	            	allowBlank: true,
	            	xtype:'label',
	            	text:'部门描述'
	            },
	            {
	            	x:0,
	            	y:75,
	            	xtype:'textarea',
	            	name:'department.depDesc',
	            	blankText: '部门描述为必填!',
	            	id:'depDesc'
	            }
	            ]
	    });
	    return formPanel;
};

					
