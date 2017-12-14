Ext.ns('PhoneBookView');
/**
 * 联系人列表
 */
var PhoneBookView = function() {

};

PhoneBookView.prototype.getView = function() {
	return new Ext.Panel({
		id : 'PhoneBookView',
		region : 'center',
		title : '联系人列表',
		autoScroll : true,
		border : false,
		items : [new Ext.FormPanel({
			height : 35,
			frame : true,
			id : 'PhoneBookSearchForm',
			layout : 'column',
			defaults : {
				xtype : 'label'
			},
			items : [{
						text : '请输入查询条件:'
					}, {
						text : '姓名'
					}, {
						xtype : 'textfield',
						name : 'Q_fullname_S_LK'
					}, {
						text : '称谓'
					}, {
						xtype : 'textfield',
						name : 'Q_title_S_LK',
						xtype : 'combo',
						anchor : '95%',
						mode : 'local',
						triggerAction : 'all',
						store : ['先生', '女士']
					}, {
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PhoneBookSearchForm');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查询',
									url : __ctxPath
											+ '/communicate/listPhoneBook.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										PhoneBookView.store.loadData(result);
									}
								});
							}

						}
					}]
		}), this.setup()]
	});
};

PhoneBookView.prototype.setPhoneId = function(phoneId) {
	this.phoneId = phoneId;
	PhoneBookView.phoneId = phoneId;
};

PhoneBookView.prototype.getPhoneId = function() {
	return this.phoneId;
};
/**
 * 建立视图
 */
PhoneBookView.prototype.setup = function() {
	return this.panel();
};

/**
 * 建立DataPanel
 */
PhoneBookView.prototype.panel = function() {

	var store = this.getStore();
	store.on('load', AJAX_Loaded, store, true);
	store.load({
				params : {
					start : 0,
					limit : 8
				}
			});
	var phoneBookPanel = new Ext.Panel({
				id : 'phoneBookView',
				closable : true,
				tbar : this.topbar(),
				bodyStyle : 'padding-top:10px;',
				autoHeight : true,
				// title : '联系人详细信息',
				layout : 'column',
				bbar : new Ext.PagingToolbar({
							pageSize : 8,
							store : store,
							displayInfo : true,
							displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
							emptyMsg : "当前没有记录"
						}),

				defaults : {
					// 应用到每个包含的panel
					bodyStyle : 'padding:15px'
				},
				layoutConfig : {
					// layout-specific configs go here
					titleCollapse : false,
					animate : true,
					activeOnTop : true,
					region : 'center',
					margins : '35 5 5 0'
				},
				items : []
			});

	return phoneBookPanel;
};

function AJAX_Loaded(store) {
	var phoneBookPanel = Ext.getCmp('phoneBookView');
	phoneBookPanel.removeAll();
	for (var i = 0; i < store.getCount(); i++) {
		var rec = store.getAt(i);
		idd = rec.get("phoneId");
		var nickName = rec.get("nickName");
		var name = rec.get("fullname");
		var mobile = rec.get("mobile");
		var email = rec.get("email");
		var qq = rec.get("qqNumber");
		var handlerWrapper = function(button, event, idd) {
			// Fetch additional data
		};
		panel = new Ext.Panel({
					id : '_pId' + idd,
					title : '' + name,
					columnWidth : .25,
					height : 150,
					style : 'padding-bottom:10px;',
					draggable : true,
					bodyStyle : '',
					width : 160,
					html : '<p>姓名：' + name + '</p><p>手机：' + mobile
							+ '</p><p>Email:' + email + '</p><p>qq:' + qq
							+ '</p>',
					bbar : [new Ext.Toolbar.TextItem(''), {
								xtype : "button"
							}, {
								pressed : true,
								text : '编辑',
								iconCls : 'btn-edit',
								handler : edit.createDelegate(this, [idd])
							}, {
								xtype : "button"
							}, {
								pressed : true,
								text : '删除',
								iconCls : 'btn-del',
								handler : remove.createDelegate(this, [idd])
							}]
				});
		phoneBookPanel.add(panel);
		phoneBookPanel.doLayout();

	}
}

var edit = function(phoneId) {
	PhoneBookView.edit(phoneId);
};

var remove = function(phoneId) {
	PhoneBookView.remove(phoneId);
}
/**
 * 初始化数据
 */
PhoneBookView.prototype.getStore = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/communicate/listPhoneBook.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'phoneId',
										type : 'int'
									}

									, 'fullname', 'title', 'birthday',
									'nickName', 'duty', 'spouse', 'childs',
									'companyName', 'companyAddress',
									'companyPhone', 'companyFax',
									'homeAddress', 'homeZip', 'mobile',
									'phone', 'email', 'qqNumber', 'msn',
									'note', 'userId', 'groupId', 'isShared']
						}),
				remoteSort : true
			});
	store.setDefaultSort('phoneId', 'desc');
	PhoneBookView.store = store;
	return store;
};

/**
 * 建立操作的Toolbar
 */
PhoneBookView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'PhoneBookFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : [{
							iconCls : 'btn-add',
							xtype : 'button',
							text : '添加联系人',
							handler : function() {
								new PhoneBookForm();
							}
						}]
			});

	return toolbar;
};

/**
 * 删除单个记录
 */
PhoneBookView.remove = function(id) {
	Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath
										+ '/communicate/multiDelPhoneBook.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
									PhoneBookView.store.reload({
												params : {
													start : 0,
													limit : 8
												}
											});
								}
							});
				}
			});
};

/**
 * 
 */
PhoneBookView.edit = function(id) {
	new PhoneBookForm(id);
}
