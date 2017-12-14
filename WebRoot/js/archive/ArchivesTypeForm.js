/**
 * @author csx
 * @createtime 2010-10-11
 * @class ArchivesTypeForm
 * @extends Ext.Window
 * @description 分类表单
 * @company 宏天软件
 */
ArchivesTypeForm=Ext.extend(Ext.Window,{
	//内嵌FormPanel
	formPanel:null,
	//构造函数
	constructor:function(_cfg){
		if(_cfg==null){_cfg={};}
		Ext.apply(this,_cfg);
		//初始化组件
		this.initComponents();
		
		ArchivesTypeForm.superclass.constructor.call(this,{
			id:'ArchivesTypeFormWin',
			layout:'fit',
			items:this.formPanel,
			modal:true,
			height:200,
			width:400,
			title:'公文分类详细信息',
			buttonAlign : 'center',
			buttons:this.buttons
		});

	},//end of the constructor
	//初始化组件
	initComponents:function(){
		this.formPanel=new Ext.FormPanel({
				layout : 'form',
				bodyStyle: 'padding:10px 10px 10px 10px',
				border:false,
				url : __ctxPath + '/archive/saveArchivesType.do',
				id : 'ArchivesTypeForm',
				defaults : {
					anchor : '98%,98%'
				},
				formId : 'ArchivesTypeFormId',
				defaultType : 'textfield',
				items : [{
							name : 'archivesType.typeId',
							id : 'typeId',
							xtype : 'hidden',
							value : this.typeId == null ? '' : this.typeId
						}, {
							fieldLabel : '类型名称',
							name : 'archivesType.typeName',
							id : 'typeName',
							allowBlank:false
						}, {
							fieldLabel : '类型描述',
							name : 'archivesType.typeDesc',
							id : 'typeDesc',
							xtype:'textarea'
						}
				]
			});
		//加载表单对应的数据	
		if (this.typeId != null && this.typeId != 'undefined') {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/archive/getArchivesType.do?typeId='+ this.typeId,
				waitMsg : '正在载入数据...',
				success : function(form, action) {
				},
				failure : function(form, action) {
				}
			});
		}
		//初始化功能按钮
		this.buttons=[{
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
					var formPanel=Ext.getCmp('ArchivesTypeForm');
					if (formPanel.getForm().isValid()) {
						formPanel.getForm().submit({
							method : 'POST',
							waitMsg : '正在提交数据...',
							success : function(fp, action) {
								Ext.ux.Toast.msg('操作信息', '成功保存信息！');
								var treePanel=Ext.getCmp('archivesTypeTree');
								if(treePanel!=null){
									treePanel.root.reload();
								}
								Ext.getCmp('ArchivesTypeFormWin').close();
							},
							failure : function(fp, action) {
								Ext.MessageBox.show({
											title : '操作信息',
											msg : '信息保存出错，请联系管理员！',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								Ext.getCmp('ArchivesTypeFormWin').close();
							}
						});
					}
				}
			}, {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : function() {
					Ext.getCmp('ArchivesTypeFormWin').close();
				}
			}];
	}// end of the initcomponents
});