/**
 * @author
 * @createtime
 * @class JobForm
 * @extends Ext.Window
 * @description Job表单
 * @company 宏天软件
 */
JobForm = Ext.extend(Ext.Window, {
			// 内嵌FormPanel
			formPanel : null,
			// 构造函数
			constructor : function(_cfg) {
				if (_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);
				// 必须先初始化组件
				this.initComponents();
				JobForm.superclass.constructor.call(this, {
							id : 'JobFormWin',
							layout : 'fit',
							iconCls : 'menu-job',
							items : this.formPanel,
							modal : true,
							height : 200,
							width : 400,
							maximizable : true,
							title : '职位详细信息',
							buttonAlign : 'center',
							buttons : this.buttons
						});
			},// end of the constructor
			// 初始化组件
			initComponents : function() {
				var _url = __ctxPath + '/system/listDepartment.do?opt=appUser';
				this.jobDepartmentName = new TreeSelector('jobDepartmentName',_url,'所属部门','depId',false);
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px 10px 10px 10px',
							border : false,
							url : __ctxPath + '/hrm/saveJob.do',
							id : 'JobForm',
							defaults : {
								anchor : '98%,98%'
							},
							defaultType : 'textfield',
							items : [{
										name : 'job.jobId',
										id : 'jobId',
										xtype : 'hidden',
										value : this.jobId == null
												? ''
												: this.jobId
									}, {
										fieldLabel : '职位名称',
										name : 'job.jobName',
										id : 'jobName',
										allowBlank : false,
										blankText : '职位名称不能为空!'
									}, {
										fieldLabel : '所属部门',
										name : 'job.depId',
										id : 'depId',
										xtype : 'hidden'
									}, this.jobDepartmentName,{
										fieldLabel : '备注',
										name : 'job.memo',
										id : 'memo',
										xtype : 'textarea'
									}

							]
						});
				// 加载表单对应的数据
				if (this.jobId != null && this.jobId != 'undefined') {
					this.formPanel.getForm().load({
						deferredRender : false,
						url : __ctxPath + '/hrm/getJob.do?jobId='
								+ this.jobId,
						waitMsg : '正在载入数据...',
						success : function(form, action) {
							Ext.getCmp('jobDepartmentName').setValue(action.result.data.department.depName);
						},
						failure : function(form, action) {
						}
					});
				}
				// 初始化功能按钮
				this.buttons = [{
							text : '保存',
							iconCls : 'btn-save',
							handler : this.save.createCallback(this.formPanel,
									this)
						}, {
							text : '重置',
							iconCls : 'btn-reset',
							handler : this.reset.createCallback(this.formPanel)
						}, {
							text : '取消',
							iconCls : 'btn-cancel',
							handler : this.cancel.createCallback(this)
						}];
			},// end of the initcomponents

			/**
			 * 重置
			 * 
			 * @param {}
			 *            formPanel
			 */
			reset : function(formPanel) {
				formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * 
			 * @param {}
			 *            window
			 */
			cancel : function(window) {
				window.close();
			},
			/**
			 * 保存记录
			 */
			save : function(formPanel, window) {
				if (formPanel.getForm().isValid()) {
					formPanel.getForm().submit({
								method : 'POST',
								waitMsg : '正在提交数据...',
								success : function(fp, action) {
									Ext.ux.Toast.msg('操作信息', '成功保存信息！');
									var gridPanel = Ext.getCmp('JobGrid');
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
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
			}// end of save

		});