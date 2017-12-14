Ext.ns("App");
/**
 * 权菜单加载类
 * @class App.MenuLoader
 * @extends Ext.ux.tree.XmlTreeLoader
 */
App.MenuLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
			processAttributes : function(attr) {
				if (attr.tagName == 'Item') {
					attr.leaf = true;
				} else if (attr.tagName == 'Items') {
					attr.loaded = true;
					attr.expanded = true;
				}
			}
});

//用户信息
var UserInfo=function(userId,fullname,depId,depName,rights){
	this.userId=userId;
	this.fullname=fullname;
	this.depId=depId;
	this.depName=depName;
	this.rights=rights;
};

//当前登录用户
var curUserInfo=null;

//检查当前用户有权访问funKey对应的功能
function isGranted(funKey){
	if(curUserInfo.rights.indexOf('__ALL')!=-1){
		return true;
	}
	if(curUserInfo.rights.indexOf(funKey)!=-1){
		return true;
	}
	return false;
}

App.init = function() {
	Ext.QuickTips.init();//这句为表单验证必需的代码
    //Ext.form.Field.prototype.msgTarget = "side" ;
	Ext.BLANK_IMAGE_URL=__ctxPath+'/ext3/resources/images/default/s.gif';
	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({remove:true});
			}, 1000); 
	
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp,options ){
		if (resp && resp.getResponseHeader){
		    if(resp.getResponseHeader('__timeout')) {
		    	Ext.ux.Toast.msg('操作提示：','操作已经超时，请重新登录!');
	        	window.location.href=__ctxPath+'/index.jsp?randId=' + parseInt(1000*Math.random());
	    	}
	    	if(resp.getResponseHeader('__forbidden')){
	    		Ext.ux.Toast.msg('系统访问权限提示：','你目前没有权限访问：{0}',options.url);
	    	}
		}
	});
	
	//加载权限
	Ext.Ajax.request({
			url:__ctxPath+'/system/getCurrentAppUser.do?random=' + Math.random(),
			method:'Get',
			success:function(response,options){
				var object=Ext.util.JSON.decode(response.responseText);
				var user=object.user;
				//取得当前登录用户的相关信息，包括权限
				curUserInfo=new UserInfo(user.userId,user.fullname,user.depId,user.depName,user.rights);
			}
	});
	
	//显示应用程序首页
	var indexPage=new IndexPage();
	
};

/**
 * 
 * @param {} id
 * @param {} callback 回调函数
 */
App.clickTopTab=function(id,params,precall,callback){
	if(precall!=null){
		precall.call(this);
	}
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(id);
	
	if (tabItem == null) {
		$ImportJs(id, function(view) {
			tabItem = tabs.add(view);
			tabs.activate(tabItem);
		},params);
	}else {
		if(callback!=null){
			callback.call(this);
		}
		tabs.activate(tabItem);
	}
}

App.clickNode = function(node) {
	if(node.id==null || node.id=='' || node.id.indexOf('xnode')!=-1){
		return ;
	}
	App.clickTopTab(node.id);
};
/**
 * 桌面点击
 */
App.MyDesktopClick=function(){
	var desktopPanel=Ext.getCmp("MyDesktop");
	desktopPanel.expand(true);
	App.clickTopTab('HomeView');
};
/**
 * 退出系统
 */
App.Logout = function() {
	Ext.Ajax.request({
				url : __ctxPath + '/j_logout.do',
				success : function() {
					window.location.href = __ctxPath + '/login.jsp';
				}
	});
}
	
//应用程序总入口
Ext.onReady(App.init);
