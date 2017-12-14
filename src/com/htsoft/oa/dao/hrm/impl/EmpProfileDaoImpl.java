package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.EmpProfileDao;
import com.htsoft.oa.model.hrm.EmpProfile;

public class EmpProfileDaoImpl extends BaseDaoImpl<EmpProfile> implements EmpProfileDao{

	public EmpProfileDaoImpl() {
		super(EmpProfile.class);
	}

	@Override
	public boolean checkProfileNo(final String profileNo) {
		final String hql = "select count(*) from EmpProfile ep where ep.profileNo = ?";
		Long count = (Long)getHibernateTemplate().execute(new HibernateCallback(){
			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, profileNo);
				return query.uniqueResult();
			}});
		if(count!=0){
			return false;
		}else{
			return true;
		}
	}

}