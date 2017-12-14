/**
 * @author 
 * @createtime 
 * @class ArchivesForm
 * @extends Ext.Window
 * @description Archives表单
 * @company 宏天软件
 */
ArchivesForm=Ext.extend(Ext.Window,{
	//内嵌FormPanel
	formPanel:null,
	//构造函数
	constructor:function(_cfg){
		if(_cfg==null){_cfg={};}
		Ext.apply(this,_cfg);
		//必须先初始化组件
		this.initComponents();
		ArchivesForm.superclass.constructor.call(this,{
			id:'ArchivesFormWin',
			layout:'fit',
			items:this.formPanel,
			modal:true,
			height:200,
			width:400,
			maximizable:true,
			title:'[Archives]详细信息',
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
				url : __ctxPath + '/archive/saveArchives.do',
				id : 'ArchivesForm',
				defaults : {
					anchor : '98%,98%'
				},
				defaultType : 'textfield',
				items : [{
							name : 'archives.archivesId',
							id : 'archivesId',
							xtype:'hidden',
							value : this.archivesId == null ? '' : this.archivesId
						}
																																										,{
												fieldLabel : '公文类型',	
												name : 'archives.typeId',
						id : 'typeId'
							}
																																				,{
												fieldLabel : '公文类型名称',	
												name : 'archives.typeName',
						id : 'typeName'
							}
																																				,{
												fieldLabel : '发文字号',	
												name : 'archives.archivesNo',
						id : 'archivesNo'
							}
																																				,{
												fieldLabel : '发文机关或部门',	
												name : 'archives.issueDep',
						id : 'issueDep'
							}
																																				,{
												fieldLabel : '发文部门ID',	
												name : 'archives.depId',
						id : 'depId'
							}
																																				,{
												fieldLabel : '文件标题',	
												name : 'archives.subject',
						id : 'subject'
							}
																																				,{
												fieldLabel : '发布日期',	
												name : 'archives.issueDate',
						id : 'issueDate'
							}
																																				,{
												fieldLabel : '公文状态
            0=拟稿、修改状态
            1=发文状态
            2=归档状态',	
												name : 'archives.status',
						id : 'status'
							}
																																				,{
												fieldLabel : '内容简介',	
												name : 'archives.shortContent',
						id : 'shortContent'
							}
																																				,{
												fieldLabel : '文件数',	
												name : 'archives.fileCounts',
						id : 'fileCounts'
							}
																																				,{
												fieldLabel : '拟办意见',	
												name : 'archives.handleOpinion',
						id : 'handleOpinion'
							}
																																				,{
												fieldLabel : '秘密等级
            普通
            秘密
            机密
            绝密',	
												name : 'archives.privacyLevel',
						id : 'privacyLevel'
							}
																																				,{
												fieldLabel : '紧急程度
            普通
            紧急
            特急
            特提',	
												name : 'archives.urgentLevel',
						id : 'urgentLevel'
							}
																																				,{
												fieldLabel : '发文人',	
												name : 'archives.issuer',
						id : 'issuer'
							}
																																				,{
												fieldLabel : '发文人ID',	
												name : 'archives.issuerId',
						id : 'issuerId'
							}
																																				,{
												fieldLabel : '主题词',	
												name : 'archives.keywords',
						id : 'keywords'
							}
																																				,{
												fieldLabel : '公文来源
            仅在收文中指定，发公文不需要指定
            上级公文
            下级公文',	
												name : 'archives.sources',
						id : 'sources'
							}
																																				,{
												fieldLabel : '',	
												name : 'archives.archiveType',
						id : 'archiveType'
							}
																								
												]
			});
		//加载表单对应的数据	
		if (this.archivesId != null && this.archivesId != 'undefined') {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/archive/getArchives.do?archivesId='+ this.archivesId,
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
					var gridPanel=Ext.getCmp('ArchivesGrid');
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