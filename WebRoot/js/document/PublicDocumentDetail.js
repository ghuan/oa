var PublicDocumentDetail=function(docId,docName){
  	this.docId = docId;
  	this.docName=docName;
    var pa=this.setup();
	var panel=new Ext.Panel({
	        id : 'PulicDocumentDetail',
	        iconCls:'menu-find-doc',
			title : ''+docName+'-详细信息',
			autoHeight :true,
			modal : true,
			autoScroll:true,
			layout : 'anchor',
			plain : true,
			items : [this.setup()]
		});
	return panel;
}
PublicDocumentDetail.prototype.setup=function(){
	var topbar=this.topbar();
	var panel=new Ext.Panel({
	     id:'PublicDocumentDetailPanel',
	     modal : true,
	     tbar:topbar,
	     autoScroll:true,
	     bodyStyle : 'padding-left:10%;padding-right:10%;',
//	     aotuHeight:true,
	     height:450,
	     autoLoad:{url:__ctxPath+'/document/publicDetailDocument.do?docId='+this.docId}	     
	});
	return panel;
		
}
PublicDocumentDetail.prototype.topbar=function() {
	var toolbar = new Ext.Toolbar({
				id : 'PublicDocumentTopBar',
				height : 35,
				bodyStyle:'text-align:center',
				items : []
			});
						
	return toolbar;
};