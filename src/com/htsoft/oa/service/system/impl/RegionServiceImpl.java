package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.RegionDao;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.service.system.RegionService;

public class RegionServiceImpl extends BaseServiceImpl<Region> implements RegionService{
	private RegionDao dao;
	
	public RegionServiceImpl(RegionDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Region> getProvince() {
		return dao.getProvince();
	}

	@Override
	public List<Region> getCity(Long regionId) {
		return dao.getCity(regionId);
	}

}