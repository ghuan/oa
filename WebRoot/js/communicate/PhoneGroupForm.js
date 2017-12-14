var PhoneGroupForm = function(groupId) {
	this.groupId = groupId;
	var fp = this.setup();
	var window = new Ext.Window( {
		id : 'PhoneGroupFormWin',
		title : '通讯分组详细信息',
		iconCls:'menu-phonebook',
		width : 300,
		height : 170,
		modal : true,
		minWidth : 280,
		minHeight : 160,
		layout : 'form',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [ this.setup() ],
		buttons : [ {
			text : '保存',
			iconCls:'btn-save',
			handler : function() {
				var fp = Ext.getCmp('PhoneGroupForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit( {
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '成功信息保存！');
							var phoneGroupTree=Ext.getCmp('leftBookPanel');
							if(phoneGroupTree!=null){
								phoneGroupTree.root.reload();
							}
							window.close();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show( {
								title : '操作信息',
								msg : '信息保存出错，请联系管理员！',
								buttons : Ext.MessageBox.OK,
								icon : 'ext-mb-error'
							});
							window.close();
						}
					});
				}
			}
		}, {
			text : '取消',
			iconCls:'btn-cancel',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();
};

PhoneGroupForm.prototype.setup = function() {
	var formPanel = new Ext.FormPanel( {
		url : __ctxPath + '/communicate/savePhoneGroup.do',
		layout : 'form',
		id : 'PhoneGroupForm',
		frame : true,
		formId : 'PhoneGroupFormId',
		defaultType : 'textfield',
		items : [ {
			name : 'phoneGroup.groupId',
			id : 'groupId',
			xtype : 'hidden',
			value : this.groupId == null ? '' : this.groupId
		}, {
			fieldLabel : '分组名称',
			name : 'phoneGroup.groupName',
			id : 'groupName',
			width:140,
			allowBlank :false
		}, {
           	 xtype : 'combo',
           	 fieldLabel: '是否共享*',
             hiddenName: 'phoneGroup.isShared',
             id:'isShared',
             mode : 'local',
			 editable : false,
			 allowBlank :false,
			 triggerAction : 'all',
			 store : [['1','是'],['0','否']],
			 width:80
            }, {
            xtype:'hidden',
			name : 'phoneGroup.sn',
			id : 'sn',
			width:80
		}]
	});

	if (this.groupId!=null && this.groupId != 'undefined') {
		formPanel.getForm().load(
				{
					deferredRender : false,
					url : __ctxPath + '/communicate/getPhoneGroup.do?groupId='
							+ this.groupId,
					method:'post',
					waitMsg : '正在载入数据...',
					success : function(form, action) {
				},
				failure : function(form, action) {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
				});
	}
	return formPanel;

};
