package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.CartRepairDao;
import com.htsoft.oa.model.admin.CartRepair;
import com.htsoft.oa.service.admin.CartRepairService;

public class CartRepairServiceImpl extends BaseServiceImpl<CartRepair> implements CartRepairService{
	private CartRepairDao dao;
	
	public CartRepairServiceImpl(CartRepairDao dao) {
		super(dao);
		this.dao=dao;
	}

}