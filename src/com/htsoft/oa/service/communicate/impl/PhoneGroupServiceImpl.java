package com.htsoft.oa.service.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.PhoneGroupDao;
import com.htsoft.oa.model.communicate.PhoneGroup;
import com.htsoft.oa.service.communicate.PhoneGroupService;

public class PhoneGroupServiceImpl extends BaseServiceImpl<PhoneGroup> implements PhoneGroupService{
	private PhoneGroupDao dao;
	
	public PhoneGroupServiceImpl(PhoneGroupDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Integer findLastSn(Long userId) {
		return dao.findLastSn(userId);
	}

	@Override
	public PhoneGroup findBySn(Integer sn, Long userId) {
		return dao.findBySn(sn, userId);
	}

	@Override
	public List<PhoneGroup> findBySnUp(Integer sn, Long userId) {
		return dao.findBySnUp(sn, userId);
	}

	@Override
	public List<PhoneGroup> findBySnDown(Integer sn, Long userId) {
		return dao.findBySnDown(sn, userId);
	}

	@Override
	public List<PhoneGroup> getAll(Long userId) {
		return dao.getAll(userId);
	}

}