package com.htsoft.oa.dao.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.DepreRecord;

/**
 * 
 * @author 
 *
 */
public interface DepreRecordDao extends BaseDao<DepreRecord>{
	/**
	 * 查找出最近折旧的时间
	 * @param assetsId
	 * @return
	 */
	
	public Date findMaxDate(Long assetsId);
}