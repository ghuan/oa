/**
 * @author csx
 * @createtime 2010年1月10日
 * @class ArchiveTypeTempView
 * @extends Ext.Panel
 * @description 公文分类及模板管理
 * @company 宏天软件
 */
ArchiveTypeTempView = Ext.extend(Ext.Panel, {
	/**
	 * 当前选择的分类ID
	 * @type 
	 */
	curTypeId:null,
	/**
	 * 构造函数
	 * @param {} _cfg
	 */
	constructor:function(_cfg){
		Ext.applyIf(this, _cfg);
		
		this.initUIComponents();
		
		//拷贝父类
		ArchiveTypeTempView.superclass.constructor.call(this,{
			title:'公文分类及模板管理',
			layout:'border',
			scope:this,
			items:[
				this.leftTypePanel,
				this.archTemplateView
			]
		});//end of the ArchiveTypeTempView.superclass.constructor.call
	},// end of the constructor
	
	initUIComponents:function(){
		this.archTemplateView=new ArchTemplateView({allowEdit:true});
		var archTemplateView=this.archTemplateView;
		
		this.leftTypePanel=new htsoft.ux.TreePanelEditor({
			region : 'west',
			title:'公文分类',
			collapsible : true,
			split : true,
			width:200,
			url:__ctxPath+'/archive/treeArchivesType.do',
			scope:this,
			onclick:function(node){
				var typeId=node.id;
				if(node.id==0){
					archTemplateView.setTitle('所有模板');
					typeId=null;
				}else{
					archTemplateView.setTitle('['+node.text+']模板列表');
				}
				archTemplateView.setTypeId(node.id);
		    	var store=archTemplateView.gridPanel.getStore();
		    	
		    	store.url=__ctxPath+'/archive/listArchTemplate.do';
		    	store.baseParams={'Q_archivesType.typeId_L_EQ':typeId};
		    	store.params={start:0,limit:25};
		    	store.reload({params:{start:0,limit:25}});
			},
			contextMenuItems : [{
						text : '新建分类',
						scope : this,
						iconCls : 'btn-add',
						handler : function() {
							new ArchivesTypeForm().show();
						}
					}, {
						text : '修改分类',
						scope : this,
						iconCls : 'btn-edit',
						handler : function() {
							new ArchivesTypeForm({typeId :this.leftTypePanel.selectedNode.id}).show();
						}
					}, {
						text : '删除分类',
						scope : this,
						iconCls : 'btn-delete',
						handler : function() {
							var leftTypePanel=this.leftTypePanel;
							var typeId = leftTypePanel.selectedNode.id;
							
							Ext.Ajax.request({
										url : __ctxPath + '/archive/multiDelArchivesType.do',
										params : {
											ids : typeId
										},
										method : 'POST',
										success : function(response, options) {
											Ext.ux.Toast.msg('操作信息','成功删除该公文分类！');
											leftTypePanel.root.reload();
										},
										failure : function(response, options) {
											Ext.ux.Toast.msg('操作信息','操作出错，请联系管理员！');
										}
									});
						}
					}]
				//end of context menu
			}		
		);
	}
			
});
