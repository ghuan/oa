package com.htsoft.oa.service.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.PlanAttendDao;
import com.htsoft.oa.model.task.PlanAttend;
import com.htsoft.oa.service.task.PlanAttendService;

public class PlanAttendServiceImpl extends BaseServiceImpl<PlanAttend> implements PlanAttendService{
	private PlanAttendDao dao;
	
	public PlanAttendServiceImpl(PlanAttendDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean deletePlanAttend(Long planId,Short isDep,Short isPrimary) {
		List<PlanAttend> list=dao.FindPlanAttend(planId,isDep,isPrimary);
		for(PlanAttend pa:list){
			dao.remove(pa.getAttendId());
		}
		return true;
	}

}