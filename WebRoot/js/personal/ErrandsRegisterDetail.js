/**
 * 显示请假的详细信息
 * @param {} dateId
 */
var ErrandsRegisterDetail=function(dateId){

	var detailPanell = new Ext.Panel({
				autoHeight : true,
				autoWidth:true,
				border : false,
				autoLoad : {
					url : __ctxPath
							+ '/pages/personal/errandsRegisterDetail.jsp?dateId=' + dateId
				}
	});
	var window = new Ext.Window({
				title:'请假详细信息',
				iconCls:'menu-holiday',
				id : 'ErrandsRegisterDetail',
				width : 460,
				height : 280,
				modal : true,
				autoScroll:true,
				layout : 'form',
				buttonAlign : 'center',
				items : [detailPanell],
				buttons : [{
							text : '关闭',
							iconCls : 'btn-cancel',
							handler : function() {
								window.close();
							}
						}]
	});
	
	window.show();
};