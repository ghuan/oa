/**
 * @author 
 * @createtime 
 * @class DocHistoryForm
 * @extends Ext.Window
 * @description DocHistory表单
 * @company 宏天软件
 */
DocHistoryForm=Ext.extend(Ext.Window,{
	//内嵌FormPanel
	formPanel:null,
	//构造函数
	constructor:function(_cfg){
		if(_cfg==null){_cfg={};}
		Ext.apply(this,_cfg);
		//必须先初始化组件
		this.initComponents();
		DocHistoryForm.superclass.constructor.call(this,{
			id:'DocHistoryFormWin',
			layout:'fit',
			items:this.formPanel,
			modal:true,
			height:200,
			width:400,
			maximizable:true,
			title:'[DocHistory]详细信息',
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
				url : __ctxPath + '/archive/saveDocHistory.do',
				id : 'DocHistoryForm',
				defaults : {
					anchor : '98%,98%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'docHistory.historyId',
							id : 'historyId',
							xtype:'hidden',
							value : this.historyId == null ? '' : this.historyId
						}
																																										,{
												fieldLabel : '',	
												name : 'docHistory.docId',
						id : 'docId'
							}
																																				,{
												fieldLabel : '附件ID',	
												name : 'docHistory.fileId',
						id : 'fileId'
							}
																																				,{
												fieldLabel : '文档名称',	
												name : 'docHistory.docName',
						id : 'docName'
							}
																																				,{
												fieldLabel : '路径',	
												name : 'docHistory.path',
						id : 'path'
							}
																																																												,{
												fieldLabel : '更新时间',	
												name : 'docHistory.updatetime',
						id : 'updatetime'
							}
																																				,{
												fieldLabel : '修改人',	
												name : 'docHistory.mender',
						id : 'mender'
							}
																								
												]
			});
		//加载表单对应的数据	
		if (this.historyId != null && this.historyId != 'undefined') {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/archive/getDocHistory.do?historyId='+ this.historyId,
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
				handler :this.save.createCallback(this.formPanel,this)
			}, {
				text : '重置',
				iconCls : 'btn-reset',
				handler :this.reset.createCallback(this.formPanel)
			},{
				text : '取消',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}];
	},//end of the initcomponents
	
	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset:function(formPanel){
		formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel:function(window){
		window.close();
	},
	/**
	 * 保存记录
	 */
	save:function(formPanel,window){
		if (formPanel.getForm().isValid()) {
			formPanel.getForm().submit({
				method : 'POST',
				waitMsg : '正在提交数据...',
				success : function(fp, action) {
					Ext.ux.Toast.msg('操作信息', '成功保存信息！');
					var gridPanel=Ext.getCmp('DocHistoryGrid');
					if(gridPanel!=null){
						gridPanel.getStore().reload();
					}
					window.close();
				},
				failure : function(fp, action) {
					Ext.MessageBox.show({
								title : '操作信息',
								msg : '信息保存出错，请联系管理员！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
					window.close();
				}
			});
		}
	}//end of save
	
});