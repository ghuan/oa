package com.htsoft.oa.service.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import org.jbpm.api.Execution;
import org.jbpm.api.ExecutionService;
import org.jbpm.api.HistoryService;
import org.jbpm.api.ProcessDefinition;
import org.jbpm.api.ProcessDefinitionQuery;
import org.jbpm.api.ProcessEngine;
import org.jbpm.api.ProcessInstance;
import org.jbpm.api.RepositoryService;
import org.jbpm.api.TaskService;
import org.jbpm.api.history.HistoryProcessInstance;
import org.jbpm.api.task.Participation;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.env.Environment;
import org.jbpm.pvm.internal.env.EnvironmentFactory;
import org.jbpm.pvm.internal.history.model.HistoryProcessInstanceImpl;
import org.jbpm.pvm.internal.model.Activity;
import org.jbpm.pvm.internal.model.ExecutionImpl;
import org.jbpm.pvm.internal.model.Transition;
import org.jbpm.pvm.internal.svc.TaskServiceImpl;
import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.Constants;
import com.htsoft.core.jbpm.jpdl.Node;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProUserAssign;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProUserAssignService;
import com.htsoft.oa.service.flow.ProcessFormService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.UserSubService;

public class JbpmServiceImpl implements JbpmService{
	
	private static final Log logger=LogFactory.getLog(JbpmServiceImpl.class);
	
	@Resource
	private ProcessEngine processEngine;
	
	@Resource
	private RepositoryService repositoryService;
	
	@Resource
	private ExecutionService executionService; 
	
	@Resource
	private ProDefinitionService proDefinitionService;
	
	@Resource
	private TaskService taskService;
	
	@Resource
	private HistoryService historyService;
	
	@Resource
	private ProUserAssignService proUserAssignService;
	
	@Resource
	private UserSubService userSubService;
	
	//TODO 需要去掉该注入方式，把该运行服务转至其他
	@Resource
	private ProcessRunService processRunService;
	
	@Resource
	private ProcessFormService processFormService;
	
	/**
	 * 删除流程定义，同时也删除该流程的相关数据，包括启动的实例，表单等相关的数据
	 * @param defId
	 */
	public void doUnDeployProDefinition(Long defId){
		
		//删除processRun 相关的数据
		processRunService.removeByDefId(defId);
		
		ProDefinition pd=proDefinitionService.get(defId);
		if(pd!=null){
			//删除Jbpm的流程定义
			repositoryService.deleteDeploymentCascade(pd.getDeployId());
			
			//删除流程定义
			proDefinitionService.remove(pd);
		}
	}
	
	/**
	 * 发布或更新流程定义
	 * @param proDefinition
	 * @return
	 */
	public ProDefinition saveOrUpdateDeploy(ProDefinition proDefinition){
		//添加流程定义及发布流程至Jbpm流程表中
		if(proDefinition.getDeployId()==null){
			
			String deployId=repositoryService.createDeployment().addResourceFromString("process.jpdl.xml", proDefinition.getDefXml()).deploy();
			
		    proDefinition.setDeployId(deployId);
		    
		    proDefinitionService.save(proDefinition);
		    
		}else{
			//先从数据库中移除，保证下次从数据库取出来的是旧的记录而不是Hibernate中的缓存的记录
			proDefinitionService.evict(proDefinition);
			
			ProDefinition proDef=proDefinitionService.get(proDefinition.getDefId());
			//需要比较数据库的xml文件与现在更新的xml文件是否不相同，若不相同则删除原来的发布并布新的流程
			if(!proDef.getDefXml().equals(proDefinition.getDefXml())){
				if(proDef.getDeployId()!=null){
					//不进行删除所有旧流程的东西，保留旧流程运行中的信息。repositoryService.deleteDeploymentCascade(deploymentId)
					repositoryService.deleteDeployment(proDef.getDeployId());
				}
				String deployId=repositoryService.createDeployment().addResourceFromString("process.jpdl.xml", proDefinition.getDefXml()).deploy();
				proDefinition.setDeployId(deployId);
			}
			
			proDefinitionService.merge(proDefinition);
		}
		
		return proDefinition;
	}
	
