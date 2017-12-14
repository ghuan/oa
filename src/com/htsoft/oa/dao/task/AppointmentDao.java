package com.htsoft.oa.dao.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.task.Appointment;

/**
 * 
 * @author 
 *
 */
public interface AppointmentDao extends BaseDao<Appointment>{
	//首页中根据当前登录用户显示约会列表
	public List showAppointmentByUserId(Long userId,PagingBean pb);
}