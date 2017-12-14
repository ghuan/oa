package com.htsoft.oa.service.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.FormData;

public interface FormDataService extends BaseService<FormData>{
	/**
	 * 取得某个运行任务中的表单数据，返回一个Map,其值为name:value
	 * @param runId
	 * @param activityName
	 * @return
	 */
	Map<String,Object> getFromDataMap(Long runId,String activityName); 
}


