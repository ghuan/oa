package com.htsoft.oa.service.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.hrm.StandSalary;

public interface StandSalaryService extends BaseService<StandSalary>{

	public boolean checkStandNo(String standardNo);
	/**
	 * 查找审核通过的工资标准列表
	 * @return  通过的工资标准列表
	 */
	public List<StandSalary> findByPassCheck();
	
}


