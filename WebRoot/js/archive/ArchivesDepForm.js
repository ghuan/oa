/**
 * @author 
 * @createtime 
 * @class ArchivesDepForm
 * @extends Ext.Window
 * @description ArchivesDep表单
 * @company 宏天软件
 */
ArchivesDepForm=Ext.extend(Ext.Window,{
	//内嵌FormPanel
	formPanel:null,
	//构造函数
	constructor:function(_cfg){
		if(_cfg==null){_cfg={};}
		Ext.apply(this,_cfg);
		//必须先初始化组件
		this.initComponents();
		ArchivesDepForm.superclass.constructor.call(this,{
			id:'ArchivesDepFormWin',
			layout:'fit',
			items:this.formPanel,
			modal:true,
			height:200,
			width:400,
			maximizable:true,
			title:'[ArchivesDep]详细信息',
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
				url : __ctxPath + '/archive/saveArchivesDep.do',
				id : 'ArchivesDepForm',
				defaults : {
					anchor : '98%,98%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'archivesDep.archDepId',
							id : 'archDepId',
							xtype:'hidden',
							value : this.archDepId == null ? '' : this.archDepId
						}
																																										,{
												fieldLabel : '自编号',	
												name : 'archivesDep.signNo',
						id : 'signNo'
							}
																																				,{
												fieldLabel : '收文部门',	
												name : 'archivesDep.depId',
						id : 'depId'
							}
																																				,{
												fieldLabel : '所属公文',	
												name : 'archivesDep.archivesId',
						id : 'archivesId'
							}
																																				,{
												fieldLabel : '公文标题',	
												name : 'archivesDep.subject',
						id : 'subject'
							}
																																				,{
												fieldLabel : '所属收文分类',	
												name : 'archivesDep.typeId',
						id : 'typeId'
							}
																																				,{
												fieldLabel : '签收状态
            0=未签收
            1=已签收',	
												name : 'archivesDep.status',
						id : 'status'
							}
																																				,{
												fieldLabel : '签收日期',	
												name : 'archivesDep.signTime',
						id : 'signTime'
							}
																																				,{
												fieldLabel : '签收人',	
												name : 'archivesDep.signFullname',
						id : 'signFullname'
							}
																																				,{
												fieldLabel : '办理结果反馈',	
												name : 'archivesDep.handleFeedback',
						id : 'handleFeedback'
							}
																																				,{
												fieldLabel : '主送、抄送
            1=主送
            0=抄送',	
												name : 'archivesDep.isMain',
						id : 'isMain'
							}
																								
												]
			});
		//加载表单对应的数据	
		if (this.archDepId != null && this.archDepId != 'undefined') {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/archive/getArchivesDep.do?archDepId='+ this.archDepId,
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
					var gridPanel=Ext.getCmp('ArchivesDepGrid');
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