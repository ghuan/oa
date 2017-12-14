package com.htsoft.oa.dao.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.task.PlanAttend;

/**
 * 
 * @author 
 *
 */
public interface PlanAttendDao extends BaseDao<PlanAttend>{
	/**
	 * 根据ID来查找参与人
	 * @param planId
	 * @return
	 */
	public List<PlanAttend> FindPlanAttend(Long planId,Short isDep,Short isPrimary);
}