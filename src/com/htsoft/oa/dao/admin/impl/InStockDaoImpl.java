package com.htsoft.oa.dao.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.InStockDao;
import com.htsoft.oa.model.admin.InStock;

public class InStockDaoImpl extends BaseDaoImpl<InStock> implements InStockDao{

	public InStockDaoImpl() {
		super(InStock.class);
	}

	@Override
	public Integer findInCountByBuyId(Long buyId) {
		String hql="select vo.inCounts from InStock vo where vo.buyId=?";
		Query query = getSession().createQuery(hql);
		query.setLong(0, buyId);
		Integer inCount=Integer.parseInt(query.list().iterator().next().toString());
		return inCount;
	}

}