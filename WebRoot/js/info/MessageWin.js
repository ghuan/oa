var MessageWin = function() {
	var senderId;
	var senderName;
	var replyId;
	var window = new Ext.Window({
		id : 'win',
		title : '',
		iconCls:'btn-replyM',
		region : 'west',
		width : 300,
		height : 200,
		x : 5,
		y : 350,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [],
		buttons : [{
					text : '下一条',
					iconCls:'btn-down',
					id : 'nextMessage',
					handler : function() {
						var win = Ext.getCmp('win');
						if (win != null) {
							win.close();
						}
						new MessageWin();
					}
				}, {
					text : '回复',
					iconCls:'btn-replyM',
					id:'replyMessage',
					handler : function() {
						var win = Ext.getCmp('win');
						win.close();
						new ReMessageWin(MessageWin.prototype.getSenderId(),MessageWin.prototype.getSenderName());
					}
				}, {
					text : '删除',
					iconCls:'btn-del',
					handler : function() {
						Ext.Ajax.request({
									url : __ctxPath
											+ '/info/multiRemoveInMessage.do',
									method : 'POST',
									params : {
										ids : MessageWin.prototype.getReplyId()
									},
									success : function(response, options) {
										var win = Ext.getCmp('win');
										win.close();
										Ext.ux.Toast.msg('操作信息', '信息删除成功！');

									},
									failure : function(response, options) {
										Ext.ux.Toast.msg('操作信息', '信息删除失败！');
									},
									scope : this
								});
					}
				}]
	});
	this.initUI();
	window.show();
}

MessageWin.prototype.setReplyId=function(replyId){
   this.replyId=replyId;
}
MessageWin.prototype.getReplyId=function(){
   return this.replyId;
}
MessageWin.prototype.setSenderId=function(senderId){
   this.senderId=senderId;
}
MessageWin.prototype.getSenderId=function(){
  return this.senderId;
}
MessageWin.prototype.setSenderName=function(senderName){
  this.senderName=senderName;
}
MessageWin.prototype.getSenderName=function(){
  return this.senderName;
}
MessageWin.prototype.initUI = function() {
	var button = Ext.getCmp('nextMessage');
	button.hide();
	var store = this.initData();
	store.load();
	store.on('load', AJAX_Loaded, store, true);	
	function AJAX_Loaded() {
		var window = Ext.getCmp('win');
		window.removeAll();
		var rec = store.getAt(0);
		replyId = rec.get('receiveId');
		MessageWin.prototype.setReplyId(replyId);
		var senderId = rec.get("senderId");
		MessageWin.prototype.setSenderId(senderId);
		var sender = rec.get('sender');
		MessageWin.prototype.setSenderName(sender);
		var sendTime = rec.get('sendTime');
		var content = rec.get("content");
		var type=rec.get('msgType');	
		if(type!='1'){
		  Ext.getCmp('replyMessage').hide();
		}
		Ext.Ajax.request({
					url : __ctxPath + '/info/knowInMessage.do',
					method : 'POST',
					params : {
						receiveId : MessageWin.prototype.getReplyId()
					},
					success : function(response, options) {					
						Ext.Ajax.request({
								url : __ctxPath + '/info/countInMessage.do',
								method : 'POST',
								success : function(response, options) {
									var result = Ext.util.JSON
											.decode(response.responseText);
									var countM = result.count;						
									if (countM >0) {
										button.show();
									}
//									window.show();
								},
								failure : function(response, options) {
								},
								scope : this
							});
					},
					failure : function(response, options) {
					},
					scope : this
				});
			var panel = new Ext.Panel({
					id : 'pp',
					columnWidth : .33,
					height : 150,
					width : 160,
					html : '<p>  ' + sender + '  ' + sendTime
							+ '</p><p style="color:red;">' + content + '</p>'
				});
			window.setTitle(sender + '发送的信息');
			window.add(panel);
			window.doLayout(true);
		    
	}
}

MessageWin.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/info/readInMessage.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'data'
						}, [{
									name : 'receiveId',
									type : 'int'
								}, {
									name : 'messageId',
									type : 'int'
								}, {
									name : 'msgType',
									type : 'int'
								}, {
									name : 'senderId',
									type : 'int'
								}, 'sender', 'content', {
									name : 'sendTime'
								}])
			});
	return store;
};
