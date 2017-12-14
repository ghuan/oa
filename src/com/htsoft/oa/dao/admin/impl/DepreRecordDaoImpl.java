package com.htsoft.oa.dao.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import org.hibernate.Query;


import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.DepreRecordDao;
import com.htsoft.oa.model.admin.DepreRecord;

public class DepreRecordDaoImpl extends BaseDaoImpl<DepreRecord> implements DepreRecordDao{

	public DepreRecordDaoImpl() {
		super(DepreRecord.class);
	}

	@Override
	public Date findMaxDate(Long assetsId) {
		String hql="select max(vo.calTime) from DepreRecord vo where vo.fixedAssets.assetsId=?";//where vo.fixedAssets.assetsId=?
		Query query =getSession().createQuery(hql);
		query.setLong(0, assetsId);
		Date date=(Date)query.list().get(0);
		return date;
	}

}