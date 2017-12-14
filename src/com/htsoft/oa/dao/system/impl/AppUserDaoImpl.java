package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.userdetails.UserDetails;
import org.springframework.security.userdetails.UserDetailsService;
import org.springframework.security.userdetails.UsernameNotFoundException;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;

public class AppUserDaoImpl extends BaseDaoImpl<AppUser> implements AppUserDao,
		UserDetailsService {

	public AppUserDaoImpl() {
		super(AppUser.class);
	}

	@Override
	public AppUser findByUserName(String username) {
		String hql = "from AppUser au where au.username=?";
		Object[] params = {username};
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = list.get(0);
		}
		return user;
	}

	@Override
	public UserDetails loadUserByUsername(final String username)
			throws UsernameNotFoundException, DataAccessException {
		return (UserDetails) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						String hql = "from AppUser ap where ap.username=? and ap.delFlag = ?";
						Query query = session.createQuery(hql);
						query.setString(0, username);
						query.setShort(1, Constants.FLAG_UNDELETED);
						AppUser user = null;
						try {
							user = (AppUser) query.uniqueResult();
							if (user != null) {
								Hibernate.initialize(user.getRoles());
								Hibernate.initialize(user.getDepartment());
								
								//进行合并权限的处理
								Set<AppRole> roleSet=user.getRoles();
								Iterator<AppRole> it=roleSet.iterator();
								
								while(it.hasNext()){
									AppRole role=it.next();
									if(role.getRoleId().equals(AppRole.SUPER_ROLEID)){//具有超级权限
										user.getRights().clear();
										user.getRights().add(AppRole.SUPER_RIGHTS);
										break;
									}else{
										if(StringUtils.isNotEmpty(role.getRights())){
											String[]items=role.getRights().split("[,]");
											for(int i=0;i<items.length;i++){
												if(!user.getRights().contains(items[i])){
													user.getRights().add(items[i]);
												}
											}
										}
									}
								}
								
							}
						} catch (Exception ex) {
							logger.warn("user:" + username
									+ " can't not loding rights:"
									+ ex.getMessage());
						}
						return user;
					}
				});
	}

	/**
	 * 根据部门PATH属性查找
	 */
	@Override
	public List findByDepartment(String path,PagingBean pb) {
		List list=new ArrayList();
		String hql=new String();
		if("0.".equals(path)){
			hql="from AppUser vo2 where vo2.delFlag = ?";
			list.add(Constants.FLAG_UNDELETED);
		}else{
			hql="select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ?";
		    list.add(path+"%");
		    list.add(Constants.FLAG_UNDELETED);
		}
		return findByHql(hql,list.toArray(),pb);
	}

	@Override
	public List findByDepartment(Department department) {
		String hql="select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ?";
		Object[] params = { department.getPath()+"%",Constants.FLAG_UNDELETED };		
		return findByHql(hql,params);
	}

	@Override
	public List findByRole(Long roleId) {
		String hql="select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ?";
		Object[] objs={roleId,Constants.FLAG_UNDELETED};
		return findByHql(hql, objs);
	}

	@Override
	public List findByRole(Long roleId, PagingBean pb) {
		String hql="select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ?";
		Object[] objs={roleId,Constants.FLAG_UNDELETED};
		return findByHql(hql,objs,pb);
	}

	@Override
	public List<AppUser> findByDepartment(String path) {
		String hql="select vo2 from Department vo1,AppUser vo2 where vo1.depId=vo2.depId and vo1.path like ? and vo2.delFlag =?";
		Object[] params = {path+"%",Constants.FLAG_UNDELETED };		
		return findByHql(hql,params);
	}
	
	public List findByRoleId(Long roleId){
		String hql="select vo from AppUser vo join vo.roles as roles where roles.roleId=? and vo.delFlag =?";
		return findByHql(hql,new Object[]{roleId ,Constants.FLAG_UNDELETED});
	}
	
	public List findByUserIds(Long... userIds){
		String hql="select vo from AppUser vo where vo.delFlag=? ";

		if(userIds==null || userIds.length==0) return null;
		hql+=" where vo.userId in (";
		int i=0;
		for(Long userId:userIds){
			if(i++>0){
				hql+=",";
			}
			hql+="?";
		}
		hql+=" )";
		
		return findByHql(hql,new Object[]{Constants.FLAG_UNDELETED,userIds});
	}

	@Override
	public List<AppUser> findSubAppUser(String path,Set<Long> userIds,PagingBean pb) {
		String st="";
		if(userIds.size()>0){
			Iterator<Long> it=userIds.iterator();
			StringBuffer sb=new StringBuffer();			
			while(it.hasNext()){
				sb.append(it.next().toString()+",");
			}
			sb.deleteCharAt(sb.length()-1);
			st=sb.toString();
		}
		
		List list=new ArrayList();
		StringBuffer hql=new StringBuffer();
		if(path!=null){
			hql.append("select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department ");
		  hql.append(" and vo1.path like ?");
		  list.add(path+"%");
		}else{
			hql.append("from AppUser vo2 where 1=1 ");
		}
		if(st!=""){
		  hql.append(" and vo2.userId not in ("+st+")");
		}		
		hql.append(" and vo2.delFlag = ?");
		list.add(Constants.FLAG_UNDELETED);
		return findByHql(hql.toString(),list.toArray(),pb);
	}

	@Override
	public List<AppUser> findSubAppUserByRole(Long roleId, Set<Long> userIds,
			PagingBean pb) {
		String st="";
		if(userIds.size()>0){
			Iterator<Long> it=userIds.iterator();
			StringBuffer sb=new StringBuffer();			
			while(it.hasNext()){
				sb.append(it.next().toString()+",");
			}
			sb.deleteCharAt(sb.length()-1);
			st=sb.toString();
		}
		StringBuffer hql=new StringBuffer("select vo from AppUser vo join vo.roles roles where roles.roleId=?");
		List list=new ArrayList();
		list.add(roleId);
		if(st!=""){
		  hql.append(" and vo.userId not in ("+st+")");
		}
		hql.append(" and vo.delFlag =?");
		list.add(Constants.FLAG_UNDELETED);
		return findByHql(hql.toString(),list.toArray(),pb);
	}
}
