package com.htsoft.oa.dao.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.personal.DutySystemDao;
import com.htsoft.oa.model.personal.DutySystem;

public class DutySystemDaoImpl extends BaseDaoImpl<DutySystem> implements DutySystemDao{
	
	public DutySystemDaoImpl() {
		super(DutySystem.class);
	}
	
	/**
	 * 更新为非缺省
	 */
	public void updateForNotDefult(){
		final String hql="update DutySystem ds set ds.isDefault=? where ds.isDefault=?";
		getHibernateTemplate().execute(new HibernateCallback() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException,SQLException {
				Query query=session.createQuery(hql);
				query.setShort(0, DutySystem.NOT_DEFAULT);
				query.setShort(1, DutySystem.DEFAULT);
				query.executeUpdate();
				return null;
			}
		});
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.personal.DutySystemDao#getDefaultDutySystem()
	 */
	public List<DutySystem> getDefaultDutySystem(){
		String hql="from DutySystem ds where ds.isDefault=? ";
		return findByHql(hql,new Object[]{DutySystem.DEFAULT});
	}

}