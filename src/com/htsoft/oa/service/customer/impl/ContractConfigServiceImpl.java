package com.htsoft.oa.service.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ContractConfigDao;
import com.htsoft.oa.model.customer.ContractConfig;
import com.htsoft.oa.service.customer.ContractConfigService;

public class ContractConfigServiceImpl extends BaseServiceImpl<ContractConfig> implements ContractConfigService{
	private ContractConfigDao dao;
	
	public ContractConfigServiceImpl(ContractConfigDao dao) {
		super(dao);
		this.dao=dao;
	}

}