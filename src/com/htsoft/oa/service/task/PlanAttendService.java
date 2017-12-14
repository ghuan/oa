package com.htsoft.oa.service.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.task.PlanAttend;

public interface PlanAttendService extends BaseService<PlanAttend>{
	public boolean deletePlanAttend(Long planId,Short isDep,Short isPrimary);
}


