var PhoneBookForm = function(phoneId) {
	this.phoneId = phoneId;
	var fp = this.setup();
	var window = new Ext.Window( {
		id : 'PhoneBookFormWin',
		title : '联系人详细信息',
		iconCls:"menu-personal-phoneBook",
		width : 520,
		height : 330,
		modal : true,
//		minWidth : 400,
//		minHeight : 300,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [ this.setup() ],
		buttons : [ {
			text : '保存',
			iconCls:'btn-save',
			handler : function() {
				var fp = Ext.getCmp('PhoneBookForm');
				var phoneGroupSelect=Ext.getCmp('phoneGroupSelect').getValue();
				if(phoneGroupSelect!=null&&phoneGroupSelect!=''&&phoneGroupSelect!='undefined'){
				if (fp.getForm().isValid()) {
					fp.getForm().submit( {
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '成功信息保存！');
							var phoneBookView=new PhoneBookView();
							var store=PhoneBookView.store;
							store.reload( {
								params : {
									start : 0,
									limit : 8
								}
							});	
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
				}else{
				   Ext.ux.Toast.msg('操作提示', '分组不能为空！');
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

PhoneBookForm.prototype.setup = function() {
	var _url = __ctxPath+'/communicate/listPhoneGroup.do?method=1';
	var phoneGroupSelector =  new TreeSelector('phoneGroupSelect',_url,'分组*','groupId');
	var formPanel = new Ext.FormPanel( {
		url : __ctxPath + '/communicate/savePhoneBook.do',
		layout : 'form',
		id : 'PhoneBookForm',
		frame : true,
		formId : 'PhoneBookFormId',
        items: [{
        	     xtype:'hidden',
        	     name:'phoneBook.phoneId',
        	     id:'phoneId'
                },{
                layout: 'column',
                border:false,
                items: [{
                	layout:'form',
                	columnWidth:.6,	
                    items:[phoneGroupSelector,
                    {
                     xtype:'hidden',
                     id:'groupId',
                     allowBlank:false,
                     name:'phoneBook.phoneGroup.groupId'
                    },{
                    xtype:'textfield',
                    fieldLabel: '姓名*',
                    allowBlank:false,
                    width:162,
                    name: 'phoneBook.fullname',
                    id:'fullname'
                },{
                    xtype:'datefield',
                    fieldLabel: '出生时间',
                    name:'phoneBook.birthday',
                    id:'birthday',
                    readOnly : true,
    				format : 'Y-m-d',
    				length : 50,
    				width:162
                
            }]},{
            	layout:'form',
            	columnWidth:.4,
            	items:[
            		{
				fieldLabel : '称谓*',
				xtype : 'combo',
				anchor:'95%',
				allowBlank:false,
				name : 'phoneBook.title',
				id:'title',
				mode : 'local',
				editable : false,
				triggerAction : 'all',
				store : ['先生', '女士']
			},{
           	 xtype : 'combo',
           	 fieldLabel: '是否共享*',
           	 allowBlank:false,
             hiddenName: 'phoneBook.isShared',
             id:'isShared',
             mode : 'local',
			 editable : false,
			 triggerAction : 'all',
			 store : [['0','否'],['1','是']],
             anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '妮称',
                anchor:'95%',
                name: 'phoneBook.nickName',
                id:'nickName'
             }]}]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:170,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'联系方式',
                layout:'form',
                defaults: {width: 300},
                defaultType: 'textfield',
                items: [{
                    fieldLabel: '手机号码',
                    name: 'phoneBook.mobile',
                    id:'mobile'
                },{
                    fieldLabel: '固定电话',
                    name: 'phoneBook.phone',
                    id:'phone'
                },{
                    fieldLabel: 'Email',
                    name: 'phoneBook.email',
                    id:'email'
                }, {
                    fieldLabel: 'QQ',
                    name: 'phoneBook.qqNumber',
                    id:'qqNumber'
                },
                {
                    fieldLabel: 'MSN',
                    name: 'phoneBook.msn',
                    id:'msn'
                }]
            },{
                title:'公司',
                layout:'form',
                defaults: {width: 300},
                defaultType: 'textfield',
                items: [{
                    fieldLabel: '职务',
                    name: 'phoneBook.duty',
                    id:'duty'
                },{
                    fieldLabel: '单位名称',
                    name: 'phoneBook.companyName',
                    id:'companyName'
                },{
                    fieldLabel: '单位地址',
                    name: 'phoneBook.companyAddress',
                    id:'companyAddress'
                },{
                    fieldLabel: '单位电话',
                    name: 'phoneBook.companyPhone',
                    id:'companyPhone'
                },{
                    fieldLabel: '单位传真',
                    name: 'phoneBook.companyFax',
                    id:'companyFax'
                }]
            },{
                title:'家庭',
                layout:'form',
                defaults: {width: 300},
                defaultType: 'textfield',
                items: [{
                    fieldLabel: '家庭住址',
                    name: 'phoneBook.homeAddress',
                    id:'homeAddress'
                },{
                    fieldLabel: '家庭邮编',
                    name: 'phoneBook.homeZip',
                    id:'homeZip'
                },{
                    fieldLabel: '配偶',
                    name: 'phoneBook.spouse',
                    id:'spouse'
                },{
                    fieldLabel: '子女',
                    name: 'phoneBook.childs',
                    id:'childs'
                }]
            },{
                cls:'x-plain',
                title:'备注',
                layout:'fit',
                items: {
                    xtype:'textarea',                    
                    id:'note',
                    fieldLabel:'备注',
                    name:'phoneBook.note'
                }
            }]
        }]
	});

	if (this.phoneId != null && this.phoneId != 'undefined') {
		formPanel.getForm().load(
				{
					deferredRender : false,
					url : __ctxPath + '/communicate/getPhoneBook.do?phoneId='
							+ this.phoneId,
				    method:'post',				    
					waitMsg : '正在载入数据...',
					success : function(form, action) {
					    var birthday=action.result.data.birthday;
                        var birthdayField=Ext.getCmp('birthday');
                        birthdayField.setValue(new Date(getDateFromFormat(birthday, "yyyy-MM-dd HH:mm:ss")));
						
						
						var groupNameField=Ext.getCmp('phoneGroupSelect');
						var groupIdField=Ext.getCmp('groupId');
						var groupName=action.result.data.phoneGroup.groupName;
						var groupId=action.result.data.phoneGroup.groupId;
						if(groupName!=null&&groupId!=null){
							groupNameField.setValue(groupName);
                        	groupIdField.setValue(groupId);
						}
                        
				},
				failure : function(form, action) {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
				});
	}
	return formPanel;

};
