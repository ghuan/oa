package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.TaskService;
import org.jbpm.api.task.Task;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.htsoft.core.Constants;
import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.ShortMessageService;

/**
 * 流程中的任务的显示及操作
 * @author csx
 *
 */
public class TaskAction extends BaseAction{
	@Resource(name="flowTaskService")
	private com.htsoft.oa.service.flow.TaskService flowTaskService;
	@Resource
	private TaskService taskService;
	@Resource
	private ShortMessageService shortMessageService;
	
	public String list(){
		
		PagingBean pb=new PagingBean(this.start, limit);
		List<TaskInfo> tasks=flowTaskService.getTaskInfosByUserId(ContextUtil.getCurrentUserId().toString(),pb);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat(Constants.DATE_FORMAT_FULL).create();
		
		buff.append(gson.toJson(tasks));
		
		buff.append("}");
		
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String change(){
		HttpServletRequest request=getRequest();
		String taskId=request.getParameter("taskId");
		String userId=request.getParameter("userId");
		String curUserId=ContextUtil.getCurrentUserId().toString();
		Task task=taskService.getTask(taskId);
		if(task!=null && curUserId.equals(task.getAssignee())){
			taskService.assignTask(taskId, userId);
			String msg=request.getParameter("msg");
			if(StringUtils.isNotEmpty(msg)){
				//添加短信息提示
				shortMessageService.save(AppUser.SYSTEM_USER,userId,msg,ShortMessage.MSG_TYPE_TASK);
			}
		}
		
		return SUCCESS;
	}
	
	/**
	 * 释放任务
	 * @return
	 */
	public String unlock(){
		String taskId=getRequest().getParameter("taskId");
		Task task=taskService.getTask(taskId);
		
		String curUserId=ContextUtil.getCurrentUserId().toString();
		
		if(task!=null && curUserId.equals(task.getAssignee())){//为本人的任务，并且尚未完成才能解锁
			taskService.assignTask(task.getId(), null);
			setJsonString("{success:true,unlocked:true}");
		}else{
			setJsonString("{success:true,unlocked:false}");
		}
		
		return SUCCESS;
	}
	
	/**
	 * 锁定任务
	 * @return
	 */
	public String lock(){
		
		String taskId=getRequest().getParameter("taskId");
		Task task=taskService.getTask(taskId);
		
		if(task!=null && task.getAssignee()==null){//该任务尚未被分配，或该任务已经被处理完毕
			taskService.assignTask(task.getId(), ContextUtil.getCurrentUserId().toString());
			setJsonString("{success:true,hasAssigned:false}");
		}else{
			setJsonString("{success:true,hasAssigned:true}");
		}
		
		return SUCCESS;
	}
}
