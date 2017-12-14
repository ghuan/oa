package com.htsoft.oa.dao.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.personal.DutyDao;
import com.htsoft.oa.model.personal.Duty;

public class DutyDaoImpl extends BaseDaoImpl<Duty> implements DutyDao{

	public DutyDaoImpl() {
		super(Duty.class);
	}
	
	/**
	 * 检查当前这个时间段是否横跨于现有的该用户班制时间
	 * @param userId
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public List<Duty> getUserDutyByTime(Long userId,Date startTime,Date endTime){
		String hql="from Duty dy where dy.appUser.userId=? and ((dy.startTime<=? and dy.endTime>=?) or (dy.startTime<=? and dy.endTime>=?))";
		return findByHql(hql, new Object[]{userId,startTime,startTime,endTime,endTime});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.personal.DutyDao#getCurUserDuty(java.lang.Long)
	 */
	public List<Duty> getCurUserDuty(Long userId){
		String hql="from Duty dy where dy.appUser.userId=? and dy.startTime<=? and dy.endTime>=?";
		Date curDate=new Date();
		return findByHql(hql,new Object[]{userId,curDate,curDate});
	}

}