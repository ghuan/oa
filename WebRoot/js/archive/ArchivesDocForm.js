/**
 * @author csx
 * @createtime 
 * @class ArchivesDocForm
 * @extends Ext.Window
 * @description ArchivesDoc表单
 * @company 宏天软件
 */
ArchivesDocForm = Ext.extend(Ext.Window, {
			//内嵌FormPanel
			formPanel : null,
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				
				ArchivesDocForm.superclass.constructor.call(this, {
							id : 'ArchivesDocFormWin',
							layout : 'fit',
							border:false,
							items : this.formPanel,
							modal : true,
							height :600,
							width : 800,
							maximizable : true,
							title : '发文附件',
							buttonAlign : 'center',
							buttons : this.buttons
						});
			 // this.on('show',this.onShow());
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				
				this.webOffice=new WebOffice();

				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							//bodyStyle : 'padding:10px 10px 10px 10px',
							frame:true,
							url : __ctxPath + '/archive/saveArchivesDoc.do',
							id : 'ArchivesDocForm',
							defaults : {
								anchor : '98%,98%'
							},
							items : [{
										name : 'archivesDoc.docId',
										id : 'docId',
										xtype : 'hidden',
										value : this.docId == null ? '' : this.docId
									}, {
										xtype:'hidden',
										name : 'archivesDoc.fileId',
										id : 'fileId'
									},
									{
										fieldLabel : '文档名称',
										name : 'archivesDoc.docName',
										xtype : 'textfield',
										allowBlank:false,
										id : 'docName'
									},
									{
										xtype:'hidden',
										fieldLabel : '文档路径',
										name : 'archivesDoc.docPath',
										id : 'docPath'
									},{
										xtype:'panel',
										border:false,
										layout:'fit',
										height:480,
										html:this.webOffice.htmlObj
									}
								]
						});
				//加载表单对应的数据	
				if (this.docId != null && this.docId != 'undefined') {
					this.formPanel.getForm().load({
						deferredRender : false,
						url : __ctxPath + '/archive/getArchivesDoc.do?docId='+ this.docId,
						waitMsg : '正在载入数据...',
						success : function(form, action) {
						},
						failure : function(form, action) {
						}
					});
				}
				//初始化功能按钮
				this.buttons = [{
							text : '保存',
							iconCls : 'btn-save',
							scope:this,
							handler : this.onSave
						}, {
							text : '重置',
							iconCls : 'btn-reset',
							scope:this,
							handler : this.onReset
						}, {
							text : '取消',
							iconCls : 'btn-cancel',
							scope:this,
							handler : this.onCancel
						}];
			},//end of the initcomponents
			
			//overwrite the show method
			show:function(){
				
				ArchivesDocForm.superclass.show.call(this);
				var fullDocPath=''
				if(this.docPath!=null && this.docPath!=''){
					fullDocPath=__fullPath+'/attachFiles/' + this.docPath;
				}
				//this.webOffice.getDocObject().ShowToolBar=false;
				this.webOffice.getDocObject().HideMenuItem(0x04 + 0x2000);
				
				this.webOffice.openDoc(fullDocPath,'doc');
				//一定需要加上这个控制，保证关闭窗口后，office实例也需要关闭
				this.on('close',function(){
					try{
							this.webOffice.close();
						}catch(ex){
					}
				});
				
			},
			
			/**
			 * 重置
			 * @param {} formPanel
			 */
			onReset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * @param {} window
			 */
			onCancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			onSave : function() {
				if (this.formPanel.getForm().isValid()) {
					//保存WebOffice的内容至服务器，返回其Path，然后再提交表单
					var result=this.webOffice.saveDoc({
						fileCat:'archive',
						url:__fullPath+'/file-upload'	
					});
					var docPath=null;
					var fileId=null;
					if(result.success){
						docPath=result.docPath;
						fileId=result.fileId;
					}else{
						Ext.ux.Toast.msg('操作信息','保存文档出错！');
						return;
					}
					this.formPanel.getForm().submit({
								method : 'POST',
								//waitMsg : '正在提交数据...',
								params:{
									docPath:docPath,
									fileId:fileId
								},
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存附加文档！');
									this.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({title : '操作信息',msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
									});
									this.close();
								}
					});
				}
			}//end of save

		});
		
		