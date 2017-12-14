var DiaryDetail = function(id){
	var win = new Ext.Window({
	title : '工作日志详情',
	iconCls:'menu-diary',
	autoHeight :true,
	//autoWidth :true,
	width : 500,
	buttonAlign : 'center',
	autoLoad : {url:__ctxPath+'/system/checkDiary.do?diaryId='+id},
	buttons: [{
		text : '关闭',
		iconCls:'btn-close',
		handler : function(){
			win.close();
		}
	}]
   });
   win.show();
}