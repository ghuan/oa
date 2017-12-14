package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.DepreRecordDao;
import com.htsoft.oa.model.admin.DepreRecord;
import com.htsoft.oa.service.admin.DepreRecordService;

public class DepreRecordServiceImpl extends BaseServiceImpl<DepreRecord> implements DepreRecordService{
	private DepreRecordDao dao;
	
	public DepreRecordServiceImpl(DepreRecordDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Date findMaxDate(Long assetsId) {
		return dao.findMaxDate(assetsId);
	}

}