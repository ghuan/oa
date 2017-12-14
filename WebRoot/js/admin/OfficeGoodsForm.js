var OfficeGoodsForm = function(goodsId) {
	this.goodsId = goodsId;
	var fp = this.setup();
	var window = new Ext.Window({
		id : 'OfficeGoodsFormWin',
		title : '办公用品详细信息',
		iconCls:'menu-goods',
		width : 540,
		autoHeight : true,
		modal : true,
		shadow : false,
		layout : 'anchor',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'center',
		items : [this.setup()],
		buttons : [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp('OfficeGoodsForm');
				if(Ext.getCmp('stockCounts')!=null){
				var newStockCounts = Ext.getCmp('stockCounts').getValue();
				var counts = Ext.getCmp('counts').getValue();
				}
				var goodsTypeSelect=Ext.getCmp('goodsTypeSelect').getValue();
				if(goodsTypeSelect!=null&&goodsTypeSelect!=''&&goodsTypeSelect!='undefined'){
				if (newStockCounts != counts) {
					Ext.Msg.confirm('操作信息', '你已经修改了库存，是否继续保存?', function(btn) {
						if (btn == 'yes') {
							if (fp.getForm().isValid()) {
								fp.getForm().submit({
									method : 'post',
									waitMsg : '正在提交数据...',
									success : function(fp, action) {
										Ext.ux.Toast.msg('操作信息', '成功保存信息！');
										Ext.getCmp('OfficeGoodsGrid')
												.getStore().reload();
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
					});
				} else {
					if (fp.getForm().isValid()) {
						fp.getForm().submit({
							method : 'post',
							waitMsg : '正在提交数据...',
							success : function(fp, action) {
								Ext.ux.Toast.msg('操作信息', '成功保存信息！');
								Ext.getCmp('OfficeGoodsGrid').getStore()
										.reload();
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
				}else{
				    Ext.ux.Toast.msg('操作信息', '分类不能为空！');
				
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

OfficeGoodsForm.prototype.setup = function() {
	var _url = __ctxPath + '/admin/treeOfficeGoodsType.do?method=1';
	var goodsTypeSelector = new TreeSelector('goodsTypeSelect', _url, '所属分类',
			'typeId');

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/admin/saveOfficeGoods.do',
		id : 'OfficeGoodsForm',
		frame : true,
		defaults : {
			widht : 500
		},
		formId : 'OfficeGoodsFormId',
		items : [{
					name : 'officeGoods.goodsId',
					id : 'goodsId',
					xtype : 'hidden',
					value : this.goodsId == null ? '' : this.goodsId
				}, {
					name : 'officeGoods.officeGoodsType.typeId',
					id : 'typeId',
					xtype : 'hidden'
				}, {
					layout : 'column',
					xtype : 'fieldset',
					style : 'padding:0px',
					border : false,
					items : [{
								layout : 'form',
								columnWidth : .6,
								defaultType : 'textfield',
								id : 'OfficeGoodsFormItems',
								items : [goodsTypeSelector, {
											fieldLabel : '物品名称',
											name : 'officeGoods.goodsName',
											id : 'goodsName',
											allowBlank:false,
											// anchor:'95%'
											width : 168
										}, {
											fieldLabel : '编号',
											name : 'officeGoods.goodsNo',
											id : 'goodsNo',
											width : 168,
											allowBlank:false,
											readOnly : true
										}, {
											fieldLabel : '规格',
											name : 'officeGoods.specifications',
											id : 'specifications',
											allowBlank:false,
											width : 168
										}]
							}, {
								layout : 'form',
								columnWidth : .4,
								id : 'OfficeGoodsFormS',
								defaultType : 'textfield',
								items : [{
											fieldLabel : '计量单位',
											name : 'officeGoods.unit',
											id : 'unit',
											allowBlank:false,
											anchor : '95%'
										}, {
											fieldLabel : '库存总数',
											name : 'officeGoods.stockCounts',
											id : 'stockCounts',
											xtype:'numberfield',
											allowBlank:false,
											anchor : '95%'
										}, {
											name : 'counts',
											id : 'counts',
											xtype : 'hidden'
										}, {
											fieldLabel : '是否启用库存警示',
											xtype : 'combo',
											anchor : '95%',
											allowBlank : false,
											hiddenName : 'officeGoods.isWarning',
											id : 'isWarning',
											mode : 'local',
											editable : false,
											triggerAction : 'all',
											store : [['0', '否'], ['1', '是']],
											value : 0
										}, {
											fieldLabel : '警报库存数',
											name : 'officeGoods.warnCounts',
											id : 'warnCounts',
											allowBlank:false,
											xtype:'numberfield',
											anchor : '95%'
										}]
							}]
				},{ xtype:'container',
				    style : 'margin-left:4px;pading-top:0px;',
					layout : 'form',
					items : [{
						        fieldLabel : '备注',
								name : 'officeGoods.notes',
								id : 'notes',
								xtype : 'textarea',
								width : 378
							}]
				}

		]
	});

	if (this.goodsId != null && this.goodsId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getOfficeGoods.do?goodsId='
					+ this.goodsId,
			method : 'post',
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var goodsTypeId = Ext.getCmp('typeId');
				var goodsTypeName = Ext.getCmp('goodsTypeSelect');
				var typeId = action.result.data.officeGoodsType.typeId;
				var typeName = action.result.data.officeGoodsType.typeName;
				goodsTypeId.setValue(typeId);
				goodsTypeName.setValue(typeName);
				var counts = action.result.data.stockCounts;
				var countsField = Ext.getCmp('counts');
				countsField.setValue(counts);
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
