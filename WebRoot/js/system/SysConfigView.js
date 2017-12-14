Ext.ns('SysConfigView');
/**
 * [SysConfig]列表
 */
var SysConfigView = function() {
	return new Ext.Panel({
				id : 'SysConfigView',
				iconCls:'menu-system-setting',
				title : '系统配置',
				tbar : this.tbar(),
				autoScroll : true,
				items : [this.setup()]
			});
};

SysConfigView.prototype.tbar = function() {
	var toolbar = new Ext.Toolbar();
	toolbar.add(new Ext.Button({
				text : '保存',
				iconCls : 'btn-save',
				handler : function() {
                   var fp=Ext.getCmp('mailConfigForm');
                   if(fp.getForm().isValid()){
                   fp.getForm().submit( {
					method : 'post',
					waitMsg : '正在提交数据...',
					success : function(fp, action) {
						Ext.ux.Toast.msg('操作信息', '成功信息保存！');
						var tabs = Ext.getCmp('centerTabPanel');
						tabs.remove('SysConfigView');
					},
					failure : function(fp, action) {
						Ext.MessageBox.show( {
							title : '操作信息',
							msg : '信息保存出错，请联系管理员！',
							buttons : Ext.MessageBox.OK,
							icon : 'ext-mb-error'
					  });
				   }
			    });
                   
                   }
				}
			}));
	toolbar.add(new Ext.Button({
				text : '重置',
				iconCls : 'btn-reseted',
				handler : function() {
                    var formPanel=Ext.getCmp('mailConfigForm');
                   Ext.Ajax.request({
						url:__ctxPath+ "/system/loadSysConfig.do",
						success:function(response,options){
							formPanel.removeAll();
							var object=Ext.util.JSON.decode(response.responseText)
							formPanel.add(object.data);
							formPanel.doLayout();
						}
					});	
				}
			}));
	return toolbar;
}

SysConfigView.prototype.setup=function(){
   var formPanel=new Ext.FormPanel({
					        id:'mailConfigForm',
					        url : __ctxPath + '/system/saveSysConfig.do',
							defaultType : 'textfield',
							bodyStyle:'padding-left:10%;',
							frame:true,
							layout:'form',
							items : []
						});
	Ext.Ajax.request({
		url:__ctxPath+ "/system/loadSysConfig.do",
		success:function(response,options){
			var object=Ext.util.JSON.decode(response.responseText)
			formPanel.add(object.data);
			formPanel.doLayout();
		}
	});											
	return formPanel;
}