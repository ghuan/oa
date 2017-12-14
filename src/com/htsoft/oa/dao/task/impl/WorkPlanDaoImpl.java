package com.htsoft.oa.dao.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.WorkPlanDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.task.WorkPlan;

public class WorkPlanDaoImpl extends BaseDaoImpl<WorkPlan> implements WorkPlanDao{

	public WorkPlanDaoImpl() {
		super(WorkPlan.class);
	}

	@Override
	public List<WorkPlan> findByDepartment(WorkPlan workPlan,AppUser user, PagingBean pb) {
		StringBuffer sb=new StringBuffer();
		ArrayList list=new ArrayList();
	    if(!user.getRights().contains(AppRole.SUPER_RIGHTS)){
			sb.append("select wp from WorkPlan wp,PlanAttend pa where pa.workPlan=wp and wp.status=1 and wp.isPersonal=0 and ((pa.appUser.userId=? and pa.isDep=0)");
			Department dep=user.getDepartment();
			list.add(user.getUserId());
			if(dep!=null){
				String path=dep.getPath();
			    if(StringUtils.isNotEmpty(path)){
					StringBuffer buff=new StringBuffer(path.replace(".", ","));
					buff.deleteCharAt(buff.length()-1);
					sb.append(" or (pa.department.depId in ("+buff.toString()+") and pa.isDep=1)");
				}
			}
			sb.append(")");
	    }else{
	    	sb.append("select wp from WorkPlan wp where wp.status=1 and wp.isPersonal=0");
	    }
		if(workPlan!=null){
			if(StringUtils.isNotEmpty(workPlan.getPlanName())){
				sb.append(" and wp.planName like ?");
				list.add("%"+workPlan.getPlanName()+"%");
			}
			if(StringUtils.isNotEmpty(workPlan.getPrincipal())){
				sb.append(" and wp.principal like ?");
				list.add("%"+workPlan.getPrincipal()+"%");
			}
			if(workPlan.getPlanType()!=null){
				if(workPlan.getPlanType().getTypeId()!=null){
					sb.append(" and wp.planType.typeId = ?");
					list.add(workPlan.getPlanType().getTypeId());
				}
			}
		}
		
		sb.append(" group by wp.planId");
		return findByHql(sb.toString(), list.toArray(),pb);
	}

}