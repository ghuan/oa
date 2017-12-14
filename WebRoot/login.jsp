<%@page pageEncoding="UTF-8"%>
<%@page import="com.htsoft.core.util.AppUtil"%>
	<head>
		<title>JAVA组工作管理系统</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/login.css" />
		<%
		response.addHeader("__timeout","true");
		%>
		<script type="text/javascript">
			var __ctxPath="<%=request.getContextPath() %>";
			var __loginImage=__ctxPath+"<%=AppUtil.getCompanyLogo()%>";
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/adapter/ext/ext-base.gzjs"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-all.gzjs"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/App.LoginWin.js"></script>
		<script type="text/javascript">
	 		Ext.onReady(function(){
		 		Ext.QuickTips.init(); 
		 		new App.LoginWin().show();
			});	
		</script>
	</head>
	<body>
		<div style="text-align: center;">
			<div id="loginArea">
			</div>
		</div>
	</body>
</html>