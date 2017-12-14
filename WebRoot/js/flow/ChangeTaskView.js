/**
 * 把自己的任务分配给他人来代处理，并且选择是否发送邮件来通知
 * @param {} taskId
 */
var ChangeTaskView=function(taskId,taskname){
	var formPanel=new Ext.FormPanel({
		layout:'form',
		url:__ctxPath+'/flow/changeTask.do',
		frame:true,
		border:false,
		items:[
			{
				xtype:'hidden',
				name:'taskId',
				value:taskId
			},{
							xtype : 'panel',
							border:false,
							layout : 'column',
							style : 'padding-left:0px;margin-left:0px;margin-bottom:4px;',
							items : [{
										xtype : 'label',
										text : '代办人',
										style : 'padding-left:0px;margin-left:0px;margin-bottom:4px;',
										width : 100
									}, {
										name : 'fullname',
										id : 'fullname',
										xtype:'textfield',
										allowBlank:false,
										width:240
									}, {
										xtype:'hidden',
										name:'userId',
										id:'userId'
									},{
										xtype : 'button',
										text : '选择',
										iconCls : 'btn-select',
										width : 80,
										handler : function() {
											UserSelector.getView(
													function(ids, names) {
													  var fullname = Ext.getCmp('fullname');
													  var userId = Ext.getCmp('userId');
													  fullname.setValue(names);
													  userId.setValue(ids);
													},true).show();//true表示单选
										}
									}]

						
			},{
				xtype:'textarea',
				name:'msg',
				anchor:'98%',
				fieldLabel:'代办信息'
			}
		]
	});
	var win=new Ext.Window({
		title:'任务代办--' + taskname,
		height:180,
		iconCls:'btn-changeTask',
		buttonAlign:'center',
		width:500,
		modal:true,
		border:false,
		items:[formPanel],
		buttons:[
			{
				text:'转交代办人',
				iconCls:'btn-save',
				handler : function() {
						if (formPanel.getForm().isValid()) {
							formPanel.getForm().submit({
								success : function(form, action) {
									Ext.ux.Toast.msg('操作信息提示','任务已经成功转交代办人来处理！');
									var myTaskView=Ext.getCmp("MyTaskView");
									if(myTaskView!=null){
										myTaskView.getStore().reload();
									}
									win.close();
									
								}
							});
						}
					}
			},
			{
				text:'关闭',
				iconCls:'btn-close',
				handler:function(){
					win.close();
				}
			}
		]
	});
	
	win.show();
};