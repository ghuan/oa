package com.htsoft.oa.service.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProDefinition;

public interface ProDefinitionService extends BaseService<ProDefinition>{
	public ProDefinition getByDeployId(String deployId);
}


