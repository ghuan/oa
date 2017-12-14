var ProDefinitionForm = function(defId,typeId) {
	this.defId = defId;
	this.typeId=typeId;
	var fp = this.setup();
	var window = new Ext.Window({
		id : 'ProDefinitionFormWin',
		title : '流程定义详细信息',
		iconCls:'menu-flowNew',
		width : 500,
		height : 420,
		modal : true,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [this.setup()],
		buttons : [{
			text : '保存',
			iconCls:'btn-save',
			handler : function() {
				var fp = Ext.getCmp('ProDefinitionForm');
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交数据...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('操作信息', '成功信息保存！');
							Ext.getCmp('ProDefinitionGrid').getStore().reload();
							window.close();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show({
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
			iconCls:'btn-cancel',
			text : '取消',
			handler : function() {
				window.close();
			}
		}]
	});
	window.show();
};

ProDefinitionForm.prototype.setup = function() {
	var typeId=this.typeId;
	var _url = __ctxPath + '/flow/listProType.do';
	var typeSelector = new TreeSelector('proTypeTreeSelector', _url, '流程分类','proTypeId');
			
	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/flow/saveProDefinition.do',
				layout : 'form',
				id : 'ProDefinitionForm',
				frame : true,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
				formId : 'ProDefinitionFormId',
				defaultType : 'textfield',
				items : [{
							name : 'proDefinition.defId',
							id : 'defId',
							xtype : 'hidden',
							value : this.defId == null ? '' : this.defId
						}, typeSelector, {
							xtype : 'hidden',
							id : 'proTypeId',
							name : 'proDefinition.proTypeId'
						}, {
							fieldLabel : '流程的名称',
							name : 'proDefinition.name',
							id : 'name'
						}, {
							fieldLabel : '描述',
							xtype:'textarea',
							name : 'proDefinition.description',
							id : 'description'
						}, {
							fieldLabel : '流程定义的XML',
							name : 'proDefinition.defXml',
							id : 'defXml',
							xtype:'textarea',
							height:200
						}
				]
			});
			
			var defId=(this.defId==null || this.defId == 'undefined')?'':this.defId;
			var typeId=(this.typeId==null||this.typeId=='undefined')?'':this.typeId;
			//初次加载用于显示流程分类，若为更新的操作，保存新的xml
			formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/flow/getProDefinition.do?defId='
						+ defId + '&proTypeId='+typeId,
				waitMsg : '正在载入数据...',
				success : function(form, action) {
					
					var proType=action.result.data.proType;
					
					if(proType!=null){
						Ext.getCmp('proTypeTreeSelector').setValue(proType.typeName);
						Ext.getCmp('proTypeId').setValue(proType.typeId);
					}
				},
				failure : function(form, action) {
				}
			});

	return formPanel;

};
