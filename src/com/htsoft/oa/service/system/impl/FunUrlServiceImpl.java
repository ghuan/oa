package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.FunUrlDao;
import com.htsoft.oa.model.system.FunUrl;
import com.htsoft.oa.service.system.FunUrlService;

public class FunUrlServiceImpl extends BaseServiceImpl<FunUrl> implements FunUrlService{
	private FunUrlDao dao;
	
	public FunUrlServiceImpl(FunUrlDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.system.FunUrlService#getByPathFunId(java.lang.String, java.lang.Long)
	 */
	public FunUrl getByPathFunId(String path,Long funId){
		return dao.getByPathFunId(path, funId);
	}

}