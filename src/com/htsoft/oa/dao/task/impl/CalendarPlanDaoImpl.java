package com.htsoft.oa.dao.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.CalendarPlanDao;
import com.htsoft.oa.model.task.CalendarPlan;

public class CalendarPlanDaoImpl extends BaseDaoImpl<CalendarPlan> implements CalendarPlanDao{

	public CalendarPlanDaoImpl() {
		super(CalendarPlan.class);
	}
	
	/**
	 *取得当前的日常任务 
	 * @param userId
	 * @param pb
	 * @return
	 */
	public List<CalendarPlan> getTodayPlans(Long userId,PagingBean pb){
		String hql="from CalendarPlan cp where cp.appUser.userId=? and cp.startTime<=? and cp.endTime>=?";
		
		Date curDate=new Date();
		
		return findByHql(hql, new Object[]{userId,curDate,curDate}, pb);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.task.CalendarPlanDao#getByPeriod(java.lang.Long, java.util.Date, java.util.Date)
	 */
	public List<CalendarPlan> getByPeriod(Long userId,Date startTime,Date endTime){
		String hql="from CalendarPlan cp where cp.appUser.userId=? and ((cp.startTime>=? and cp.startTime<=?) or (cp.endTime>=? and cp.endTime<=?)) order by cp.planId desc";
		return findByHql(hql,new Object[]{userId,startTime,endTime,startTime,endTime});
	}

	@Override
	public List showCalendarPlanByUserId(Long userId, PagingBean pb) {
		// TODO Auto-generated method stub
		ArrayList paramList = new ArrayList();
		StringBuffer hql = new StringBuffer("select vo from CalendarPlan vo where vo.appUser.userId=?");
		paramList.add(userId);
		hql.append(" order by planId desc");
		return findByHql(hql.toString(), paramList.toArray(), pb);
	}

}