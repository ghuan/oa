package com.htsoft.oa.dao.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.OfficeGoodsDao;
import com.htsoft.oa.model.admin.OfficeGoods;

public class OfficeGoodsDaoImpl extends BaseDaoImpl<OfficeGoods> implements OfficeGoodsDao{

	public OfficeGoodsDaoImpl() {
		super(OfficeGoods.class);
	}

	@Override
	public List<OfficeGoods> findByWarm() {
		String hql="from OfficeGoods vo where ((vo.stockCounts<=vo.warnCounts and vo.isWarning=1) or (vo.stockCounts<=0))";
		return findByHql(hql);
	}

}