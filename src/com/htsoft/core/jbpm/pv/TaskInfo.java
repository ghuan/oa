package com.htsoft.core.jbpm.pv;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.Iterator;

import org.jbpm.pvm.internal.task.ParticipationImpl;
import org.jbpm.pvm.internal.task.TaskImpl;

public class TaskInfo {
	
	private String activityName;
	private String assignee;
	private Date createTime;
	private Date dueDate;
	private String executionId;
	private Long taskId;
	
	/**
	 * 任务是否可由多人来执行，默认为0,则表示该任务只能由特定的人来执行。
	 */
	private Short isMultipleTask=0;
	
	//候选人员
	private String candidateUsers="";//taskImpl.getParticipations();
	//候选角色
	private String candidateRoles="";
	
	public TaskInfo() {
	}
	
	public TaskInfo(TaskImpl taskImpl){
		this.activityName=taskImpl.getActivityName();
		this.assignee=taskImpl.getAssignee();
		this.dueDate=taskImpl.getDuedate();
		this.createTime=taskImpl.getCreateTime();
		this.executionId=taskImpl.getExecutionId();
		this.taskId=taskImpl.getDbid();
		
		if(taskImpl.getParticipations().size()>0){//可由其他人来执行
			isMultipleTask=1;
		}
		//TODO
//		Iterator<ParticipationImpl> it=taskImpl.getParticipations().iterator();
//		
//		while(it.hasNext()){
//			ParticipationImpl part=it.next();
//		}
		
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public String getExecutionId() {
		return executionId;
	}

	public void setExecutionId(String executionId) {
		this.executionId = executionId;
	}

	public String getCandidateUsers() {
		return candidateUsers;
	}

	public void setCandidateUsers(String candidateUsers) {
		this.candidateUsers = candidateUsers;
	}

	public String getCandidateRoles() {
		return candidateRoles;
	}

	public void setCandidateRoles(String candidateRoles) {
		this.candidateRoles = candidateRoles;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public Short getIsMultipleTask() {
		return isMultipleTask;
	}

	public void setIsMultipleTask(Short isMultipleTask) {
		this.isMultipleTask = isMultipleTask;
	}
	
}
