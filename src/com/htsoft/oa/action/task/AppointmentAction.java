package com.htsoft.oa.action.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.task.Appointment;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.task.AppointmentService;
/**
 * 
 * @author csx
 *
 */
public class AppointmentAction extends BaseAction{
	@Resource
	private AppointmentService appointmentService;
	private Appointment appointment;
	@Resource
	private AppUserService appUserService;
	private Long appointId;
	private List<Appointment> list;
	public List<Appointment> getList() {
		return list;
	}

	public void setList(List<Appointment> list) {
		this.list = list;
	}

	public Long getAppointId() {
		return appointId;
	}

	public void setAppointId(Long appointId) {
		this.appointId = appointId;
	}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<Appointment> list= appointmentService.getAll(filter);
		
		Type type=new TypeToken<List<Appointment>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				appointmentService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		Appointment appointment=appointmentService.get(appointId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appointment));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		appointment.setAppUser(ContextUtil.getCurrentUser());
		appointmentService.save(appointment);
		setJsonString("{success:true}");
		return SUCCESS;
	}

}
