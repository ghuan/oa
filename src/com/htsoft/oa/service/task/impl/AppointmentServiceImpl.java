package com.htsoft.oa.service.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.AppointmentDao;
import com.htsoft.oa.model.task.Appointment;
import com.htsoft.oa.service.task.AppointmentService;

public class AppointmentServiceImpl extends BaseServiceImpl<Appointment> implements AppointmentService{
	private AppointmentDao dao;
	
	public AppointmentServiceImpl(AppointmentDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List showAppointmentByUserId(Long userId, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.showAppointmentByUserId(userId, pb);
	}

}