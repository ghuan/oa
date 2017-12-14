package com.htsoft.oa.service.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.CalendarPlanDao;
import com.htsoft.oa.model.task.CalendarPlan;
import com.htsoft.oa.service.task.CalendarPlanService;

public class CalendarPlanServiceImpl extends BaseServiceImpl<CalendarPlan> implements CalendarPlanService{
	private CalendarPlanDao dao;
	
	public CalendarPlanServiceImpl(CalendarPlanDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 今日常务
	 * @param userId
	 * @param pb
	 * @return
	 */
	public List<CalendarPlan> getTodayPlans(Long userId,PagingBean pb){
		return dao.getTodayPlans(userId, pb);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.task.CalendarPlanService#getByPeriod(java.lang.Long, java.util.Date, java.util.Date)
	 */
	public List<CalendarPlan> getByPeriod(Long userId,Date startTime,Date endTime){
		return dao.getByPeriod(userId, startTime, endTime);
	}

	@Override
	public List showCalendarPlanByUserId(Long userId, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.showCalendarPlanByUserId(userId, pb);
	}

}