	/**
	 * 按流程key取得Jbpm最新的流程定义
	 * @param processKey
	 * @return
	 */
	public ProcessDefinition getProcessDefinitionByKey(String processKey){
		List<ProcessDefinition> list= repositoryService.createProcessDefinitionQuery()
		.processDefinitionKey(processKey).orderDesc(ProcessDefinitionQuery.PROPERTY_VERSION).list();
		if(list!=null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	/**
	 * 按流程key取得流程定义
	 * @return
	 */
	public ProDefinition getProDefinitionByKey(String processKey){
		ProcessDefinition processDefinition=getProcessDefinitionByKey(processKey);
		if(processDefinition!=null){
			ProDefinition proDef=proDefinitionService.getByDeployId(processDefinition.getDeploymentId());
			return proDef;
		}
		return null;
	}
	
	/**
	 * 按流程定义id取得流程定义的XML
	 * @param defId
	 * @return
	 */
	public String getDefinitionXmlByDefId(Long defId){
		ProDefinition proDefinition=proDefinitionService.get(defId);
		return proDefinition.getDefXml();
	}
	
	/**
	 * 按发布id取得流程定义的XML
	 */
	public String getDefinitionXmlByDpId(String deployId){
		ProDefinition proDefintion=proDefinitionService.getByDeployId(deployId);
		return proDefintion.getDefXml();
	}

	/**
	 * 按流程例id取得流程定义的XML
	 */
	public String getDefinitionXmlByPiId(String piId){
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(piId).uniqueResult();
		ProcessDefinition pd=repositoryService.createProcessDefinitionQuery().processDefinitionId(pi.getProcessDefinitionId()).uniqueResult();
		return getDefinitionXmlByDpId(pd.getDeploymentId());
	}
	/**
	 * 取得流程实例
	 * @param piId
	 * @return
	 */
	public ProcessInstance getProcessInstance(String piId){
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(piId).uniqueResult();
		return pi;
	}
	
	/**
	 * 通过流程定义取得所有的任务列表
	 * @param defId
	 * @return
	 */
	public List<Node>getTaskNodesByDefId(Long defId){
		ProDefinition proDefinition=proDefinitionService.get(defId);
		return getTaskNodesFromXml(proDefinition.getDefXml(),false);
	}
	
	 /**
     * 从XML文件中取得任务节点名称列表
     * @param xml
     * @param includeStart  是否包括启动节点
     * @return
     */
    private List<Node> getTaskNodesFromXml(String xml,boolean includeStart){
		List<Node> nodes=new ArrayList<Node>();
		try{
			Element root = DocumentHelper.parseText(xml).getRootElement();
			   for (Element elem : (List<Element>) root.elements()) {
		            String type = elem.getQName().getName();
		            if("task".equalsIgnoreCase(type)){
			            if (elem.attribute("name") != null) {
			               Node node=new Node(elem.attribute("name").getValue(),"任务节点");
			               nodes.add(node);
			            }
		            }else if(includeStart && "start".equalsIgnoreCase(type)){
		            	if (elem.attribute("name") != null){
		            		Node node=new Node(elem.attribute("name").getValue(),"开始节点");
				            nodes.add(node);
		            	}
		            }
		       }
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		return nodes;
	}
    
    /**
     * 启动工作流
     * @param deployId
     * @param variables
     */
	public String startProcess(String deployId, Map variables) {
		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery().deploymentId(deployId).uniqueResult();
		//启动工作流
		ProcessInstance pi = executionService.startProcessInstanceById(pd.getId(), variables);
		String assignId=(String)variables.get(Constants.FLOW_ASSIGN_ID);
		assignTask(pi,pd,assignId);
		
		return pi.getId();
	}
	
	/**
	 * 任务指派
	 * 
	 * @param pi
	 * @param pd
	 * @param assignId
	 */
	public void assignTask(ProcessInstance pi,ProcessDefinition pd,String assignId){
		
		if(pd==null){
			pd=repositoryService.createProcessDefinitionQuery().processDefinitionId(pi.getProcessDefinitionId()).uniqueResult();
		}
		//取得当前任务的名称，然后根据该任务名称以及流程定义，查看该任务将由哪一个用户或用户组来处理比较合适
		Iterator<String> activityNames=pi.findActiveActivityNames().iterator();
		
		while(activityNames.hasNext()){
			String actName=activityNames.next();
			Task task=taskService.createTaskQuery().processInstanceId(pi.getId()).activityName(actName).uniqueResult();
			
			if(task!=null){//进行任务的授权用户的操作
				if(StringUtils.isNotEmpty(assignId)){//若在流程执行过程中，用户在表单指定了下一步的执行人员，则流程会自动指派至该人来执行
					taskService.assignTask(task.getId(), assignId);
					continue;
				}
				
				//取得对应的用户
				ProUserAssign assign=proUserAssignService.getByDeployIdActivityName(pd.getDeploymentId(), actName);
				
				
				if(assign!=null){

					//流程需要重新转回给流程启动者
					if(Constants.FLOW_START_ID.equals(assign.getUserId())){
						//取得流程启动的ID
						AppUser flowStartUser=(AppUser)executionService.getVariable(pi.getId(),Constants.FLOW_START_USER);
						if(flowStartUser!=null){//流程启动人都不为空
							taskService.assignTask(task.getId(), flowStartUser.getUserId().toString());
						}
					}else if(Constants.FLOW_SUPER_ID.equals(assign.getUserId())){//由上司处理
						AppUser flowStartUser=(AppUser)executionService.getVariable(pi.getId(),Constants.FLOW_START_USER);
						//取得流程者的上司
						if(flowStartUser!=null){
							List<Long> superUserIds=userSubService.upUser(flowStartUser.getUserId());
							StringBuffer upIds=new StringBuffer();
							for(Long userId:superUserIds){
								upIds.append(userId).append(",");
							}
							if(superUserIds.size()>0){
								upIds.deleteCharAt(upIds.length()-1);
							}else{//若没有上司，则流程会流回流程启动者自己来处理
								upIds.append(flowStartUser.getUserId());
							}
							taskService.addTaskParticipatingUser(task.getId(),upIds.toString(),Participation.CANDIDATE);
						}
					}else if(StringUtils.isNotEmpty(assign.getUserId())){//用户优先处理该任务
						taskService.assignTask(task.getId(), assign.getUserId());
					}
					
					if(StringUtils.isNotEmpty(assign.getRoleId())){//角色中的人员成为该任务的候选人员
						taskService.addTaskParticipatingGroup(task.getId(), assign.getRoleId(), Participation.CANDIDATE);
					}
					
				}
			}
		}
	}
	
	/**
	 * 显示某个流程当前任务对应的所有出口
	 * @param piId
	 * @return
	 */
	 public List<Transition> getTransitionsForSignalProcess(String piId) {
	        ProcessInstance pi = executionService.findProcessInstanceById(piId);
	        EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
	        Environment env = environmentFactory.openEnvironment();

	        try {
	            ExecutionImpl executionImpl = (ExecutionImpl) pi;
	            Activity activity = executionImpl.getActivity();

	            return activity.getOutgoingTransitions();
	        } finally {
	            env.close();
	        }
	    }
	 
	 /*
	  * (non-Javadoc)
	  * @see com.htsoft.oa.service.flow.JbpmService#getProcessDefintionXMLByPiId(java.lang.String)
	  */
	 public String getProcessDefintionXMLByPiId(String piId){
		 ProcessRun processRun=processRunService.getByPiId(piId);
		 return processRun.getProDefinition().getDefXml();
	 }
	 
	 /**
	  * 取得某流程实例对应的任务列表
	  * @param piId
	  * @return
	  */
	 public List<Task> getTasksByPiId(String piId){
		 List<Task> taskList=taskService.createTaskQuery().processInstanceId(piId).list();
		 return taskList;
	 }
	    
    /**
	 * 取到节点类型
	 * @param xml
	 * @param nodeName
	 * @return
	 */
	public String getNodeType(String xml,String nodeName){
		String type="";
		try{
			Element root = DocumentHelper.parseText(xml).getRootElement();
			for (Element elem : (List<Element>) root.elements()){
				if(elem.attribute("name")!=null){
					String value=elem.attributeValue("name");
					if(value.equals(nodeName)){
						type = elem.getQName().getName();
						return type;
					}
				}
			}
		}catch(Exception ex){
			logger.info(ex.getMessage());
		}
		return type;
	}
	
	/**
	 * 完成任务
	 * @param taskId
	 * @param transitionName
	 * @param variables
	 */
	public void completeTask(String taskId,String transitionName,Map variables){
		Task task=taskService.getTask(taskId);
		ProcessInstance pi=executionService.createProcessInstanceQuery().processInstanceId(task.getExecutionId()).uniqueResult();
		String executionId=task.getExecutionId();
		//完成任务
		taskService.setVariables(taskId, variables);
	    taskService.completeTask(taskId, transitionName);
	   
	    //检查当前的流程是否已经结束
	    
	    HistoryProcessInstance hpi = historyService.createHistoryProcessInstanceQuery().processInstanceId(executionId).uniqueResult();  
	    String endActivityName = ((HistoryProcessInstanceImpl) hpi).getEndActivityName();  
	    
	    if (endActivityName != null) { // 流程实例已经结束了 
	    	ProcessRun processRun=processRunService.getByPiId(executionId);
	    	if(processRun!=null){
	    		processRun.setPiId(null);
	    		processRun.setRunStatus(ProcessRun.RUN_STATUS_FINISHED);
	    		processRunService.save(processRun);
	    	}
	    }else{
	    	String assignId=(String)variables.get(Constants.FLOW_ASSIGN_ID);
		    //为下一任务授权
		    assignTask(pi, null,assignId);
	    }
	}
	
	/**
	 * 创建新的任务
	 * @param parentTaskId 父任务 ID
	 * @param assignIds 任务执行人IDs
	 */
	public void newTask(String parentTaskId,String assignIds){
		
		TaskServiceImpl taskServiceImpl=(TaskServiceImpl) taskService;
		Task parentTask=taskServiceImpl.getTask(parentTaskId);
		
		if(assignIds!=null){
			String []userIds=assignIds.split("[,]");
			for(int i=0;i<userIds.length;i++){
				Task task=taskServiceImpl.newTask(parentTaskId);
				task.setAssignee(userIds[i]);
				task.setName(parentTask.getName());
				task.setDescription(parentTask.getDescription());
				//保存
				taskServiceImpl.saveTask(task);
				
				//taskService.assignTask(task.getId(), userIds[i]);
				//为该任务指派审批人
				//taskService.assignTask(task.getId(), assign.getUserId());
				//taskService.addTaskParticipatingUser(task.getId(),upIds.toString(),Participation.CANDIDATE);
				//taskService.addTaskParticipatingGroup(task.getId(), assign.getRoleId(), Participation.CANDIDATE);
			}
		}
		
	}
	
	/**
	 * 
     * 执行下一步的流程，对于非任务节点
     * @param id processInstanceId
     * @param transitionName
     * @param variables
     */
    public void signalProcess(String executionId, String transitionName,
        Map<String, Object> variables) {
       
        executionService.setVariables(executionId,variables);
        executionService.signalExecutionById(executionId,transitionName);
    }
    
    
    public void endProcessInstance(String piId) {
        ExecutionService executionService = processEngine.getExecutionService();
        executionService.endProcessInstance(piId,Execution.STATE_ENDED);
    }
	
}
