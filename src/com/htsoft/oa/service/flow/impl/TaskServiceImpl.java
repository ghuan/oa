package com.htsoft.oa.service.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.jbpm.api.ExecutionService;
import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.TaskDao;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.flow.TaskService;
import com.htsoft.oa.service.system.AppUserService;

public class TaskServiceImpl extends BaseServiceImpl<TaskImpl> implements TaskService{
	@Resource
	private ExecutionService executionService;
	@Resource
	private ProcessRunService processRunService;
	private TaskDao dao;
	public TaskServiceImpl(TaskDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Resource
	private AppUserService appUserService;
	
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb){
		return dao.getTasksByUserId(userId,pb);
	}
	
	/**
	 * 显示自定义的任务信息
	 */
	public List<TaskInfo> getTaskInfosByUserId(String userId,PagingBean pb){
		List<TaskImpl> list=getTasksByUserId(userId, pb);
		List<TaskInfo> taskInfoList=new ArrayList<TaskInfo>();
		for(TaskImpl taskImpl:list){
			TaskInfo taskInfo=new TaskInfo(taskImpl);
			if(taskImpl.getAssignee()!=null){
				AppUser user=appUserService.get(new Long(taskImpl.getAssignee()));
				taskInfo.setAssignee(user.getFullname());
				
			}
			ProcessRun processRun=processRunService.getByPiId(taskImpl.getExecutionId());
			if(processRun!=null){
				taskInfo.setActivityName(processRun.getProDefinition().getName() + "--" + taskImpl.getActivityName());
			}
			//显示任务，需要加上流程的名称
			taskInfoList.add(taskInfo);
		}
		return taskInfoList;
	}
}
