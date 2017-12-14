package com.htsoft.oa.dao.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.task.CalendarPlan;

/**
 * 
 * @author 
 *
 */
public interface CalendarPlanDao extends BaseDao<CalendarPlan>{
	/**
	 * 今日常务
	 * @param userId
	 * @param pb
	 * @return
	 */
	public List<CalendarPlan> getTodayPlans(Long userId,PagingBean pb);
	
	/**
	 * 取得某用户某时间内的所有任务
	 * @param userId
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public List<CalendarPlan> getByPeriod(Long userId,Date startTime,Date endTime);
	/**
	 * 取得当前登录用户的日程列表
	 * @param userId
	 * @param pb
	 * @return
	 */
	public List showCalendarPlanByUserId(Long userId,PagingBean pb);
}