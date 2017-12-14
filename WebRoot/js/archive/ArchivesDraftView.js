/**
 * @createtime:2010-01-20 
 * @author csx
 * @description 公文拟稿发文界面 
 * @class ArchivesDraftView
 * @extends Ext.Panel
 */
ArchivesDraftView = Ext.extend(Ext.Panel, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);

		this.init();

		ArchivesDraftView.superclass.constructor.call(this, {
					title : '公文拟稿发文',
					id : 'ArchivesDraftView',
					layout : 'column',
					defaults : {
						border : false,
						autoScroll : true
					},
					tbar : new Ext.Toolbar({
								items : [{
											text : '完成',
											iconCls : 'btn-save',
											handler : this.onSave,
											scope:this
										}, '-', {
											text : '发送',
											handler : null
										}]
							}),
					items : [this.formPanel]
				});
	},
	
	onSave:function(){
		if(this.formPanel.getForm().isValid()){
			this.formPanel.getForm().submit({
				method : 'POST',waitMsg : '正在提交数据...',
				success : function(fp, action) {
					Ext.ux.Toast.msg('操作信息', '成功保存信息！');
					//TODO
				},
				failure : function(fp, action) {
					Ext.MessageBox.show({
								title : '操作信息',
								msg : '信息保存出错，请联系管理员！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		}
	},
	addBlankRecord: function() {
        var store = this.store;
        var orec, row;
        if(store.recordType) {
            orec = new store.recordType();
            orec.data = {};
            orec.fields.each(function(field) {
                orec.data[field.name] = field.defaultValue;
            });
            orec.data.newRecord = true;
            orec.commit();
            store.add(orec);

            row = store.indexOf(orec);
            console.info('row:' + row);
//            if(row && undefined !== this.editOnAddCol) {
//                this.docGridPanel.startEditing(row, this.editOnAddCol);
//            }
        }
    },
    /**
     * 添加附件文档
     */
    addArchiveDoc:function(){
    	//判断是否选择了文档分类
    	var archiveTypeId=Ext.getCmp('archiveTypeId');
//    	if(archiveTypeId.getValue()==''){
//    		Ext.ux.Toast.msg('操作提示','请选择公文分类!');
//    		return;
//    	}
    	
//    	new ArchivesDocForm({archiveTypeId:archiveTypeId,callback:function(archivesDoc){
//    		
//    	}}).show();

		new ArchTemplateSelector({
					callback : function(tempPath) {
						alert('tempPath:' + tempPath);
					}
		}).show();
    	
    },
    
    /**
     * 添加新的公文文档，以一个空白的文档开始
     */
    addNewArchiveDoc:function(){
    	var callback=function(archivesDoc){
    	};
    	new ArchivesDocForm({callback:callback}).show();
    },
    
	/**
	 * init the components
	 */
	init : function() {
		
		// 加载数据至store TODO change the archiveIds
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + "/archive/listArchivesDoc.do?archivesId=",
					root : 'result',
					totalProperty : 'totalCounts',
					remoteSort : true,
					fields : [{
								name : 'docId',
								type : 'int'
							}, 'fileId', 'creator', 'creatorId', 'menderId',
							'mender', 'docName', 'docStatus', 'curVersion',
							'docPath', 'updatetime', 'createtime']
				});
		this.store.setDefaultSort('docId', 'desc');
		this.store.load();
		
		this.toolbar=new Ext.Toolbar({height:30,items:[
			{
				text:'按模板在线添加',
				handler:this.addArchiveDoc,
				scope:this
			},{
				text:'在线添加',
				handler:this.addNewArchiveDoc,
				scope:this
			},'-',{
				text:'上传文档',
				handler:this.uploadArchiveDoc,
				scope:this
			},'-',{
				text:'删除附件文档',
				scope:this,
				handler:function(){
					
				}
			}
		]});
		
		//初始化附件文档
		this.docGridPanel=new Ext.grid.EditorGridPanel({
								columnWidth : .96,
								id:'archiveDocGrid',
								autoHeight:true,
								store : this.store,
								tbar : this.toolbar,
								columns : [new Ext.grid.RowNumberer(),
										{
											dataIndex : 'docId',
											hidden:true
										},{
											dataIndex : 'fileId',
											hidden:true
										},{
											dataIndex : 'docPath',
											hidden:true
										},{
											dataIndex:'docName',
											width:400,
											header:'文档名称'
										},{
											header:'管理',
											width:200
										}]
		});
		
		
		//初始化表单
		this.formPanel = new Ext.FormPanel({
			columnWidth : .96,
			layout : 'form',
			autoHeight:true,
			style : 'padding:6px 6px 6px 6px',
			url : __ctxPath + '/archive/saveArchives.do',
			id : 'ArchivesForm',
			defaults : {
				anchor : '96%,96%',
				border : false
			},
			items : [{
						name : 'archives.archivesId',
						id : 'archivesId',
						xtype : 'hidden',
						value : this.archivesId == null ? '' : this.archivesId
					}, {
						layout : 'column',
						defaults : {
							border : false
						},
						items : [{
							columnWidth : .4,
							layout : 'form',
							items : {
								fieldLabel : '公文类型',
								hiddenName : 'archives.typeId',
								id : 'archiveTypeId',
								xtype : 'combo',
								allowBlank : false,
								editable : false,
								lazyInit : false,
								allowBlank : false,
								triggerAction : 'all',
								store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath
													+ '/archive/comboArchivesType.do',
											fields : ['typeId', 'typeName']
										}),
								displayField : 'typeName',
								valueField : 'typeId'
							}
						}
						]
					}, {
						xtype : 'fieldset',
						title : '发文设置',
						border : true,
						defaults:{
							anchor:'98%,98%'
						},
						items : [{
							layout : 'column',
							border : false,
							defaults:{
								anchor:'96%,96%'
							},
							items : [{
										layout : 'form',
										columnWidth : .4,
										border : false,
										items : {
											fieldLabel : '发文字号',
											name : 'archives.archivesNo',
											id : 'archivesNo',
											xtype : 'textfield',
											allowBlank:false,
											anchor:'98%'
										}
									}, {
										layout : 'form',
										columnWidth : .4,
										border : false,
										items : {
											fieldLabel : '密级',
											name : 'archives.privacyLevel',
											id : 'privacyLevel',
										    triggerAction: 'all',
										    lazyRender:true,
										    allowBlank:false,
										    emptyText:'选择密级',
											xtype : 'combo',
											store :['普通','秘密','机密','绝密']
										}
									},
									{
										layout : 'form',
										columnWidth : .4,
										border : false,
										items:{
											fieldLabel : '紧急程度',
											name : 'archives.urgentLevel',
											id : 'urgentLevel',
											triggerAction: 'all',
										    lazyRender:true,
										    allowBlank:false,
										    emptyText:'选择紧急程度',
											xtype : 'combo',
											store :['普通','紧急','特急','特提']
										}
									}
									]
						},{
							fieldLabel : '文件标题',
							name : 'archives.subject',
							id : 'subject',
							xtype : 'textfield',
							allowBlank:false
						}, 
						{
							xtype:'container',
							layout:'column',
							style:'padding-left:0px;margin-left:0px;',
							height:30,
							defaults:{
								border:false
							},
							items:[{
								xtype:'label',
								text : '发文机关或部门',
								width:100
							},
							{
								columnWidth:.4,
								name : 'archives.issueDep',
								id : 'issueDep',
								xtype : 'textfield',
								allowBlank:false,
								readOnly:true
							},
						 	{
								name : 'archives.depId',
								id : 'depId',
								xtype : 'hidden'
							},{
								xtype:'button',
								text:'选择部门',
								handler:function(){
									DepSelector.getView(function(depId,depName){
										Ext.getCmp('issueDep').setValue(depName);
										Ext.getCmp('depId').setValue(depId);
									},true).show();	
								}
							}
							]
						},
						{
							fieldLabel : '主题词',
							name : 'archives.keywords',
							id : 'keywords',
							xtype : 'textfield'
						}, {
							fieldLabel : '内容简介',
							name : 'archives.shortContent',
							id : 'shortContent',
							xtype : 'textarea'
						}, {
							fieldLabel : '拟办意见',
							name : 'archives.handleOpinion',
							id : 'handleOpinion',
							xtype : 'textarea'
						},{
							name:'archives.fileCounts',
							id:'fileCounts',
							xtype:'hidden',
							value:'0'
						}
						]
						// end of the field set items
					},//end of fieldset
					{
						xtype:'fieldset',
						border:true,
						title:'文档附件',
						layout:'fit',
						items:this.docGridPanel
					}
			]
		});
		
		
		
	}// end of init
});