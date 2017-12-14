package com.htsoft.oa.dao.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.customer.ProjectDao;
import com.htsoft.oa.model.customer.Project;

public class ProjectDaoImpl extends BaseDaoImpl<Project> implements ProjectDao{

	public ProjectDaoImpl() {
		super(Project.class);
	}

	@Override
	public boolean checkProjectNo(final String projectNo) {
		final String hql = "select count(*) from Project p where p.projectNo = ?";
		Long count = (Long)getHibernateTemplate().execute(new HibernateCallback(){
			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, projectNo);
				return query.uniqueResult();
			}});
		if(count!=0){
			return false;
		}else{
			return true;
		}
	}

}