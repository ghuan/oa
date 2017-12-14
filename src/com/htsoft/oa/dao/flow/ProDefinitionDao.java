package com.htsoft.oa.dao.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProDefinition;

/**
 * 
 * @author 
 *
 */
public interface ProDefinitionDao extends BaseDao<ProDefinition>{
	/**
	 * 按发布ID取得XML
	 * @param deployId
	 * @return
	 */
	public ProDefinition getByDeployId(String deployId);
	
}