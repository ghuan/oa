package com.htsoft.oa.dao.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.FormData;

/**
 * 
 * @author 
 *
 */
public interface FormDataDao extends BaseDao<FormData>{
	/**
	 * 取得某个流程某个活动下的表单数据
	 * @param runId
	 * @param activityName
	 * @return
	 */
	public List<FormData> getByRunIdActivityName(Long runId,String activityName);
	
	/**
	 * 取得某个表单某个字段的数据
	 * @param formId
	 * @param fieldName
	 * @return
	 */
	public FormData getByFormIdFieldName(Long formId,String fieldName);
}