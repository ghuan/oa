var ContractForm = function(contractId) {
	this.contractId = contractId;
	var fp = this.setup();
	var window = new Ext.Window({
				id : 'ContractFormWin',
				title : '合同详细信息',
				iconCls : 'menu-contract',
				x : 100,
				y : 10,
				modal : true,
				autoWidth : true,
				autoHeight : true,
				layout : 'anchor',
				border:false,
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : [this.setup()],
				buttons : [{
							text : '保存',
							iconCls : 'btn-save',
							handler : function() {
								ContractForm.saveContract();
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

ContractForm.prototype.setup = function() {
	var _url = __ctxPath + '/system/listDepartment.do';
	var serviceDepSelector = new TreeSelector('serviceDepSelector', _url,
			'维护部门', null);
	serviceDepSelector.addListener('change', function() {
				Ext.getCmp('serviceDep')
						.setValue(serviceDepSelector.getValue());
			});
	var configGrid = new ContractConfigView();
	var formPanel = new Ext.FormPanel({
		url : __ctxPath + '/customer/saveContract.do',
		layout : 'table',
		border:false,
		layoutConfig : {
			columns : 2
		},
		id : 'ContractForm',
		frame : true,
		autoWidth : true,
		autoHeight : true,
		formId : 'ContractFormId',
		defaultType : 'textfield',
		items : [{
			xtype : 'fieldset',
			title : '合同信息(带 * 号为必填)',
			layout : 'form',
			rowspan : 2,
			labelWidth : 60,
			defaultType : 'textfield',
			autoWidth : true,
			autoHeight : true,
			defaults : {
				width : 280
			},
			items : [{
						name : 'contract.contractId',
						id : 'contractId',
						xtype : 'hidden',
						value : this.contractId == null ? '' : this.contractId
					}, {
						fieldLabel : '合同编号*',
						name : 'contract.contractNo',
						id : 'contractNo',
						allowBlank:false,
						blankText:'合同编号不可为空!'
					}, {
						fieldLabel : '合同标题*',
						name : 'contract.subject',
						id : 'subject',
						allowBlank:false,
						blankText:'合同标题不可为空!'
					}, {
						xtype : 'container',
						layout : 'column',
						height : 26,
						autoWidth : true,
						style : 'padding-left:0px;padding-bottom:0px',
						defaultType : 'label',
						items : [{
									text : '合同金额*:',
									width : 61,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									xtype : 'numberfield',
									width : 250,
									name : 'contract.contractAmount',
									id : 'contractAmount',
									allowBlank:false,
									blankText:'合同金额不可为空!'
								}, {
									text : '元',
									width : 10,
									style : 'padding-left:0px;padding-top:3px;'
								}]
					}, {
						fieldLabel : '主要条款',
						xtype : 'textarea',
						name : 'contract.mainItem',
						id : 'mainItem'
					}, {
						fieldLabel : '售后条款',
						xtype : 'textarea',
						name : 'contract.salesAfterItem',
						id : 'salesAfterItem'
					},{
						xtype : 'container',
						height : 26,
						layout : 'column',
						autoWidth : true,
						defaultType : 'label',
						style : 'padding-left:0px;',
						items : [{
									text : '有效日期*:',
									width : 60,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									// fieldLabel : '有效日期',
									xtype : 'datefield',
									width : 110,
									format : 'Y-m-d',
									readOnly : true,
									name : 'contract.validDate',
									id : 'validDate',
									allowBlank:false,
									blankText:'合同生效日期不可为空!'
								}, {
									text : '至',
									width : 10,
									style : 'padding-left:0px;padding-top:3px;'
								}, {
									// fieldLabel : '有效期',
									xtype : 'datefield',
									width : 110,
									format : 'Y-m-d',
									readOnly : true,
									name : 'contract.expireDate',
									id : 'expireDate',
									allowBlank:false,
									blankText:'合同到期日期不可为空!'
								}]
					}, {
						xtype : 'container',
						layout : 'column',
						height : 26,
						autoWidth : true,
						style : 'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '签约人*:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 61
								}, {
									xtype : 'textfield',
									width : 180,
									readOnly : true,
									name : 'contract.signupUser',
									id : 'signupUser',
									allowBlank:false,
									blankText:'签约人不可为空!'
								}, {
									xtype : 'button',
									text : '签约人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													Ext
															.getCmp('signupUser')
															.setValue(fullnames);
												}, true).show();
									}
								}]
					}, {
						fieldLabel : '签约时间',
						xtype : 'datefield',
						format : 'Y-m-d',
						readOnly : true,
						name : 'contract.signupTime',
						id : 'signupTime',
						allowBlank:false,
						blankText:'签约时间不可为空!'
					},{
						fieldLabel : '维护部门',// 本公司的部门
						name : 'contract.serviceDep',
						xtype : 'hidden',
						id : 'serviceDep'
					}, serviceDepSelector,// 下拉树选择部门
					{
						xtype : 'container',
						layout : 'column',
						height : 26,
						autoWidth : true,
						style : 'padding-left:0px;',
						items : [{
									xtype : 'label',
									text : '维护人:',
									style : 'padding-left:0px;padding-top:3px;',
									width : 61
								}, {
									xtype : 'textfield',
									width : 180,
									readOnly : true,
									name : 'contract.serviceMan',
									id : 'serviceMan'
								}, {
									xtype : 'button',
									text : '维护人',
									iconCls : 'btn-mail_recipient',
									handler : function() {
										UserSelector.getView(
												function(userIds, fullnames) {
													Ext
															.getCmp('serviceMan')
															.setValue(fullnames);
												}, true).show();
									}
								}]
					},{
						xtype : 'container',
						autoHeight : true,
						layout : 'column',
						autoWidth : true,
						defaultType : 'label',
						style : 'padding-left:0px;',
						items : [{
									text : '合同附件:',
									width : 61,
									style : 'padding-left:0px;padding-top:3px;'
								},{
									xtype : 'hidden',
									name : 'contractAttachIDs',
									id : 'contractAttachIDs'
								},{
									xtype : 'panel',
									id:'displayContractAttach',
									width : 215,
									height: 65,
									frame:true,
									autoScroll:true,
									style : 'padding-left:0px;padding-top:0px;',
									html : ''
								},{
									xtype : 'button',
									iconCls : 'btn-upload',
									text : '上传',
									handler : function() {
										var dialog = App.createUploadDialog({
																file_cat : 'csutomer/contract',
																callback : uploadContractAttach
															});
											dialog.show('queryBtn');
									}
								}]
					}]
		}, {
			xtype : 'fieldset',
			title : '项目信息',
			layout : 'form',
			labelWidth : 55,
			width : 380,
			autoHeight : true,
			style : 'padding-bottom:0px;bottom:0px;',
			defaultType : 'textfield',
			items : [{
						fieldLabel : '所属项目',// 项目选择器
						xtype : 'hidden',
						name : 'contract.projectId',
						id : 'projectId'
					}, {
						xtype : 'button',
						iconCls : 'menu-project',
						text : '选择项目',
						handler : function() {
							ProjectSelector.getView(
											function(projectId, projectName,
													projectNo) {
												Ext.getCmp('projectId')
														.setValue(projectId);
												ContractForm.getProject(projectId);
											}, true).show();
						}
					}, {
						xtype : 'panel',
						id : 'ProjectDisplay',
						autoWidth : true,
						height : 135,
						autoScroll : true,
						html : '项目编号: <br> 项目名称: <br> 所属客户: <br>'
								+ '联系人员: <br> 项目描述: <br>'
					}]
		}, {
			xtype : 'fieldset',
			title : '配置单',
			layout : 'form',
			width : 380,
			style : 'padding-top:0px;top:0px;',
			autoHeight : true,
			// height : 150,
			labelWidth : 58,
			defaultType : 'textfield',
			items : [{
						fieldLabel : '收货地址',
						name : 'contract.consignAddress',
						id : 'consignAddress',
						width : 280
					}, {
						fieldLabel : '收货人',
						name : 'contract.consignee',
						id : 'consignee',
						width : 280
					}, configGrid]
		}

		]
	});

	if (this.contractId != null && this.contractId != 'undefined') {
		formPanel.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/customer/getContract.do?contractId='
					+ this.contractId,
			waitMsg : '正在载入数据...',
			success : function(form, action) {

				var result = action.result.data;
				var validDate = getDateFromFormat(result.validDate,
						'yyyy-MM-dd HH:mm:ss');
				var expireDate = getDateFromFormat(result.expireDate,
						'yyyy-MM-dd HH:mm:ss');
				var signupTime = getDateFromFormat(result.signupTime,
						'yyyy-MM-dd HH:mm:ss');
				Ext.getCmp('validDate').setValue(new Date(validDate));
				Ext.getCmp('expireDate').setValue(new Date(expireDate));
				Ext.getCmp('signupTime').setValue(new Date(signupTime));
				Ext.getCmp('serviceDepSelector').setValue(result.serviceDep);
				Ext.getCmp('projectId').setValue(action.result.projectId);
				ContractForm.getProject(action.result.projectId);
				var contractId = Ext.getCmp('contractId').value;
				if (contractId != null && contractId != ''
						&& contractId != 'undefined') {
					var store = Ext.getCmp('ContractConfigGrid').getStore();
					store.reload({
								params : {
									'Q_contract.contractId_L_EQ' : contractId
								}
							});
				}
				//载入附件
				var af=action.result.data.contractFiles;
				var filePanel=Ext.getCmp('displayContractAttach');
				var fileIds=Ext.getCmp("contractAttachIDs");
				for(var i=0;i<af.length;i++){
					if(fileIds.getValue()!=''){
			  			fileIds.setValue(fileIds.getValue()+',');
			  		}
			  		fileIds.setValue(fileIds.getValue()+af[i].fileId);
					Ext.DomHelper.append(filePanel.body,'<span><a href="#" onclick="FileAttachDetail.show('+af[i].fileId+')">'+af[i].fileName+'</a><img class="img-delete" src="'+__ctxPath+'/images/system/delete.gif" onclick="removeContractAttach(this,'+af[i].fileId+')"/>&nbsp;|&nbsp;</span>');
				}
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('编辑', '载入失败');
			}
		});
	}
	return formPanel;
};

