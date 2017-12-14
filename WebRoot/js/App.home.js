// 首页的设置
var AppHome=function(){
	// ----------------------------------------- Notice Home Grid Start --
			var noticeCm = new Ext.grid.ColumnModel({
						columns : [{
									header : 'noticeId',
									dataIndex : 'noticeId',
									hidden : true
								}, {
									header : '公告标题',
									dataIndex : 'noticeTitle',
									width : 160,
									renderer : function(value) {
										return '<img src="'
												+ __ctxPath
												+ '/images/menus/info/notice_menu.png"/>'
												+ value;
									}
								}, {
									header : '生效日期',
									dataIndex : 'effectiveDate',
									width : 100,
									renderer : function(value) {
										return value.substring(0, 10);
									}
								}],
						defaults : {
							sortable : true,
							menuDisabled : false
							// width : 100
						}
					});
					
			var noticeStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/info/listNotice.do'
								}),
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									id : 'id',
									fields : [{
												name : 'noticeId',
												type : 'int'
											}, 'noticeTitle', 'effectiveDate']
								}),
						remoteSort : true
					});
			noticeStore.setDefaultSort('noticeId', 'desc');
			
		// ----------------------------------------- Notice Home Grid End ------------------------
					
		// ----------------------------------------- News Home Grid start --
			var newsCm = new Ext.grid.ColumnModel({
				columns : [{
							header : 'newsId',
							dataIndex : 'newsId',
							hidden : true
						}, {
							header : '新闻标题',
							width : 160,
							dataIndex : 'subject',
							renderer : function(value, metadata, record) {
								var icon = record.data.subjectIcon;
								var str = null;
								if (icon != '') {
									str = '<img style="border:0;" width="16" height="16" src="'
											+ __ctxPath
											+ '/attachFiles/'
											+ icon
											+ '" border="0"/>';
								} else {
									str = '<img style="border:0;" width="16" height="16" src="'
											+ __ctxPath
											+ '/images/default_newsIcon.jpg" border="0"/>';
								}
								return str + value;
							}
						}, {
							header : '创建时间',
							width : 100,
							dataIndex : 'createtime',
							renderer : function(value) {
								return value.substring(0, 10);
							}
						}],
				defaults : {
					sortable : true,
					menuDisabled : false
					// width : 100
				}
			});
		
			var newsStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/info/listNews.do'
								}),
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									id : 'id',
									fields : [{
												name : 'newsId',
												type : 'int'
											}
		
											, 'typeId', 'subjectIcon', 'subject',
											'createtime']
								}),
						remoteSort : true
					});
			newsStore.setDefaultSort('newsId', 'desc');
			
			
			// ----------------------------------------- News Home Grid End --
		
			// ----------------------------------------- Message Home Grid start --
			var messageCm = new Ext.grid.ColumnModel({
						columns : [{
							header : "内容",
							dataIndex : 'content',
							width : 150,
							renderer : function(value, metadata, record) {
								var str = '';
								if (record.data.readFlag == '1') {
									str += '<img src="'
											+ __ctxPath
											+ '/images/btn/info/email_open.png" title="已读"/>';
								} else {
									str += '<img src="' + __ctxPath
											+ '/images/btn/info/email.png" title="未读"/>';
								}
								return str + value;
							}
		
						}, {
							header : "发送时间",
							dataIndex : 'sendTime',
							width : 100,
							renderer : function(value) {
								return value.substring(0, 10);
							}
						}],
						defaults : {
							sortable : true,
							menuDisabled : true
							// width: 100
						}
					});
			var messageStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/info/listShortMessage.do'
								}),
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									id : 'id',
									fields : [{
												name : 'receiveId',
												type : 'int'
											}, {
												name : 'content',
												mapping : 'shortMessage.content'
											}, {
												name : 'sendTime',
												mapping : 'shortMessage.sendTime'
											}, {
												name : 'readFlag'
											}]
								}),
						remoteSort : true
					});
			messageStore.setDefaultSort('id', 'desc');
			

			// ----------------------------------------- Message Home Grid End --
			// ----------------------------------------- Task Home Grid start --
			var planCm = new Ext.grid.ColumnModel({
				columns : [{
							header : 'planId',
							dataIndex : 'planId',
							hidden : true
						}, {
							width : 150,
							header : '内容',
							dataIndex : 'content',
							renderer : function(value, metadata, record) {
								var status = record.data.status;
								if (status == 1) {
									return '<img src="'
											+ __ctxPath
											+ '/images/flag/task/finish.png" title="完成"/>'
											+ '<font style="text-decoration:line-through;color:red;">'
											+ value + '</font>';
								} else {
									return '<img src="' + __ctxPath
											+ '/images/flag/task/go.png" title="未完成"/>'
											+ value;
								}
							}
						}, {
							header : '结束时间',
							width : 100,
							dataIndex : 'endTime',
							renderer : function(value) {
								return value.substring(0, 10);
							}
						}],
				defaults : {
					sortable : true,
					menuDisabled : false,
					width : 100
				}
			});
			var planStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/task/listCalendarPlan.do'
								}),
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									id : 'id',
									fields : [{
												name : 'planId',
												type : 'int'
											}, 'endTime', 'content', 'status']
								}),
						remoteSort : true
					});
			planStore.setDefaultSort('planId', 'desc');
			
			
			// ----------------------------------------- Task Home Grid End --
			// ----------------------------------------- Appointment Home Grid start --
			var appointmentCm = new Ext.grid.ColumnModel({
						columns : [{
									header : 'appointId',
									dataIndex : 'appointId',
									hidden : true
								}, {
									header : '主题',
									dataIndex : 'subject',
									renderer : function(value) {
										return '<img src="'
												+ __ctxPath
												+ '/images/flag/task/appointment.png"/>'
												+ value;
									}
								}, {
									header : '开始时间',
									dataIndex : 'startTime',
									renderer : function(value) {
										return value.substring(0, 10);
									}
								}],
						defaults : {
							sortable : true,
							menuDisabled : false,
							width : 100
						}
					});
			var appointmentStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/task/listAppointment.do'
								}),
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									id : 'id',
									fields : [{
												name : 'appointId',
												type : 'int'
											}, 'subject', 'startTime']
								}),
						remoteSort : true
					});
			appointmentStore.setDefaultSort('appointId', 'desc');
			
			
			// ----------------------------------------- Appointment Home Grid End --------------------
			// ----------------------------------------- Notice Home Grid start ------------------------
			var taskCm = new Ext.grid.ColumnModel({
						columns : [{
									header : "userId",
									dataIndex : 'userId',
									width : 20,
									hidden : true,
									sortable : true
								}, {
									header : '事项名称',
									dataIndex : 'activityName',
									width : 120,
									renderer : function(value) {
										return '<img src="' + __ctxPath
												+ '/images/menus/flow/task.png"/>'
												+ value;
									}
								}, {
									header : '到期时间',
									dataIndex : 'dueDate',
									width : 100,
									renderer : function(value) {
										if (value == '') {
											return '无限制';
										} else {
											return value.substring(0, 10);
										}
									}
								}],
						defaults : {
							sortable : true,
							menuDisabled : true,
							width : 100
						}
					});
			var taskStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : __ctxPath + '/flow/listTask.do'
								}),
						// create reader that reads the Topic records
						reader : new Ext.data.JsonReader({
									root : 'result',
									totalProperty : 'totalCounts',
									fields : ['executionId','activityName', 'dueDate']
								}),
						remoteSort : true
					});
			taskStore.setDefaultSort('dbId', 'desc');
			
		
			// ----------------------------------------- Notice Home Grid End --
	var tools=[
//		{
//					id:'refresh',  
//					handler: function(e, target, panel){  
//					 
//					} 
//				},
		{
					id : 'close',
					handler : function(e, target, panel) {
						panel.ownerCt.remove(panel, true);
					}
		}];
		
	var HomeGrid=function(_cm,_id,_store) {
			var cm = _cm;
			var store = _store;
			store.load({
						params : {
							start : 0,
							limit : 8
				}
			});
			var grid = new Ext.grid.GridPanel({
						id : _id,
						store : _store,
						trackMouseOver : true,
						disableSelection : false,
						loadMask : true,
						//height:240,
						border: false,
						
						cm : cm,
						viewConfig : {
							forceFit : true,
							enableRowBody : false,
							showPreview : false
						},
						// paging bar on the bottom
						bbar : new Ext.PagingToolbar({
									pageSize : 8,
									store : store
						})
			});		
			return grid;

		};
		
	return {
		initAllPortal:function(){
			var noticeGrid = new HomeGrid(noticeCm, 'appHomeNoticeGrid', noticeStore);
			var newsGrid = new HomeGrid(newsCm, 'appHomeNewsGrid', newsStore);
			var messageGrid = new HomeGrid(messageCm, 'appHomeMessageGrid',messageStore);
			var planGrid = new HomeGrid(planCm, 'appHomePlanGrid', planStore);
			var appointmentGrid = new HomeGrid(appointmentCm,'appHomeAppointmentGrid', appointmentStore);
			var taskGrid = new HomeGrid(taskCm, 'appHomeTaskGrid', taskStore);
			noticeGrid.addListener('rowdblclick', 
				function(grid, rowindex, e) {grid.getSelectionModel().each(function(rec) {
									App.clickTopTab('NoticeDetail',rec.data.noticeId,function(){
										AppUtil.removeTab('NoticeDetail');
									});
									});
			});
			
			newsGrid.addListener('rowdblclick', function(grid, rowindex, e) {
						grid.getSelectionModel().each(function(rec) {
									App.clickTopTab('NewsDetail',rec.data.newsId,function(){
										AppUtil.removeTab('NewsDetail');
									});
								});
			});
					
			planGrid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							App.clickTopTab('CalendarPlanDetail',rec.data.planId,function(){
										AppUtil.removeTab('CalendarPlanDetail');
									});
						});
			});

			appointmentGrid.addListener('rowdblclick', function(grid, rowindex,e) {
				grid.getSelectionModel().each(function(rec) {
					App.clickTopTab('AppointmentDetail',rec.data.appointId,function(){
										AppUtil.removeTab('AppointmentDetail');
									});
						});
			});

			taskGrid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							var exeId=rec.data.executionId;
							var taskName=rec.data.activityName;
					        var contentPanel=App.getContentPanel();
							var formView=contentPanel.getItem('ProcessNextForm'+exeId);
							if(formView==null){
								formView=new ProcessNextForm(exeId,taskName);
								contentPanel.add(formView);
							}
							contentPanel.activate(formView);
						});
			});

			messageGrid.addListener('rowdblclick', function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							var homeMessageWindow = Ext.getCmp('HomeMessageWindow');
							if(homeMessageWindow != null){
								homeMessageWindow.close();
								new MessageDetail(rec.data.receiveId);
							}else{
								new MessageDetail(rec.data.receiveId);
							}
						});
			});

			var portal = {
					title : '首       页',
					id:'HomeView',
					iconCls:'menu-company',
					style : 'padding:4px 4px 4px 4px;',
					closable : false,
					xtype : 'portal',
					region : 'center',
					margins : '5 5 5 0',
					items : [{
								columnWidth : .33,
								style : 'padding:0 10 10px 0',
								defaults:{
									layout:'fit',
									height:300,
									autoScroll:true,
									tools : tools
								},
								items : [{
											title : '最新公告',
											iconCls:'menu-notice',
											items:[noticeGrid]
										}
										, {
											title : '日程管理',
											iconCls:'menu-cal-plan-view',
											items:[planGrid]
										}]
							}, {
								columnWidth : .33,
								style : 'padding:0 10 10px 0px',
								defaults:{
									layout:'fit',
									height:300,
									autoScroll:true,
									tools : tools
									},
								items : [{
											title : '新闻中心',
											iconCls:'menu-news',
											items:[newsGrid]
										}, {
											title : '我的约会',
											iconCls:'menu-appointment',
											items:[appointmentGrid]
										}]
							}, {
								columnWidth : .33,
								style : 'padding:0 0px 10px 0px',
								defaults:{
									layout:'fit',
									height:300,
									autoScroll:true,
									tools : tools
									},
								items : [{
											title : '个人短信',
											iconCls:'menu-message',
											items:[messageGrid]
										}, {
											title : '待办事项',
											iconCls:'menu-flowWait',
											items:[taskGrid]
										}]
							}]
				}
			return portal;
		}
	};
};
