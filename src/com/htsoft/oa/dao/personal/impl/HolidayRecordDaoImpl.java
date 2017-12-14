package com.htsoft.oa.dao.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.personal.HolidayRecordDao;
import com.htsoft.oa.model.personal.HolidayRecord;

public class HolidayRecordDaoImpl extends BaseDaoImpl<HolidayRecord> implements HolidayRecordDao{

	public HolidayRecordDaoImpl() {
		super(HolidayRecord.class);
	}

}