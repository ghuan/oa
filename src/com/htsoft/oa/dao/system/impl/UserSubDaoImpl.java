package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.UserSubDao;
import com.htsoft.oa.model.system.UserSub;

public class UserSubDaoImpl extends BaseDaoImpl<UserSub> implements UserSubDao{

	public UserSubDaoImpl() {
		super(UserSub.class);
	}

	@Override
	public List<Long> upUser(Long userId) {
		String hql="from UserSub vo where vo.subAppUser.userId=?";
		Object[] objs={userId};
		List<UserSub> list=findByHql(hql, objs);
		List<Long> idList=new ArrayList<Long>();
		for(UserSub sb:list){
			idList.add(sb.getUserId());
		}
		return idList;
	}

	@Override
	public List<Long> subUsers(Long userId) {
		String hql="from UserSub vo where vo.userId=?";
		Object[] objs={userId};
		List<UserSub> list=findByHql(hql, objs);
		List<Long> idList=new ArrayList<Long>();
		for(UserSub sb:list){
			idList.add(sb.getSubAppUser().getUserId());
		}
		return idList;
	}

}