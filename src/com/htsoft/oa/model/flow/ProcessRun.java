package com.htsoft.oa.model.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.Date;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

/**
 * ProcessRun Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ProcessRun extends com.htsoft.core.model.BaseModel {
	/**
	 * 流程初始化的运行状态，即流程尚未启动
	 */
	public static final Short RUN_STATUS_INIT=0;
	/**
	 * 流程正在运行
	 */
	public static final Short RUN_STATUS_RUNNING=1;
	/**
	 * 流程运行已经结束
	 */
	public static final Short RUN_STATUS_FINISHED=2;
	
    protected Long runId;
    @Expose
	protected String subject;
    @Expose
    protected String creator;
	@Expose
	protected Date createtime;
	@Expose
	protected ProDefinition proDefinition;
	@Expose
	protected String piId;
	@Expose
	protected Short runStatus=RUN_STATUS_INIT;
	
	protected com.htsoft.oa.model.system.AppUser appUser;

	protected java.util.Set processForms = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ProcessRun
	 */
	public ProcessRun () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ProcessRun
	 */
	public ProcessRun (
		 Long in_runId
        ) {
		this.setRunId(in_runId);
    }

	
	public ProDefinition getProDefinition() {
		return proDefinition;
	}

	public void setProDefinition(ProDefinition proDefinition) {
		this.proDefinition = proDefinition;
	}

	public com.htsoft.oa.model.system.AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (com.htsoft.oa.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}

	public java.util.Set getProcessForms () {
		return processForms;
	}	
	
	public void setProcessForms (java.util.Set in_processForms) {
		this.processForms = in_processForms;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="runId" type="java.lang.Long" generator-class="native"
	 */
	public Long getRunId() {
		return this.runId;
	}
	
	/**
	 * Set the runId
	 */	
	public void setRunId(Long aValue) {
		this.runId = aValue;
	}	

	/**
	 * 标题
            一般为流程名称＋格式化的时间	 * @return String
	 * @hibernate.property column="subject" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getSubject() {
		return this.subject;
	}
	
	/**
	 * Set the subject
	 * @spring.validator type="required"
	 */	
	public void setSubject(String aValue) {
		this.subject = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="creator" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCreator() {
		return this.creator;
	}
	
	/**
	 * Set the creator
	 */	
	public void setCreator(String aValue) {
		this.creator = aValue;
	}	

	/**
	 * 所属用户	 * @return Long
	 */
	public Long getUserId() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new com.htsoft.oa.model.system.AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			appUser.setUserId(aValue);
	    }
	}	

	
	/**
	 * 流程实例ID	 * @return String
	 * @hibernate.property column="piId" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getPiId() {
		return this.piId;
	}
	
	/**
	 * Set the piId
	 */	
	public void setPiId(String aValue) {
		this.piId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ProcessRun)) {
			return false;
		}
		ProcessRun rhs = (ProcessRun) object;
		return new EqualsBuilder()
				.append(this.runId, rhs.runId)
				.append(this.subject, rhs.subject)
				.append(this.creator, rhs.creator)
				.append(this.piId, rhs.piId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.runId) 
				.append(this.subject) 
				.append(this.creator)
				.append(this.piId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("runId", this.runId) 
				.append("subject", this.subject) 
				.append("creator", this.creator)
				.append("piId", this.piId) 
				.toString();
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Short getRunStatus() {
		return runStatus;
	}

	public void setRunStatus(Short runStatus) {
		this.runStatus = runStatus;
	}


}
