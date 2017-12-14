package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProcessFormDao;
import com.htsoft.oa.model.flow.ProcessForm;

public class ProcessFormDaoImpl extends BaseDaoImpl<ProcessForm> implements ProcessFormDao{

	public ProcessFormDaoImpl() {
		super(ProcessForm.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProcessFormDao#getByRunId(java.lang.Long)
	 */
	public List getByRunId(Long runId){
		String hql="from ProcessForm pf where pf.processRun.runId=? order by pf.formId asc";
		return findByHql(hql, new Object[]{runId});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProcessFormDao#getByRunIdActivityName(java.lang.Long, java.lang.String)
	 */
	public ProcessForm getByRunIdActivityName(Long runId,String activityName){
		//取得最新的sn号
		Integer maxSn=getActvityExeTimes(runId, activityName).intValue();
		String hql="from ProcessForm pf where pf.processRun.runId=? and pf.activityName=? and pf.sn=?";
		return (ProcessForm)findUnique(hql, new Object[]{runId,activityName,maxSn});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProcessFormDao#getActvityExeTimes(java.lang.Long, java.lang.String)
	 */
	public Long getActvityExeTimes(Long runId,String activityName){
		String hql="select count(pf.formId) from ProcessForm pf where pf.processRun.runId=? and pf.activityName=? ";
		return (Long)findUnique(hql, new Object[]{runId,activityName});
	}

}