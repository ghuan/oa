package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.tools.generic.DateTool;
import org.jbpm.pvm.internal.model.Transition;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.FlowStartInfo;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.flow.Transform;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.FormDataService;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProcessFormService;
import com.htsoft.oa.service.flow.ProcessRunService;
import flexjson.JSONSerializer;

/**
 * 流程的活动及任务管理
 * @author csx
 *
 */
public class ProcessActivityAction extends BaseAction{
	@Resource
	private ProDefinitionService proDefinitionService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private ProcessFormService processFormService;
	
	@Resource
	private JbpmService jbpmService;
	
	@Resource
	private FormDataService formDataService;
	
	@Resource
	VelocityEngine flowVelocityEngine;
	
	private String activityName;
	
	private Long runId;
	
	/**
	 * 流程实例ID
	 */
	private String piId;

	public String getPiId() {
		return piId;
	}

	public void setPiId(String piId) {
		this.piId = piId;
	}

	public Long getRunId() {
		return runId;
	}

	public void setRunId(Long runId) {
		this.runId = runId;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	
	/**
	 * 流程的定义ID
	 */
	private Long defId;

	public Long getDefId() {
		return defId;
	}

	public void setDefId(Long defId) {
		this.defId = defId;
	}
	
	/**
	 * 显示某个流程的任务表单信息,并生成Ext的表单的信息
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String get() throws Exception {
		//取得流程名称
		String processName=null;
		if(defId!=null){
			ProDefinition proDefinition=proDefinitionService.get(defId);
			processName=proDefinition.getName();
		}else if(runId!=null){
			ProcessRun processRun=processRunService.get(runId);
			processName=processRun.getProDefinition().getName();
		}else if(piId!=null){
			ProcessRun processRun=processRunService.getByPiId(piId);
			processName=processRun.getProDefinition().getName();
		}
		//取得表单的的路径配置信息
		String tempLocation=ProcessActivityAssistant.getFormPath(processName, activityName);
		
		//准备表单的数据
		Map model=new HashMap();
		//已经存在的表单数据,(则用户可以先存储数据，然后下次再执行下一步的操作)
		Map<String,Object> formDataMap=null;
		if(runId!=null){
			formDataMap=formDataService.getFromDataMap(runId, activityName);
		}
		//Fields Map
		Map<String,ParamField> fieldsMap=ProcessActivityAssistant.constructFieldMap(processName, activityName);
		Iterator<String> fieldNames=fieldsMap.keySet().iterator();
		while(fieldNames.hasNext()){
			String fieldName=fieldNames.next();
			if(formDataMap!=null){//如果存在数据，则需要进行数据的
				Object fieldVal=formDataMap.get(fieldName);
				model.put(fieldName, fieldVal);
			}
			if(!model.containsKey(fieldName)){//若model中不存存该数据，则设置为空
				model.put(fieldName,"");
			}
		}
		model.put("currentUser", ContextUtil.getCurrentUser());
		model.put("dateTool", new DateTool());
		String formUiJs="";
		try{
			formUiJs=VelocityEngineUtils.mergeTemplateIntoString(flowVelocityEngine,tempLocation , "UTF-8", model);
		}catch(Exception ex){
			formUiJs=VelocityEngineUtils.mergeTemplateIntoString(flowVelocityEngine,ProcessActivityAssistant.getCommonFormPath(activityName) , "UTF-8", model);
		}
		
		if(StringUtils.isEmpty(formUiJs)){
			formUiJs="[]";
		}
		setJsonString("{success:true,data:"+formUiJs+"}");
		
		return SUCCESS;
	}
	
	/**
	 * 保存申请或保存同时启动流程
	 */
	public String save(){
		
		logger.info("save the Process Run Information");
		
		Map fieldMap=constructFieldMap();
		
		boolean startFlow=false;
		if("true".equals(getRequest().getParameter("startFlow"))){
			startFlow=true;
		}
		
		if(runId!=null){
			ProcessRun processRun=processRunService.get(runId);
			ProcessForm processForm=processFormService.getByRunIdActivityName(runId, activityName);
			if(processForm!=null){
				processRunService.saveProcessRun(processRun, processForm,fieldMap,new FlowStartInfo(startFlow));
			}
		}else{
			if(defId!=null){//添加流程申请
				ProcessRun processRun=initNewProcessRun();
				ProcessForm processForm=initNewProcessForm(processRun);
				processRunService.saveProcessRun(processRun, processForm,fieldMap,new FlowStartInfo(startFlow));
			}
		}
		
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}
	/**
	 * 初始化一个尚未持久化的ProcessRun
	 */
	
	
	/**
	 * 初始化一个新的流程
	 * @return
	 */
	protected ProcessRun initNewProcessRun(){
		ProDefinition proDefinition=proDefinitionService.get(defId);
		
		return processRunService.initNewProcessRun(proDefinition);
	}
	
	protected ProcessForm initNewProcessForm(ProcessRun processRun){
		ProcessForm processForm=new ProcessForm();
		processForm.setActivityName(activityName);
		processForm.setProcessRun(processRun);

		return processForm;
	}
	
	
	
	/**
	 * 下一步
	 * @return
	 */
	public String next(){

		String signalName=getRequest().getParameter("signalName");
		
		String xml=jbpmService.getProcessDefintionXMLByPiId(piId);
		
		String nodeType=jbpmService.getNodeType(xml, activityName);
		
		//完成当前任务
		Map<String, ParamField> fieldMap=constructFieldMap();
		
		processRunService.saveAndNextstep(piId,activityName,signalName,fieldMap);
		
		setJsonString("{success:true}");
		
		return SUCCESS;
	}
	
	/**
	 * 取得当前任务所有出口
	 * @return
	 */
	public String trans(){
		List<Transition> trans=jbpmService.getTransitionsForSignalProcess(piId);
		List<Transform>allTrans=new ArrayList<Transform>();
		
		for(Transition tran:trans){
			allTrans.add(new Transform(tran));
		}
		
		JSONSerializer serializer=JsonUtil.getJSONSerializer();
		String result=serializer.serialize(allTrans);
		
		setJsonString("{success:true,data:"+result+"}");
		return SUCCESS;
	}
	
	/**
	 * 构建提交的流程或任务对应的表单信息字段
	 * @return
	 */
	protected Map<String, ParamField> constructFieldMap(){
		HttpServletRequest request=getRequest();
		
		String processName=null;
		if(runId!=null){
			ProcessRun processRun=processRunService.get(runId);
			processName=processRun.getProDefinition().getName();
		}else if(defId!=null){
			ProDefinition proDefinition=proDefinitionService.get(defId);
			processName=proDefinition.getName();
		}else if(piId!=null){
			ProcessRun processRun=processRunService.getByPiId(piId);
			processName=processRun.getProDefinition().getName();			
		}
	
		Map<String,ParamField> map=ProcessActivityAssistant.constructFieldMap(processName, activityName);
		
		Iterator<String>fieldNames=map.keySet().iterator();
		while(fieldNames.hasNext()){
			String name=fieldNames.next();
			ParamField pf=map.get(name);
			pf.setValue(request.getParameter(name));
		}
		return map;
	}
	
}
