package com.htsoft.oa.service.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.admin.DepreRecord;

public interface DepreRecordService extends BaseService<DepreRecord>{
	public Date findMaxDate(Long assetsId);
}


