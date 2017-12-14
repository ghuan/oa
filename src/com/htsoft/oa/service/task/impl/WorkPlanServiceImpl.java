package com.htsoft.oa.service.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.WorkPlanDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.task.WorkPlan;
import com.htsoft.oa.service.task.WorkPlanService;

public class WorkPlanServiceImpl extends BaseServiceImpl<WorkPlan> implements WorkPlanService{
	private WorkPlanDao dao;
	
	public WorkPlanServiceImpl(WorkPlanDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<WorkPlan> findByDepartment(WorkPlan workPlan,AppUser user, PagingBean pb) {
		return dao.findByDepartment(workPlan,user, pb);
	}

}