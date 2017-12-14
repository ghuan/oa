package com.htsoft.oa.dao.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.PhoneGroupDao;
import com.htsoft.oa.model.communicate.PhoneGroup;

public class PhoneGroupDaoImpl extends BaseDaoImpl<PhoneGroup> implements PhoneGroupDao{

	public PhoneGroupDaoImpl() {
		super(PhoneGroup.class);
	}

	@Override
	public Integer findLastSn(Long userId) {
		String hql = "select max(sn) from PhoneGroup vo where vo.appUser.userId=?";
		Object[] object={userId};
		List list =findByHql(hql,object);
		return (Integer)list.get(0);
	}

	@Override
	public PhoneGroup findBySn(Integer sn, Long userId) {
		String hql="select vo from PhoneGroup vo where vo.appUser.userId=? and vo.sn=?";
		Object[] object ={userId,sn};
		List<PhoneGroup> list=findByHql(hql,object);
		return (PhoneGroup)list.get(0);
	}

	@Override
	public List<PhoneGroup> findBySnUp(Integer sn, Long userId) {
		String hql="from PhoneGroup vo where vo.appUser.userId=? and vo.sn<?";
		Object[] object ={userId,sn};
		return findByHql(hql,object);
	}

	@Override
	public List<PhoneGroup> findBySnDown(Integer sn, Long userId) {
		String hql="from PhoneGroup vo where vo.appUser.userId=? and vo.sn>?";
		Object[] object ={userId,sn};
		return findByHql(hql,object);
	}

	@Override
	public List<PhoneGroup> getAll(Long userId) {
		String hql="from PhoneGroup vo where vo.appUser.userId=? order by vo.sn asc";
		Object[] object={userId};
		return findByHql(hql,object);
	}
}