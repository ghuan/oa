var ProductForm = function(productId) {
	this.productId = productId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ProductFormWin',
				title : '产品详细信息',
				iconCls : 'menu-product',
				width : 500,
				height : 420,
				minWidth:499,
				minHeight:419,
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
						var fp = Ext.getCmp('ProductForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('ProductGrid').getStore()
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

ProductForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
				url : __ctxPath + '/customer/saveProduct.do',
				layout : 'form',
				id : 'ProductForm',
				frame : true,
				defaults : {
					width : 400,
					anchor : '98%,98%'
				},
				formId : 'ProductFormId',
				defaultType : 'textfield',
				items : [{
							name : 'product.productId',
							id : 'productId',
							xtype : 'hidden',
							value : this.productId == null
									? ''
									: this.productId
						}, {
							//fieldLabel : '供应商',
							xtype:'hidden',
							name : 'product.providerId',
							id : 'providerId',
							allowBlank:false,
							blankText:'供应商不能为空!'
						},{
							fieldLabel : '产品名称',
							name : 'product.productName',
							id : 'productName',
							allowBlank:false,
							blankText:'录入时间不能为空!'
						}, {
							fieldLabel : '产品型号',
							name : 'product.productModel',
							id : 'productModel',
							allowBlank:false,
							blankText:'录入时间不能为空!'
						},{
							xtype:'container',
							//id:'custoemrSelect',
							layout:'column',
							defaultType:'label',
							style:'padding-left:0px;',
							height:26,
							items:[{
								text:'供应商*:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							},{
								//fieldLabel : '供应商',
								xtype:'textfield',
								name : 'providerName',
								id : 'providerName',
								width:230,
								allowBlank:false,
								blankText:'供应商不能为空!'
							},{
								xtype:'button',
								//id:'customerSelectButton',
								text:'选择供应商',
								iconCls:'menu-provider',
								handler:function(){
									ProviderSelector.getView(function(providerId,providerName){
										Ext.getCmp('providerId').setValue(providerId);
										Ext.getCmp('providerName').setValue(providerName);
									},true).show();

								}
							}]
						},{
							fieldLabel : '录入时间',
							name : 'product.createtime',
							id : 'createtime',
							format:'Y-m-d',
							xtype:'datefield',
							allowBlank:false,
							blankText:'录入时间不能为空!'
						}, {
							fieldLabel : '产品单位',
							name : 'product.unit',
							id : 'unit'
						}, {
							xtype:'container',
							//id:'custoemrSelect',
							layout:'column',
							defaultType:'label',
							style:'padding-left:0px;',
							height:26,
							items:[{
								text:'成本价*:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							},{
								xtype:'panel',
								html:'<img src="'+__ctxPath+'/images/flag/customer/rmb.png" />：'
							},{
								//fieldLabel : '成本价',
								xtype: 'numberfield',
								width: 308,
								name : 'product.costPrice',
								id : 'costPrice'
							}]
						},{
							xtype:'container',
							//id:'custoemrSelect',
							layout:'column',
							defaultType:'label',
							style:'padding-left:0px;',
							height:26,
							items:[{
								text:'出售价*:',
								width:101,
								style:'padding-left:0px;padding-top:3px;'
							},{
								xtype:'panel',
								html:'<img src="'+__ctxPath+'/images/flag/customer/rmb.png" />：'
							},{
								//fieldLabel : '出售价',
								xtype: 'numberfield',
								width: 308,
								name : 'product.salesPrice',
								id : 'salesPrice'
							}]
						}, {
							fieldLabel : '产品描述',
							name : 'product.productDesc',
							id : 'productDesc',
							xtype:'textarea',
							height:100
						}

				]
			});

	if (this.productId != null && this.productId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getProduct.do?productId='
					+ this.productId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var result = action.result.data;
				var createtime = getDateFromFormat(result.createtime,
						'yyyy-MM-dd HH:mm:ss');
				Ext.getCmp('createtime').setValue(new Date(createtime));
				Ext.getCmp('providerId').setValue(result.provider.providerId);
				Ext.getCmp('providerName').setValue(result.provider.providerName)
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
