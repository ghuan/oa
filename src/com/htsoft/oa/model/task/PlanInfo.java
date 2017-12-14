package com.htsoft.oa.model.task;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.text.SimpleDateFormat;

/**
 * 用于显示今日日程的信息
 * @author csx
 *
 */
public class PlanInfo {
	
	private Long planId;
	private String content;
	private String durationTime;
	
	private String status;
	private String urgent;
	public Long getPlanId() {
		return planId;
	}
	public void setPlanId(Long planId) {
		this.planId = planId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDurationTime() {
		return durationTime;
	}
	public void setDurationTime(String durationTime) {
		this.durationTime = durationTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUrgent() {
		return urgent;
	}
	public void setUrgent(String urgent) {
		this.urgent = urgent;
	}
	
	public PlanInfo() {
	}
	
	public PlanInfo(CalendarPlan cp){
		this.planId=cp.getPlanId();
		this.content=cp.getContent();
		
		SimpleDateFormat sdf=new SimpleDateFormat("HH:mm");
		this.durationTime=sdf.format(cp.getStartTime()) + "--" + sdf.format(cp.getEndTime());
		this.urgent=cp.getUrgentName();
		this.status=cp.getStatusName();
	}
}
