package com.htsoft.oa.service.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jbpm.api.ProcessInstance;
import org.jbpm.api.task.Task;

import com.htsoft.core.Constants;
import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.FormDataDao;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.model.flow.FlowStartInfo;
import com.htsoft.oa.model.flow.FormData;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;

public class ProcessRunServiceImpl extends BaseServiceImpl<ProcessRun> implements ProcessRunService{
	private ProcessRunDao dao;
	@Resource
	private ProcessFormDao processFormDao;
	@Resource
	private FormDataDao formDataDao;
	
	@Resource
	private JbpmService jbpmService;
	
	public ProcessRunServiceImpl(ProcessRunDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public ProcessRun getByPiId(String piId){
		return dao.getByPiId(piId);
	}
	
	/**
	 * 初始化一个新的流程
	 * @return
	 */
	public ProcessRun initNewProcessRun(ProDefinition proDefinition){
		
		ProcessRun processRun=new ProcessRun();
		AppUser curUser=ContextUtil.getCurrentUser();
		
		Date curDate=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd-HHmmss");
		
		processRun.setSubject(proDefinition.getName()+sdf.format(curDate) + "("+curUser.getFullname()+")");
		processRun.setCreator(curUser.getFullname());
		processRun.setAppUser(curUser);
		processRun.setCreatetime(curDate);
		processRun.setProDefinition(proDefinition);
		
		return processRun;
	}

	/**
	 *
	 * @param proDefinition 流程的定义
	 * @param map 流程的数据
	 * @param activityName 流程的活动名称
	 * @param startFlow 是否启动流程
	 */
	public void saveProcessRun(ProcessRun processRun,ProcessForm processForm,Map<String, ParamField>fieldMap,FlowStartInfo startInfo){
		Map variables=new HashMap();
		
		//带上启动的流程的信息
		variables.putAll(startInfo.getVariables());
		
		//保存流程运行的信息
		save(processRun);
		
		boolean isNewsForm=processForm.getFormId()==null?true:false;
		
		if(isNewsForm){//为新表单的话，则设置当前执行人
			AppUser curUser=ContextUtil.getCurrentUser();
			//设置执行人ID及人名，方便后面查询参与用户
			processForm.setCreatorId(curUser.getUserId());
			processForm.setCreatorName(curUser.getFullname());
		}
		
		//保存流程表单
		processFormDao.save(processForm);
		
		Iterator<String> fieldNames=fieldMap.keySet().iterator();
		
		while(fieldNames.hasNext()){
			String fieldName =(String)fieldNames.next();
			ParamField paramField=fieldMap.get(fieldName);
			FormData fd=null;
			if(!isNewsForm){
				fd=formDataDao.getByFormIdFieldName(processForm.getFormId(), fieldName);
				fd.copyValue(paramField);
			}else{
				fd=new FormData(paramField);
			}
			fd.setProcessForm(processForm);
			//若后面需要启动流程，则把数据存储在variables
			if(startInfo.isStartFlow()){
				variables.put(fieldName, fd.getValue());
			}
			//保存流程表单的数据
			formDataDao.save(fd);
		}

		if(startInfo.isStartFlow()){
			//将在启动的流程中携带启动人员的相关信息
			variables.put(Constants.FLOW_START_USER, ContextUtil.getCurrentUser());
			//设置流程名称
			variables.put("processName", processRun.getProDefinition().getName());
			//启动流程之后，需要保存流程的实例piId，方便后面的流程跟踪
			String piId=jbpmService.startProcess(processRun.getProDefinition().getDeployId(), variables);
			processRun.setRunStatus(ProcessRun.RUN_STATUS_RUNNING);
			processRun.setPiId(piId);
			save(processRun);
		}
		
	}
	
	
	/**
	 * 完成任务，同时把数据保存至form_data表，记录该任务填写的表单数据
	 * @param piId
	 * @param transitionName
	 * @param variables
	 */
	public void saveAndNextstep(String piId,String activityName, String transitionName,Map<String, ParamField> fieldMap){
		
		String xml=jbpmService.getProcessDefintionXMLByPiId(piId);
		String nodeType=jbpmService.getNodeType(xml, activityName);
		
		ProcessRun processRun=getByPiId(piId);
		ProcessInstance pi=jbpmService.getProcessInstance(piId);
		Iterator it=fieldMap.keySet().iterator();
		
		//取得最大的sn号，也则某一任务被重复驳回时，可以由此查看
		Integer maxSn=processFormDao.getActvityExeTimes(processRun.getRunId(), activityName).intValue();
		ProcessForm processForm=new ProcessForm();
		processForm.setActivityName(activityName);
		processForm.setSn(maxSn+1);
		
		AppUser curUser=ContextUtil.getCurrentUser();
		//设置执行人ID及人名，方便后面查询参与用户
		processForm.setCreatorId(curUser.getUserId());
		processForm.setCreatorName(curUser.getFullname());
		
		processForm.setProcessRun(processRun);
		//保存这些数据至流程运行的环境中
		Map<String,Object>variables=new HashMap<String, Object>();
		
		while(it.hasNext()){
			String key=(String)it.next();
			ParamField paramField=fieldMap.get(key);
			FormData fd=new FormData(paramField);
			fd.setProcessForm(processForm);
			//把数据存储在variables
			variables.put(key, fd.getValue());
			processForm.getFormDatas().add(fd);
		}
		//保存数据至表单中，方便后面显示
		processFormDao.save(processForm);
		
		//设置当前任务为完成状态，并且为下一任务设置新的执行人或候选人
		if("task".equals(nodeType)){
			 List<Task> taskList=jbpmService.getTasksByPiId(piId);
			 for(Task task:taskList){
				 if(activityName.equals(task.getName())){
					 try{
						 //完成此任务，同时为下一任务指定执行人
						 jbpmService.completeTask(task.getId(),transitionName,variables);
						 break;
					 }catch(Exception ex){
						 ex.printStackTrace();
					 }
				 }
			 }
		}else{//普通节点
			jbpmService.signalProcess(piId, transitionName, variables); 
		}
	}
	
	/**
	 * 移除该流程的运行，前提是该流程尚未启动
	 */
	public void remove(Long runId) {
		ProcessRun processRun=dao.get(runId);
		if(ProcessRun.RUN_STATUS_INIT.equals(processRun.getRunStatus())){
			List<ProcessForm> processForms=processFormDao.getByRunId(runId);
			for(ProcessForm processForm:processForms){
				processFormDao.remove(processForm);
			}
		}
		dao.remove(processRun);
	}
	
	/**
	 * 删除某一流程的所有实例
	 * @param defId 流程定义的Id，则表pro_defintion的defId
	 */
	public void removeByDefId(Long defId){
		//按分页查询所有实例表单
		List<ProcessRun> processRunList=dao.getByDefId(defId, new PagingBean(0, 25));
		for(int i=0;i<processRunList.size();i++){
			dao.remove(processRunList.get(i));
		}
		
		if(processRunList.size()==25){
			removeByDefId(defId);
		}
	}
}