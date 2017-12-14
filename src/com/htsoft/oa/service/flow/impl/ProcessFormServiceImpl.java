package com.htsoft.oa.service.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.service.flow.ProcessFormService;

public class ProcessFormServiceImpl extends BaseServiceImpl<ProcessForm> implements ProcessFormService{
	private ProcessFormDao dao;
	
	public ProcessFormServiceImpl(ProcessFormDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 取得某个流程实例的所有表单
	 * @param runId
	 * @return
	 */
	public List getByRunId(Long runId){
		return dao.getByRunId(runId);
	}
	
	/**
	 * 查找某个流程某个任务的表单数据
	 * @param runId
	 * @param activityName
	 * @return
	 */
	public ProcessForm getByRunIdActivityName(Long runId,String activityName){
		return dao.getByRunIdActivityName(runId, activityName);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.flow.ProcessFormService#getActvityExeTimes(java.lang.Long, java.lang.String)
	 */
	public Long getActvityExeTimes(Long runId,String activityName){
		return dao.getActvityExeTimes(runId, activityName);
	}

}