package com.htsoft.oa.dao.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.AppointmentDao;
import com.htsoft.oa.model.task.Appointment;

public class AppointmentDaoImpl extends BaseDaoImpl<Appointment> implements AppointmentDao{

	public AppointmentDaoImpl() {
		super(Appointment.class);
	}
	/**
	 * 根据当前用户ID读取约会列表在首页显示
	 */
	@Override
	public List showAppointmentByUserId(Long userId, PagingBean pb) {
		ArrayList paramList = new ArrayList();
		StringBuffer hql = new StringBuffer("select vo from Appointment vo where vo.appUser.userId=?");
		paramList.add(userId);
		hql.append(" order by vo.appointId desc");

		return findByHql(hql.toString(), paramList.toArray(), pb);
	}

}