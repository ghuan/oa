package com.htsoft.oa.dao.system.impl;
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
import com.htsoft.oa.dao.system.FileAttachDao;
import com.htsoft.oa.model.system.FileAttach;

public class FileAttachDaoImpl extends BaseDaoImpl<FileAttach> implements FileAttachDao{

	public FileAttachDaoImpl() {
		super(FileAttach.class);
	}

	@Override
	public void removeByPath(final String filePath) {
		final String hql = "delete from FileAttach fa where fa.filePath = ?";
		getHibernateTemplate().execute(new HibernateCallback() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
				Query query  = session.createQuery(hql);
				query.setString(0, filePath);
				return query.executeUpdate();
			}
		});
	}
	
	/**
	 * 按文件路径取得路径
	 * @param filePath
	 * @return
	 */
	public FileAttach getByPath(String filePath){
		String hql="from FileAttach fa where fa.filePath = ?";
		return (FileAttach)findUnique(hql, new Object[]{filePath});
	}

}