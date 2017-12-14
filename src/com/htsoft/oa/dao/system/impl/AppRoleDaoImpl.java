package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.AppRoleDao;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.FunUrl;

public class AppRoleDaoImpl extends BaseDaoImpl<AppRole> implements AppRoleDao{

	public AppRoleDaoImpl() {
		super(AppRole.class);
	}
	
	public AppRole getByRoleName(String roleName){
		String hql="from AppRole ar where ar.roleName=?";
		return (AppRole)findUnique(hql, new Object[]{roleName});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.system.AppRoleDao#getSecurityDataSource()
	 */
	public HashMap<String,Set<String>> getSecurityDataSource() {
		final HashMap<String,Set<String>> source=new HashMap<String, Set<String>>();
		
		//TODO status must be handler
		
		getHibernateTemplate().execute(new HibernateCallback() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException,
					SQLException {
					String hql="from AppRole";
					Query query=session.createQuery(hql);
					List<AppRole> roleList=query.list();
					
					for(AppRole role:roleList){
						TreeSet<String> urlSet=new TreeSet<String>();
						//取得某个角色的所有URL,TODO
						Iterator<AppFunction> functions=role.getFunctions().iterator();
						
						while(functions.hasNext()){
							AppFunction fun=functions.next();
							Iterator<FunUrl> urlIt=fun.getFunUrls().iterator();
							while(urlIt.hasNext()){
								urlSet.add(urlIt.next().getUrlPath());
							}
						}
						
						source.put(role.getName(), urlSet);
					}
					return null;
			}
		});
		return source;
	}

}
