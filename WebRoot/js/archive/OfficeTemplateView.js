/**
 * @author csx
 * @description 公文模板在线显示及编辑窗口
 * @company 广州宏天软件有限公司
 * @param {} docPath
 * @param {} readOnly
 */
var OfficeTemplateView=function(docPath,readOnly,callback){
	this.docPath=docPath;
	this.readOnly = readOnly==null?false:readOnly;
	
	var objHtml = "<object id='WebOfficeObj' height='100%' width='100%' style='LEFT: 0px; TOP: 0px'  classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' codebase='"+__ctxPath+"/js/core/weboffice/HWPostil_V3074.cab#V6,0,4,2'>";
				objHtml+="<param name='TitlebarColor' value='7898C2'/>";
				objHtml +="</object>";
				//文件保存在服务器端的路径			
				var win=new Ext.Window({
					title:'公文模板详细信息',
					height:500,
					width:700,
					maximizable:true,
					html:objHtml
				});
				
				//是否只读
				if(!this.readOnly){
					win.buttonAlign='center';
					win.buttons=[
					{
						iconCls:'btn-save',
						text:'保存',
						handler:function(){
							
								var url=__fullPath+"/file-upload";
								document.all.WebOfficeObj.HttpInit();
								document.all.WebOfficeObj.HttpAddPostString('file_cat', 'archive');
								//overwrite file path
								document.all.WebOfficeObj.HttpAddPostString('file_path', docPath);
								
								document.all.WebOfficeObj.HttpAddPostCurrFile("AipFile ","");	
								// 提交上传文件
								returnValue = document.all.WebOfficeObj.HttpPost(url);
								var obj;
								eval('obj='+returnValue+";");
								
								if(obj.success){
									Ext.ux.Toast.msg('操作信息','已经成功保存至服务器！');
									if(callback!=null){
										callback.call(this,obj.fileId,obj.filePath);
									}
									win.close();
								}else{
									Ext.ux.Toast.msg('操作信息','操作出错，请联系管理员！');
								}
							
						}//end of handler
					},
					{
						iconCls:'btn-cancel',
						text:'关闭',
						handler:function(){
							win.close();
						}
					},
					{
						text:'保留修改痕迹',
						handler:function(){
							 document.all.WebOfficeObj.SetTrackRevisions(1);
				 			 document.all.WebOfficeObj.SetCurrUserName(curUserInfo.fullname);
						}
					},
					{
						text:'取消保留痕迹',
						handler:function(){
							 document.all.WebOfficeObj.SetTrackRevisions(0);
						}
					},
					{
						text:'清除痕迹',
						handler:function(){
							 document.all.WebOfficeObj.SetTrackRevisions(4);
						}
					}
					];
				}
				
				win.show();
				//隐藏保存与返回的按钮
				//document.all.WebOfficeObj.HideMenuItem(0x04 + 0x2000);
				document.all.WebOfficeObj.ShowToolBar=false;
				var fullDocPath=''
				if(this.docPath!=null && this.docPath!=''){
					fullDocPath=__fullPath+'/attachFiles/' + this.docPath;
				}
				document.all.WebOfficeObj.LoadOriginalFile(fullDocPath,'doc');
				
				//一定需要加上这个控制，保证关闭窗口后，office实例也需要关闭
				win.on('close',function(){
					try{
						document.all.WebOfficeObj.Close();
					}catch(ex){
					}
				});
				//当窗口关闭时也需要做同样的操作
				window.onUnload=function(){
					try{
						document.all.WebOfficeObj.Close();
					}catch(ex){
					}
				}
};