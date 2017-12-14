var FixedAssetsForm = function(assetsId) {
	this.assetsId = assetsId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'FixedAssetsFormWin',
				title : '固定资产详细信息(*为必填)',
				width : 420,
				iconCls:'menu-assets',
				// height : 430,
				x:250,
				y:80,
				autoHeight : true,
				shadow : false,
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
						var fp = Ext.getCmp('FixedAssetsForm');
						var method=Ext.getCmp('calDepreMethod').getValue();
						var flag=false;
						if(method!=''&&method!=null&&method!='undefind'){
							if(method==2){
							   var intendWorkGross=Ext.getCmp('intendWorkGross').getValue();
							   var workGrossUnit=Ext.getCmp('workGrossUnit').getValue();
							   if(intendWorkGross!=null&&intendWorkGross!='undefind'&&intendWorkGross!=''&&workGrossUnit!=null&&workGrossUnit!='undefind'&&workGrossUnit!=''){
							        flag=true;
							   }						  
							}else{							   
							    var intendTerm=Ext.getCmp('intendTerm').getValue();
							    if(intendTerm!=null&&intendTerm!='undefind'&&intendTerm!=''){
							        flag=true
							    }
							}
						
						if (fp.getForm().isValid()&&flag) {
							fp.getForm().submit({
								method : 'post',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									Ext.getCmp('FixedAssetsGrid').getStore()
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
						}else{
						   Ext.ux.Toast.msg('操作信息', '带*项为必填！！');
						  
						}
						
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

FixedAssetsForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/admin/saveFixedAssets.do',
		layout : 'form',
		id : 'FixedAssetsForm',
		frame : true,
		// defaults : {
		// width : 200,
		// anchor : '100%,100%',
		// },
		formId : 'FixedAssetsFormId',
		defaultType : 'textfield',
		items : [{
					name : 'fixedAssets.assetsId',
					id : 'assetsId',
					xtype : 'hidden',
					value : this.assetsId == null ? '' : this.assetsId
				}, {
					name : 'fixedAssets.depreRate',
					id : 'depreRate',
					xtype : 'hidden'
				},{
				    name:'calDepreMethod',
				    id:'calDepreMethod',
				    xtype:'hidden'
				
				} ,{
					fieldLabel : '资产名称*',
					name : 'fixedAssets.assetsName',
					id : 'assetsName',
					anchor : '95.5%',
					allowBlank : false
				}, {
					xtype : 'container',
					layout : 'column',
					id : 'assetsNoContainer',
					style : 'padding-left:0px;padding-bottom:3px;',
					items : [{
								xtype : 'label',
								style : 'padding-left:0px;padding-top:3px;',
								text : '资产编号:',
								width : 101
							}, {
								xtype : 'textfield',
								name : 'fixedAssets.assetsNo',
								id : 'assetsNo',
								readOnly : true,
								width : 248
							}]
				}, {
					fieldLabel : '资产类别*',
					hiddenName : 'fixedAssets.assetsType.assetsTypeId',
					id : 'assetsTypeId',
					xtype : 'combo',
					mode : 'local',
					anchor : '95.5%',
					allowBlank : false,
					editable : false,
					valueField : 'id',
					displayField : 'name',
					readOnly : true,
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
								url : __ctxPath + '/admin/comboxAssetsType.do',
								fields : ['id', 'name']
							})
				}, {
					fieldLabel : '置办日期*',
					name : 'fixedAssets.buyDate',
					id : 'buyDate',
					format : 'Y-m-d',
					xtype : 'datefield',
					allowBlank : false,
					editable : false,
					anchor : '95.5%',
					readOnly : true
				}, {
					layout : 'column',
					style : 'padding-left:0px;padding-bottom:3px;',
					xtype : 'container',
					items : [{
								xtype : 'label',
								text : '所属部门*:',
								style : 'padding-left:0px;padding-top:3px;',
								width : 101

							}, {
								xtype : 'textfield',
								name : 'fixedAssets.beDep',
								id : 'beDep',
								allowBlank : false,
								readOnly : true,
								width : 108
							}, {
								xtype : 'button',
								iconCls : 'btn-dep-sel',
								text : '选择部门',
								handler : function() {
									DepSelector.getView(function(id, name) {
												Ext.getCmp('beDep')
														.setValue(name);
											}, true).show();
								}
							}, {
								xtype : 'button',
								text : '清除记录',
							    iconCls:'reset',
								handler : function() {
									Ext.getCmp('beDep').setValue('');
								}
							}]
				}, {
					layout : 'column',
					style : 'padding-left:0px;padding-bottom:3px;',
					xtype : 'container',
					items : [{
								xtype : 'label',
								text : '保管人:',
								style : 'padding-left:0px;padding-top:3px;',
								width : 101

							}, {
								xtype : 'textfield',
								name : 'fixedAssets.custodian',
								id : 'custodian',
								readOnly : true,
								width : 108
							}, {
								xtype : 'button',
								iconCls : 'btn-user-sel',
								text : '选择人员',
								handler : function() {
									UserSelector.getView(function(id, name) {
												Ext.getCmp('custodian')
														.setValue(name);
											}, true).show();
								}
							}, {
								xtype : 'button',
								text : '清除记录',
								iconCls:'reset',
								handler : function() {
									Ext.getCmp('custodian').setValue('');
								}
							}]
				}, {
					xtype : 'tabpanel',
					height : 220,
					plain : true,
					border : false,
					activeTab : 0,
					items : [{
						layout : 'form',
						id : 'deprePanel',
						title : '折旧信息',
						frame : true,
						height : 190,
						defaults : {
							anchor : '98%,98%'
						},
						defaultType : 'textfield',
						items : [{
							fieldLabel : '折旧类型*',
							hiddenName : 'fixedAssets.depreType.depreTypeId',
							id : 'depreTypeId',
							xtype : 'combo',
							mode : 'local',
							allowBlank : false,
							editable : false,
							valueField : 'id',
							displayField : 'name',
							readOnly : true,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
										url : __ctxPath
												+ '/admin/comboxDepreType.do',
										fields : ['id', 'name', 'method']
									}),
							listeners : {
								select : function(combo, record, index) {
									var method = record.data.method;
									if (method == '2') {
										Ext.getCmp('calDepreMethod').setValue(method);
										Ext.getCmp('WorkGrossPanel').show();
										Ext.getCmp('intendTermContainer')
												.hide();
                                        Ext.getCmp('intendTerm').setValue('');
									} else {
										Ext.getCmp('calDepreMethod').setValue(method);
										Ext.getCmp('intendTermContainer').show();
										Ext.getCmp('WorkGrossPanel').hide();
										Ext.getCmp('intendWorkGross').setValue('');
										Ext.getCmp('workGrossUnit').setValue('');
										Ext.getCmp('defPerWorkGross').setValue('');
									}
								}
							}
						}, {
							fieldLabel : '开始折旧日期',
							name : 'fixedAssets.startDepre',
							id : 'startDepre',
							format : 'Y-m-d',
							xtype : 'datefield',
							editable : false,
							readOnly : true
						}, {
							layout : 'column',
							xtype : 'container',
							style : 'padding-left:0px;padding-bottom:3px;',
							id : 'intendTermContainer',
							items : [{
										xtype : 'label',
										style : 'padding-left:0px;',
										text : '预计使用年限*:',
										width : 101
									}, {
										xtype : 'numberfield',
										name : 'fixedAssets.intendTerm',
										allowNegative:false,
										allowDecimals:false,
										id : 'intendTerm',
										
										width : 230
									}, {
										xtype : 'label',
										text : '年',
										width : 10
									}]
						}, {
							layout : 'form',
							xtype : 'container',
							id : 'WorkGrossPanel',
							items : [{
								layout : 'column',
								xtype : 'container',
								style : 'padding-left:0px;padding-bottom:3px;',
								defaults : {
									anchor : '100%,100%'
								},
								items : [{
											xtype : 'label',
											text : '预使用总工作量*:',
											style : 'padding-left:0px;',
											width : 101
										}, {
											xtype : 'numberfield',
											name : 'fixedAssets.intendWorkGross',
											allowNegative:false,
											id : 'intendWorkGross'
										}, {
											xtype : 'label',
											text : '单位*:'
										}, {
											xtype : 'textfield',
											name : 'fixedAssets.workGrossUnit',
											id : 'workGrossUnit',
											width : 30
										}]

							}, {
								fieldLabel : '默认周期工作量',
								xtype : 'numberfield',
								allowNegative:false,
								name : 'fixedAssets.defPerWorkGross',
								id : 'defPerWorkGross'
							}]
						}, {
							layout : 'column',
							style : 'padding-left:0px;padding-bottom:3px;',
							xtype : 'container',
							items : [{
										xtype : 'label',
										text : '残值率*',
										style : 'padding-left:0px;padding-top:3px;',
										width : 101
									}, {
										xtype : 'numberfield',
										name : 'fixedAssets.remainValRate',
										allowNegative:false,
										decimalPrecision:2,
										id : 'remainValRate',
										width : 230,
										allowBlank : false
									}, {
										xtype : 'label',
										text : '%',
										width : 10
									}]
						}, {
							fieldLabel : '资产值*',
							name : 'fixedAssets.assetValue',
							id : 'assetValue',
							allowBlank : false,
							allowNegative:false,
							decimalPrecision:2,
							xtype:'numberfield'
						}, {
							fieldLabel : '资产当前值*',
							name : 'fixedAssets.assetCurValue',
							id : 'assetCurValue',
							allowBlank : false,
							allowNegative:false,
							decimalPrecision:2,
							xtype:'numberfield'
						}]

					}, {
						layout : 'form',
						title : '扩展信息',
						width : 300,
						id : 'assetsFormPanel',
						height : 190,
						frame : true,
						defaults : {
							anchor : '98%,98%'
						},
						defaultType : 'textfield',
						items : [{
									fieldLabel : '规格型号',
									name : 'fixedAssets.model',
									id : 'model'
								}, {
									fieldLabel : '制造厂商',
									name : 'fixedAssets.manufacturer',
									id : 'manufacturer'
								}, {
									fieldLabel : '出厂日期',
									name : 'fixedAssets.manuDate',
									format : 'Y-m-d',
									id : 'manuDate',
									xtype : 'datefield'
								}, {
									fieldLabel : '备注',
									name : 'fixedAssets.notes',
									id : 'notes',
									height : 100,
									xtype : 'textarea'
								}]
					}]

				}

		]
	});

	if (this.assetsId != null && this.assetsId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getFixedAssets.do?assetsId='
					+ this.assetsId,
//			method : 'post',
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var method = action.result.data.depreType.calMethod;
				if (method == '2') {
					
					Ext.getCmp('calDepreMethod').setValue(method);
					Ext.getCmp('WorkGrossPanel').show();
					Ext.getCmp('intendTermContainer').hide();
				} else {
					Ext.getCmp('calDepreMethod').setValue(method);
					Ext.getCmp('WorkGrossPanel').hide();
					Ext.getCmp('intendTermContainer').show();
				}
				Ext.getCmp('buyDate').setValue(new Date(getDateFromFormat(
						action.result.data.buyDate, "yyyy-MM-dd HH:mm:ss")));
				Ext.getCmp('startDepre').setValue(new Date(getDateFromFormat(
						action.result.data.startDepre, "yyyy-MM-dd HH:mm:ss")));
				var manuDate = action.result.data.manuDate;
				if (manuDate != null) {
					Ext.getCmp('manuDate').setValue(new Date(getDateFromFormat(
							manuDate, "yyyy-MM-dd HH:mm:ss")));
				}
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;

};
