package com.htsoft.oa.service.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.hrm.SalaryItem;

public interface SalaryItemService extends BaseService<SalaryItem>{

	public List<SalaryItem> getAllExcludeId(String excludeIds,PagingBean pb);
	
}


