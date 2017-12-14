package com.htsoft.oa.service.customer;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.customer.CusLinkman;

public interface CusLinkmanService extends BaseService<CusLinkman>{

	public boolean checkMainCusLinkman(Long customerId, Long linkmanId);
	
}


