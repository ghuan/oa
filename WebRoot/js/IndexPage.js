var megBtn = new Ext.Button({
				id : 'messageTip',
				hidden : true,
				width : 50,
				height : 20,
				handler : function() {
					var megBtn = Ext.getCmp('messageTip');
					var megWin = Ext.getCmp('win');
					if (megWin == null) {
						new MessageWin();
					}
					megBtn.hide();
				}
			});

	var addBtn = function(count) {
		var megBtn = Ext.getCmp('messageTip');
		var megWin = Ext.getCmp('win');
		var reMegWin = Ext.getCmp('wind');
		if (count > 0 && megWin == null && reMegWin == null) {
			megBtn.setText('<div style="height:25px;"><img src="' + __ctxPath + '/images/newpm.gif" style="height:12px;"/>你有<strong style="color: red;">' + count + '</strong>信息</div>');
            soundManager.play('msgSound');
			megBtn.show();
		} else {
			megBtn.hide();
		}
	};

	var addBtnFunction = function() {
		Ext.Ajax.request({
					url : __ctxPath + '/info/countInMessage.do',
					method : 'POST',
					success : function(response, options) {
						var result = Ext.util.JSON
								.decode(response.responseText);
						count = result.count;
						addBtn(count);
						setTimeout(addBtnFunction, 1000 * 60);  //设60秒响应一次
					},
					failure : function(response, options) {
					},
					scope : this
				});
	};

/**
 * @author csx
 * @version 1.0
 * @date 2009-12-25
 * @class IndexPage
 * @extends Ext.Viewport
 * @description 程序的主页
 */
var IndexPage = Ext.extend(Ext.Viewport, {
	/**
	 * 头部导航
	 */
	top : new Ext.Panel({
				region : 'north',
				id : '__nortPanel',
				contentEl : 'app-header',
				height : 90
			}),
	/**
	 * 中间内容部分
	 */
	center : null,
	/**
	 * 西部菜单导航Panel
	 */
	west : new Ext.Panel({
				region : 'west',
				id : 'west-panel', //
				title : '导航',
				iconCls : 'menu-navigation',
				split : true,
				width : 200,
				autoScroll : true,
				layout : 'accordion',
				collapsible : true,
				margins : '0 0 0 2',
				// layoutConfig:{ animate:true},
				items : [],
				bbar : new Ext.Toolbar({
							width : '100%',
							height : 25,
							items : [{
										text : '退出系统',
										iconCls : 'btn-logout',
										handler : function() {
											App.Logout();
										}
									}, '->', {
										text : '在线用户',
										iconCls : 'btn-onlineUser',
										handler : function() {
											OnlineUserSelector.getView().show();
										}
									}]
						})
			}),
	/**
	 * 南部导航
	 */
	south: new Ext.Panel({
			region : 'south',
			height : 28,
			border : false,
			bbar : [
					megBtn,
					'->',
					{
						xtype : "tbfill"
					},
					{
					  xtype:'tbtext',
					  text:__companyName+' OA 办公管理信息系统',
					  id:'toolbarCompanyName'
					},
					{
						xtype : 'tbseparator'
					},
					new Ext.Toolbar.TextItem('WoolBfoot'),
					{
						xtype : 'tbseparator'
					}, {
						pressed : false,
						text : '与我们联系',
						handler:function(){
							//Ext.ux.Toast.msg("联系我们","电话：020-62652355<br/>网址：http://www.jee-soft.cn");
						}
					},'-',{
						text:'收展',
						iconCls:'btn-expand',
						handler:function(){
							var panel=Ext.getCmp("__nortPanel");
							if(panel.collapsed){
								panel.expand(true);
							}else{
								panel.collapse(true);
							}
						}
					}]
		}),
		
		/**
		 * 构造函数
		 */
		constructor: function(){
			
			this.center=new Ext.TabPanel({
				id : 'centerTabPanel',
				region : 'center',
				deferredRender : true,
				enableTabScroll : true,
				activeTab : 0, // first tab initially active,
				defaults : {
					autoScroll : true,
					closable : true,
					bodyStyle : 'padding-bottom: 12px;'
				},
				items : []
			});
			
			IndexPage.superclass.constructor.call(this,{
				layout : "border", // 指定布局为border布局
				items:[
					this.top,
					this.west,
					this.center,
					this.south
				]
			});
			//加载菜单
			this.loadWestMenu();
			//设置日历、声音提示、首页
			this.afterPropertySet();
			
		},
		/**
		 * 设置日历、声音提示、首页
		 */
		afterPropertySet:function(){
			var centerPanel=this.center;
			setTimeout(function(){
				//显示当前日历
				setInterval('CalConv()',1000);
			 	var homeTab=centerPanel.add(new AppHome().initAllPortal());
			 	setTimeout(function(){
			 		//centerPanel.activate(homeTab);
			 	},2000);
				//
				/**
				 * 消息提示音
				 */
				soundManager = new SoundManager();
				soundManager.url = __ctxPath+'/js/sound/swf/'; // path to SoundManager2 SWF files (note trailing slash)
				soundManager.beginDelayedInit();
				soundManager.debugMode = false;
				soundManager.consoleOnly = false;
				soundManager.onload = function() {
				   soundManager.createSound({
			            id: 'msgSound',
			            url: __ctxPath+'/js/sound/mp3/msg.mp3'
			        });
			       addBtnFunction();
				}
			 },100);
			 
			 Ext.getCmp('SearchForm').render('searchFormDisplay');
		},
		
		/**
		 * 加载左导航树菜单
		 */
		loadWestMenu:function(){
			var westPanel=Ext.getCmp('west-panel');
				Ext.Ajax.request({
							url : __ctxPath + '/modelsMenu.do',
							success : function(response, options) {
								var arr = eval(response.responseText);
								var __activedPanelId = getCookie("__activedPanelId");
								for (var i = 0; i < arr.length; i++) {
									var panel = new Ext.tree.TreePanel({
												id : arr[i].id,
												title : arr[i].text,
												iconCls : arr[i].iconCls,
												animate:true,
												border : false,
												autoScroll:true,
												loader : new App.MenuLoader({
													url : __ctxPath + '/itemsMenu.do?id='+ arr[i].id
												}),
												root : new Ext.tree.AsyncTreeNode({
													expanded : true
												}),
												listeners : {
													'click' : App.clickNode
												},
												rootVisible : false
											});
									
									westPanel.add(panel);
									panel.on('expand', function(p) {
												// 记住上次点激的panel
												var expires = new Date();
												expires.setDate(expires.getDate() + 30);
												setCookie("__activedPanelId", p.id,expires, __ctxPath);
									});
									// 激活上次点击的panel
									if (arr[i].id == __activedPanelId) {
										westPanel.layout.activeItem = panel;
									}
								}
								westPanel.doLayout();
							}
			});
		}//end of the loadWestMenu function
	}
);
