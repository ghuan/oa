var SharedPhoneBookWin=function(phoneId){
	this.phoneId = phoneId;
    var pa=this.setup();
	var window=new Ext.Window({
	        id : 'SharedPhoneBookWin',
			title : '联系人信息',
			iconCls:"menu-phonebook-shared",
			width : 500,
			height :520,
			modal : true,
			autoScroll:true,
			layout : 'anchor',
			plain : true,
			bodyStyle : 'padding:5px;',
			buttonAlign : 'center',
			items : [this.setup()],
			buttons : [{
				text : '关闭',
				handler : function() {
					window.close();
				}
			}]
		});
	window.show();
}
SharedPhoneBookWin.prototype.setup=function(){
	var panel=new Ext.Panel({
	     id:'SharedPhoneBookPanel',
	     modal : true,
	     autoScroll:true,
	     autoLoad:{url:__ctxPath+'/communicate/detailPhoneBook.do?phoneId='+this.phoneId}	     
	});
	return panel;
		
}