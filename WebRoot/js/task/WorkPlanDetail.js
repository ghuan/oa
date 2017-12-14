/**
 * 计划详细信息
 * 
 */
var WorkPlanDetail = function(id,name) {

	var win = new Ext.Window({
				title : name+'--详细信息',
				iconCls:'menu-planmanage',
				autoHeight : true,
				x:280,
				y:100,
				width : 600,
				layout:'form',
				buttonAlign : 'center',
				autoLoad : {
					url : __ctxPath + '/task/showWorkPlan.do?planId='+ id
				},
				buttons : [{
							text : '关闭',
							iconCls:'btn-cancel',
							handler : function() {
								win.close();
							}
						}]
			});
	win.show();

}