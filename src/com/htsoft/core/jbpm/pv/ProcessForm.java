package com.htsoft.core.jbpm.pv;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.Serializable;
import java.util.LinkedList;

/**
 * 流程表单
 * @author csx
 *
 */
public class ProcessForm implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 流程中的活动名称
	 */
	private String activityName;
	/**
	 * 流程中的表单值
	 */
	private LinkedList<ParamInfo> params=new LinkedList<ParamInfo>();
	
	public ProcessForm() {
		
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public LinkedList<ParamInfo> getParams() {
		return params;
	}

	public void setParams(LinkedList<ParamInfo> params) {
		this.params = params;
	}
	
	
}
