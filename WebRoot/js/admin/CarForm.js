var CarForm = function(carId) {
	this.carId = carId;
	var fp = this.setup();
	var window = new Ext.Window({
		id : 'CarFormWin',
		title : '车辆详细信息',
		iconCls:'menu-car',
		width : 700,
		x:220,
		y:50,
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
						var fp = Ext.getCmp('CarForm');
						if (fp.getForm().isValid()) {
							fp.getForm().submit({
										method : 'post',
										waitMsg : '正在提交数据...',
										success : function(fp, action) {
											Ext.ux.Toast.msg('操作信息', '成功保存信息！');
											Ext.getCmp('CarGrid').getStore()
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

CarForm.prototype.setup = function() {

	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/admin/saveCar.do',
		layout : 'column',
		id : 'CarForm',
		frame : true,
		defaults : {
			widht : 600,
			anchor : '100%,100%'
		},
		border : false,
		formId : 'CarFormId',
		items : [{
					name : 'car.carId',
					id : 'carId',
					xtype : 'hidden',
					value : this.carId == null ? '' : this.carId
				}, {
					name : 'car.cartImage',
					id : 'cartImage',
					xtype : 'hidden'

				}, {
					xtype : 'tabpanel',
					columnWidth : .5,
					plain : true,
					border : false,
					activeTab : 0,
					defaults : {
						bodyStyle : 'padding:10px'
					},
					items : [{
						title : '基本信息',
						layout : 'form',
						frame : true,
						defaults : {
							anchor : '100%,100%'
						},
						defaultType : 'textfield',
						items : [{
									fieldLabel : '车牌号码',
									name : 'car.carNo',
									id : 'carNo',
									allowBlank : false
								}, {
									fieldLabel : '车辆类型',
									name : 'car.carType',
									id : 'carType',
									xtype : 'combo',
									mode : 'local',
									editable : true,
									allowBlank : false,
									triggerAction : 'all',
									store : [['1', '轿车'], ['2', '货车'],
											['3', '商务车']]
								}, {
									fieldLabel : '发动机型号',
									name : 'car.engineNo',
									id : 'engineNo'
								}, {
									fieldLabel : '购买保险时间',
									name : 'car.buyInsureTime',
									id : 'buyInsureTime',
									readOnly : true,
									editable : false,
									xtype : 'datefield',
									format : 'Y-m-d'
								}, {
									fieldLabel : '年审时间',
									name : 'car.auditTime',
									id : 'auditTime',
									readOnly : true,
									editable : false,
									xtype : 'datefield',
									format : 'Y-m-d'
								}, {
									fieldLabel : '厂牌型号',
									name : 'car.factoryModel',
									allowBlank : false,
									id : 'factoryModel'
								}, {
									fieldLabel : '驾驶员',
									name : 'car.driver',
									allowBlank : false,
									id : 'driver'
								}, {
									fieldLabel : '购置日期',
									name : 'car.buyDate',
									id : 'buyDate',
									allowBlank : false,
									editable : false,
									readOnly : true,
									xtype : 'datefield',
									format : 'Y-m-d'
								}, {
									fieldLabel : '当前状态',// 1=可用2=维修中0=报废
									hiddenName : 'car.status',
									id : 'status',
									xtype : 'combo',
									mode : 'local',
									allowBlank : false,
									editable : false,
									readOnly : true,
									triggerAction : 'all',
									store : [['1', '可用'], ['2', '维修中'],
											['0', '已报废']]
								}]
							// }
							// }]
					}, {
						layout : 'fit',
						title : '备注',
						frame : true,
						border : false,
						height:268,
						defaults : {
							anchor : '100%,100%'
						},
						items : [{
									name : 'car.notes',
									xtype : 'textarea',
									anchor : '100%,100%',
									id : 'notes'
								}]
					}]
				}, {
					xtype : 'panel',
					id : 'carImageDisplay',
					frame:false,
					html : '',
					height : 295,
					columnWidth : .5,
					html : '<img src="'
							+ __ctxPath
							+ '/images/default_image_car.jpg" width="100%" height="100%"/>',
					tbar : new Ext.Toolbar({
						width : '100%',
						height : 30,
						items : [{
							text : '上传',
							iconCls : 'btn-upload',
							handler : function() {
								var photo = Ext.getCmp('cartImage');
								var dialog = App.createUploadDialog({
											file_cat : 'admin/car',
											callback : uploadCarPhoto,
											permitted_extensions : ['jpg']
										});
								if (photo.getValue() != ''
										&& photo.getValue() != null
										&& photo.getValue() != 'undefined') {
									var msg = '再次上传需要先删除原有图片,';
									Ext.Msg.confirm('信息确认', msg + '是否删除？',
											function(btn) {
												if (btn == 'yes') {
													// 删除图片
													Ext.Ajax.request({
														url : __ctxPath
																+ '/system/deleteFileAttach.do',
														method : 'post',
														params : {
															filePath : photo.value
														},
														success : function() {
																dialog.show('queryBtn');
//															}
														}
													});
												}
											})
								} else {
									dialog.show('queryBtn');
								}
							}
						}
						 ,
						 {
						 text : '删除',
							iconCls : 'btn-delete',
							handler : function() {
								var photo = Ext.getCmp('cartImage');
								if (photo.value != null && photo.value != ''
										&& photo.value != 'undefined') {
									var msg = '照片一旦删除将不可恢复,';
									Ext.Msg.confirm('确认信息', msg + '是否删除?',
											function(btn) {
												if (btn == 'yes') {
													Ext.Ajax.request({
														url : __ctxPath
																+ '/system/deleteFileAttach.do',
														method : 'post',
														params : {
															filePath : photo.value
														},
														success : function() {
															photo.setValue('');
															var display = Ext.getCmp('carImageDisplay');
															display.body.update('<img src="'+ __ctxPath+ '/images/default_image_car.jpg" width="100%" height="100%" />');														
														}
													});
												}
											});
								}// end if
								else {
									Ext.ux.Toast.msg('提示信息', '您还未增加照片.');
								}

							}
						}
						]
					})

				}

		]
	});

	if (this.carId != null && this.carId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/admin/getCar.do?carId=' + this.carId,
			method : 'post',
			waitMsg : '正在载入数据...',
			success : function(form, action) {
				var buyInsureTime = action.result.data.buyInsureTime;
				var auditTime = action.result.data.auditTime;
				var buyDate = action.result.data.buyDate;
				Ext.getCmp('buyInsureTime').setValue(new Date(getDateFromFormat(buyInsureTime, "yyyy-MM-dd HH:mm:ss")));
				Ext.getCmp('auditTime').setValue(new Date(getDateFromFormat(auditTime, "yyyy-MM-dd HH:mm:ss")));
				Ext.getCmp('buyDate').setValue(new Date(getDateFromFormat(buyDate, "yyyy-MM-dd HH:mm:ss")));
				var carImage = action.result.data.cartImage;
				var carPanel = Ext.getCmp('carImageDisplay');
				if (carImage != null && carImage != ''
						&& carImage != 'undefind' && carPanel.body != null) {
					carPanel.body.update('<img src="' + __ctxPath
							+ '/attachFiles/' + carImage
							+ '"  width="100%" height="100%"/>');
				}
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}

	function uploadCarPhoto(data) {
		var photo = Ext.getCmp('cartImage');
		var display = Ext.getCmp('carImageDisplay');
		photo.setValue(data[0].filepath);
		display.body.update('<img src="' + __ctxPath + '/attachFiles/'
				+ data[0].filepath + '"  width="100%" height="100%"/>');
	};
	return formPanel;

};
