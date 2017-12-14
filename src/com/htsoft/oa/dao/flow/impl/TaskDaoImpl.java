package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.TaskDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;

public class TaskDaoImpl extends BaseDaoImpl<TaskImpl> implements TaskDao{

	public TaskDaoImpl() {
		super(TaskImpl.class);
	}
	/**
	 * 取得用户的对应的任务列表
	 * @param userId
	 * @return
	 */
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb){
		AppUser user=(AppUser)getHibernateTemplate().load(AppUser.class, new Long(userId));
		Iterator<AppRole> rolesIt=user.getRoles().iterator();
		StringBuffer groupIds=new StringBuffer();
		int i=0;
		while(rolesIt.hasNext()){
			if(i++>0)groupIds.append(",");
			groupIds.append("'"+rolesIt.next().getRoleId().toString()+"'");
		}
		/**
		 *  select * from `jbpm4_task` task
			left join jbpm4_participation pt on task.`DBID_`=pt.`TASK_`
			where task.`ASSIGNEE_`='1' or ( pt.`TYPE_` = 'candidate' and (pt.`USERID_`='1')
			or pt.`GROUPID_`in ('1'))
		 */
		StringBuffer hqlSb=new StringBuffer();
		hqlSb.append("select task from org.jbpm.pvm.internal.task.TaskImpl task left join task.participations pt where task.assignee=?");
		hqlSb.append(" or ( task.assignee is null and pt.type = 'candidate' and ((pt.userId=?)");
		
		if(user.getRoles().size()>0){
			hqlSb.append(" or (pt.groupId in ("+groupIds.toString()+"))");
		}
		hqlSb.append("))");
		hqlSb.append(" order by task.priority desc");

		return findByHql(hqlSb.toString(), new Object[]{userId,userId},pb);
		
	}
}
