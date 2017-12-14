package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.SysConfigDao;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.SysConfigService;

public class SysConfigServiceImpl extends BaseServiceImpl<SysConfig> implements SysConfigService{
	private SysConfigDao dao;
	
	public SysConfigServiceImpl(SysConfigDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public SysConfig findByKey(String key) {
		return dao.findByKey(key);
	}

	@Override
	public Map findByType() {
		List<String> list=dao.findTypeNames();
		Map cList=new HashMap();
		for(String typeName:list){
			List<SysConfig> confList=dao.findConfigByTypeName(typeName);
			cList.put(typeName, confList);
		}
		return cList;
	}

}