/**
 * 根据ProjectId,获得Project的详细信息
 */
ContractForm.getProject = function(projectId) {
	//var projectId = Ext.getCmp('projectId').value;
	if (projectId != null && projectId != '' && projectId != 'undefined') {
		Ext.Ajax.request({
					url : __ctxPath + '/customer/getProject.do',
					params : {
						projectId : projectId
					},
					method : 'post',
					success : function(response) {
						var result = Ext.util.JSON
								.decode(response.responseText).data;
						Ext.getCmp('ProjectDisplay').body.update('项目编号: '
										+ result.projectNo + '<br> 项目名称: '
										+ result.projectName + '<br> 所属客户: '
										+ result.customer.customerName
										+ '<br> 联系人员: ' + result.fullname
										+ '<br> 项目描述: ' + result.reqDesc);
					}
				})
	}
}
/**
 * 保存合同方法
 */
ContractForm.saveContract = function() {
	var fp = Ext.getCmp('ContractForm');

	var store = Ext.getCmp('ContractConfigGrid').getStore();
	var params = [];
	for (i = 0, cnt = store.getCount(); i < cnt; i += 1) {
		var record = store.getAt(i);
		if (record.data.itemName == null || record.data.itemName == ''
				|| record.data.itemName == 'undefined') {
			Ext.ux.Toast.msg('提示信息', '设备名称为必填!');
			return;
		}
		if (record.data.itemSpec == null || record.data.itemSpec == ''
				|| record.data.itemSpec == 'undefined') {
			Ext.ux.Toast.msg('提示信息', '设备规格为必填!');
			return;
		}
		if (record.data.amount == null || record.data.amount == ''
				|| record.data.amount == 'undefined') {
			Ext.ux.Toast.msg('提示信息', '设备数量为必填!');
			return;
		}
		if (record.data.assignId == '' || record.data.assignId == null) {// 设置未保存的assignId标记，方便服务端进行gson转化
			record.set('configId', -1);
		}
		if (record.dirty) // 得到所有修改过的数据
			params.push(record.data);
	}
	if (fp.getForm().isValid()) {
		fp.getForm().submit({
					method : 'post',
					params : {
						data : Ext.encode(params)
					},
					waitMsg : '正在提交数据...',
					success : function(fp, action) {
						Ext.ux.Toast.msg('操作信息', '成功保存信息！');
						Ext.getCmp('ContractGrid').getStore().reload();
						Ext.getCmp('ContractFormWin').close();
					},
					failure : function(fp, action) {
						Ext.MessageBox.show({
									title : '操作信息',
									msg : action.result.msg,
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-error'
								});
						//Ext.getCmp('ContractFormWin').close();
					}
				});
	}
}


