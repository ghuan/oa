Ext.ns("htsoft.ux");
/**
 * @company 宏天软件有限公司
 * @createtime 2010-01-02
 * @author csx
 * @class TreePanelEditor
 * @extends Ext.tree.TreePanel
 * @description 树菜单编辑器,可带右键操作菜单，使用方式示例见ArchiveTypeTempView.js
 */
htsoft.ux.TreePanelEditor=Ext.extend(Ext.tree.TreePanel,{
	/**
	 * 是否显示上下文菜单
	 * @type Boolean
	 */
	showContextMenu:true,
	/**
	 * URL
	 * @type 
	 */
	url:null,
	/**
	 * 右键菜单
	 * @type 
	 */
	contextMenu:null,
	/**
	 * 右键菜单项
	 * @type 
	 */
	contextMenuItems:null,
	/**
	 * 选择树节点
	 * @type 
	 */
	selectedNode:null,
	/**
	 * 构造函数
	 */
	constructor:function(_cfg){
		if(_cfg==null){
			_cfg={};
		}
		Ext.apply(this,_cfg);
		//从父类中拷贝构造
		htsoft.ux.TreePanelEditor.superclass.constructor.call(this,{
			tbar:new Ext.Toolbar({items:[
								{
									xtype : 'button',
									iconCls : 'btn-refresh',
									text : '刷新',
									scope:this,
									handler : function() {
										this.root.reload();
									}
								},{
									xtype : 'button',
									text : '展开',
									iconCls : 'btn-expand',
									scope:this,
									handler : function() {
										this.expandAll();
									}
								}, {
									xtype : 'button',
									text : '收起',
									iconCls : 'btn-collapse',
									scope:this,
									handler : function() {
										this.collapseAll();
									}
								}
			]}),
			loader : new Ext.tree.TreeLoader({
					url:this.url
			}),
			root : new Ext.tree.AsyncTreeNode({
				    expanded : true
			}),
			listeners : {
					'click' : function(node){
						_cfg.onclick.call(this,node);
					}
			},
			rootVisible : false
		});
		
		//初始化右键的菜单
		this.initContextMenu();
		
	},//end of constructor
	
//	initComponent: function(){
//		htsoft.ux.TreePanelEditor.superclass.initComponent.call(this);		
//	},

	/**
	 * 右键菜单
	 */
	initContextMenu:function(){
		if(this.showContextMenu){
			this.contextMenu= new Ext.menu.Menu({});
			if(this.contextMenuItems!=null){
				this.contextMenu.add(this.contextMenuItems);
			}
			//树的右键菜单的
			this.on('contextmenu', this.contextHandler, this);
		}
	},
	contextHandler:function contextmenu(node, e) {
		this.selectedNode = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
		});
		this.contextMenu.showAt(e.getXY());
	}
	
});
Ext.reg("treePanelEditor",htsoft.ux.TreePanelEditor);