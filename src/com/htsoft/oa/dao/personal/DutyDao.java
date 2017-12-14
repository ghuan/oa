package com.htsoft.oa.dao.personal;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.personal.Duty;

/**
 * 
 * @author 
 *
 */
public interface DutyDao extends BaseDao<Duty>{
	/**
	 * 检查当前这个时间段是否横跨于现有的该用户班制时间
	 * @param userId
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public List<Duty> getUserDutyByTime(Long userId,Date startTime,Date endTime);
	
	/**
	 * 取当前用户的班制
	 * @param userId
	 * @return
	 */
	public List<Duty> getCurUserDuty(Long userId);
}