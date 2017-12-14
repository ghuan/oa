package com.htsoft.oa.model.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * Job Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class Job extends com.htsoft.core.model.BaseModel {

	public static short DELFLAG_NOT = (short)0;
	public static short DELFLAG_HAD = (short)1;
	
    protected Long jobId;
	protected String jobName;
	protected String memo;
	protected Short delFlag;
	protected com.htsoft.oa.model.system.Department department;

	protected java.util.Set empProfiles = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class Job
	 */
	public Job () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class Job
	 */
	public Job (
		 Long in_jobId
        ) {
		this.setJobId(in_jobId);
    }

	
	public com.htsoft.oa.model.system.Department getDepartment () {
		return department;
	}	
	
	public void setDepartment (com.htsoft.oa.model.system.Department in_department) {
		this.department = in_department;
	}

	public java.util.Set getEmpProfiles () {
		return empProfiles;
	}	
	
	public void setEmpProfiles (java.util.Set in_empProfiles) {
		this.empProfiles = in_empProfiles;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="jobId" type="java.lang.Long" generator-class="native"
	 */
	public Long getJobId() {
		return this.jobId;
	}
	
	/**
	 * Set the jobId
	 */	
	public void setJobId(Long aValue) {
		this.jobId = aValue;
	}	

	/**
	 * 职位名称	 * @return String
	 * @hibernate.property column="jobName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getJobName() {
		return this.jobName;
	}
	
	/**
	 * Set the jobName
	 * @spring.validator type="required"
	 */	
	public void setJobName(String aValue) {
		this.jobName = aValue;
	}	

	/**
	 * 所属部门	 * @return Long
	 */
	public Long getDepId() {
		return this.getDepartment()==null?null:this.getDepartment().getDepId();
	}
	
	/**
	 * Set the depId
	 */	
	public void setDepId(Long aValue) {
	    if (aValue==null) {
	    	department = null;
	    } else if (department == null) {
	        department = new com.htsoft.oa.model.system.Department(aValue);
	        department.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			department.setDepId(aValue);
	    }
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="memo" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getMemo() {
		return this.memo;
	}
	
	/**
	 * Set the memo
	 */	
	public void setMemo(String aValue) {
		this.memo = aValue;
	}	

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Job)) {
			return false;
		}
		Job rhs = (Job) object;
		return new EqualsBuilder()
				.append(this.jobId, rhs.jobId)
				.append(this.jobName, rhs.jobName)
				.append(this.memo, rhs.memo)
				.append(this.delFlag, rhs.delFlag)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.jobId) 
				.append(this.jobName) 
				.append(this.memo) 
				.append(this.delFlag)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("jobId", this.jobId) 
				.append("jobName", this.jobName) 
				.append("memo", this.memo) 
				.append("delFlag",this.delFlag)
				.toString();
	}



}
