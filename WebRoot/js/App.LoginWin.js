Ext.ns("App");
App.LoginWin = function() {
	var formPanel = new Ext.form.FormPanel({
		bodyStyle : 'padding-top:6px',
		defaultType : 'textfield',
		columnWidth : .75,
		labelAlign : 'right',
		labelWidth : 55,
		labelPad : 0,
		border : false,
		layout : 'form',
		defaults : {
			allowBlank : false,
			anchor : '90%,120%',
			selectOnFocus : true
		},
		items : [{
					name : 'username',
					fieldLabel : '账      号',
					cls:'text-user',
					blankText : '账号不能为空'
				}, {
					name : 'password',
					fieldLabel : '密      码',
					blankText : '密码不能为空',
					cls:'text-lock',
					inputType : 'password'
				}, {
					name : 'checkCode',
					fieldLabel : '验证码',
					cls:'text-code',
					blankText : '验证码不能为空'
				}, {
					xtype : 'container',
					layout : 'table',
					defaultType : 'textfield',
					hideLabel : false,
					layoutConfig : {
						columns : 3
					},
					items : [{
								width : 55,
								xtype : 'label',
								text : '　　　　'// 这里的排序以后再改
							}, {
								width : 150,
								id : 'loginCode',
								xtype : 'panel',
								border : false,
								html : '<img border="0" height="30" width="150" src="'
									+ __ctxPath + '/CaptchaImg?rand=' + Math.random() + '"/>'
							}, {
								width : 55,
								xtype : 'panel',
								border : false,
								bodyStyle : 'font-size:12px;padding-left:12px',
								html : '<a href="javascript:refeshCode()">看不清</a>'
							}]
				}, {
					xtype : 'checkbox',
					name : '_spring_security_remember_me',
					boxLabel : '让系统记住我 '
				}]
	});

	var LoginHandler = function() {
		if (formPanel.form.isValid()) {
			formPanel.form.submit({
						waitTitle : "请稍候",
						waitMsg : '正在登录......',
						url : __ctxPath + '/login.do',
						success : function(form, action) {
							handleLoginResult(action.result);
						},
						failure : function(form, action) {
							handleLoginResult(action.result);
							form.findField("password").setRawValue("");
							form.findField("username").focus(true);
						}
					});
		}
	};

	var loginWin = new Ext.Window({
		id:'LoginWin',
		title : '用户登录',
		iconCls : 'login-icon',
		border : true,
		closable : false,
		resizable : false,
		buttonAlign : 'center',
		height : 275,
		width : 460,
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		keys : {
			key : Ext.EventObject.ENTER,
			fn : LoginHandler,
			scope : this
		},
		items : [{
					xtype : 'panel',
					border : false,
					html : '<div style="height:55px;"><div style="float:left;max-width:447px;height:50px;width: 447; font-size: 25px;color: #1E3A65; text-align: center; line-height: 50px; font-weight: 900; margin-left: 5px; font-family: 黑体;"><!-- <img id ="CompanyLogo" src="<%=basePath+AppUtil.getCompanyLogo()%>" height="50" style="max-width:447px;"/> -->  OA 办公管理信息系统 &nbsp;</div><!--<img src="' + __loginImage + '" style="height:55px;max-width:247px;"/><img src="' + __ctxPath + '/images/ht-login.jpg" style="height:55px;"/>--></div>',
					height : 60
				}, {
					xtype : 'panel',
					border : false,
					layout : 'column',
					items : [formPanel, {
						xtype : 'panel',
						border : false,
						columnWidth : .25,
						html : '<img src="' + __ctxPath+ '/images/login-user.jpg"/>'
					}]
				}],

		buttons : [{
					text : '登录',
					iconCls : 'btn-login',
					handler : LoginHandler.createDelegate(this)
				}, {
					text : '重置',
					iconCls : 'btn-login-reset',
					handler : function() {
						formPanel.getForm().reset();
					}
				}]
	});
	return loginWin;
};

function handleLoginResult(result) {
	if (result.success) {
		Ext.getCmp('LoginWin').hide();
		var statusBar = new Ext.ProgressBar({
       		text:'正在登录...'
    	});
    	statusBar.show();
		window.location.href = __ctxPath + '/index.jsp'
	} else {
		Ext.MessageBox.show({
					title : '操作信息',
					msg : result.msg,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
		});
	}
}

function refeshCode() {
	var loginCode = Ext.getCmp('loginCode');
	loginCode.body.update('<img border="0" height="30" width="150" src="'
			+ __ctxPath + '/CaptchaImg?rand=' + Math.random() + '"/>');
}
