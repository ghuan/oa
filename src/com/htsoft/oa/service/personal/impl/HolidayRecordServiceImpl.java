package com.htsoft.oa.service.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.personal.HolidayRecordDao;
import com.htsoft.oa.model.personal.HolidayRecord;
import com.htsoft.oa.service.personal.HolidayRecordService;

public class HolidayRecordServiceImpl extends BaseServiceImpl<HolidayRecord> implements HolidayRecordService{
	private HolidayRecordDao dao;
	
	public HolidayRecordServiceImpl(HolidayRecordDao dao) {
		super(dao);
		this.dao=dao;
	}

}