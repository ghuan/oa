var DictionaryForm = function(dicId) {
	this.dicId = dicId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'DictionaryFormWin',
				iconCls : 'menu-dictionary',
				title : '字典详细信息',
				width : 380,
				height : 220,
				modal : true,
				layout : 'anchor',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var fp = Ext.getCmp('DictionaryForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('DictionaryGrid').getStore()
											.reload();
									window.close();
								},
								failure : function(fp, action) {
									Ext.MessageBox.show({
												title : '操作信息',
												msg : '信息保存出错，请联系管理员！',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
									window.close();
								}
							});
						}
					}
				}, {
					text : '取消',
					iconCls : 'btn-cancel',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();
};

DictionaryForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/system/saveDictionary.do',
		layout : 'form',
		id : 'DictionaryForm',
		frame : true,
		defaults : {
			width : 300,
			anchor : '98%,98%',
			labelWidth : 60
		},
		formId : 'DictionaryFormId',
		defaultType : 'textfield',
		items : [{
					name : 'dictionary.dicId',
					id : 'dicId',
					xtype : 'hidden',
					value : this.dicId == null ? '' : this.dicId
				}, {
					fieldLabel : '条目',
					name : 'dictionary.itemName',
					id : 'itemName',
					maxHeight : 200,
					xtype : 'combo',
					mode : 'local',
					editable : true,
					triggerAction : 'all',
					store : [],
					listeners : {
						focus : function(combo) {
							var _store = Ext.getCmp('itemName').getStore();
							if (_store.getCount() <= 0)
								Ext.Ajax.request({
											url : __ctxPath
													+ '/system/itemsDictionary.do',
											method : 'post',
											success : function(response) {
												var result = Ext.util.JSON
														.decode(response.responseText);
												_store.loadData(result);
											}
										});
						}
					}
				}, {
					fieldLabel : '数值',
					name : 'dictionary.itemValue',
					id : 'itemValue'
				}, {
					fieldLabel : '备注',
					name : 'dictionary.descp',
					id : 'descp',
					xtype : 'textarea'
				}

		]
	});

	if (this.dicId != null && this.dicId != 'undefined') {
		formPanel.getForm().load({
					deferredRender : false,
					url : __ctxPath + '/system/getDictionary.do?dicId='
							+ this.dicId,
					waitMsg : '正在载入数据...',
					success : function(form, action) {
						// Ext.Msg.alert('编辑', '载入成功！');
					},
					failure : function(form, action) {
						// Ext.Msg.alert('编辑', '载入失败');
					}
				});
	}
	return formPanel;

};