/**
 * 上传合同附件
 */
function uploadContractAttach(data){
	var fileIds = Ext.getCmp('contractAttachIDs');
	var display = Ext.getCmp('displayContractAttach');
	for(var i=0;i<data.length;i++){
		if(fileIds.getValue()!=''){
  			fileIds.setValue(fileIds.getValue()+',');
  		}
  		fileIds.setValue(fileIds.getValue()+data[i].fileId);
  		Ext.DomHelper.append(display.body,'<span><a href="#" onclick="FileAttachDetail.show('+data[i].fileId+')">'+data[i].filename+'</a><img class="img-delete" src="'+__ctxPath+'/images/system/delete.gif" onclick="removeContractAttach(this,'+data[i].fileId+')"/>&nbsp;|&nbsp;</span>');
  	}
}
/**
 * 删除合同附件
 * @param {} obj
 * @param {} _fileId
 */
function removeContractAttach(obj,_fileId){
	var fileIds=Ext.getCmp("contractAttachIDs");
	var value=fileIds.getValue();
	if(value.indexOf(',')<0){//仅有一个附件
		fileIds.setValue('');
	}else{
		value=value.replace(',' + _fileId,'').replace(_fileId+',','');
		fileIds.setValue(value);
	}
	
	var el=Ext.get(obj.parentNode);
	el.remove();
	
	var contractId = Ext.getCmp('contractId').value;
	if(contractId !=null && contractId !='' && contractId !='undefined'){
		Ext.Ajax.request({
			url: __ctxPath+'/customer/removeFileContract.do',
			params:{contractId:contractId,contractAttachIDs:_fileId},
			method:'post',
			success: function(){
				Ext.Ajax.request({
					url:__ctxPath+'/system/multiDelFileAttach.do',
					params:{ids:_fileId},
					method : 'post',
					success : function() {
						Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
					}
				})
			}
		})
	}else{
		Ext.Ajax.request({
					url:__ctxPath+'/system/multiDelFileAttach.do',
					params:{ids:_fileId},
					method : 'post',
					success : function() {
						Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
					}
				})
	}
};