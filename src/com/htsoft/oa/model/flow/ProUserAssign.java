package com.htsoft.oa.model.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * ProUserAssign Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ProUserAssign extends com.htsoft.core.model.BaseModel {

    protected Long assignId;
	protected String deployId;
	protected String activityName;
	protected String roleId;
	protected String roleName;
	protected String userId;
	protected String username;
	
	protected Short isSigned;

	/**
	 * Default Empty Constructor for class ProUserAssign
	 */
	public ProUserAssign () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ProUserAssign
	 */
	public ProUserAssign (
		 Long in_assignId
        ) {
		this.setAssignId(in_assignId);
    }

	public Short getIsSigned() {
		return isSigned;
	}

	public void setIsSigned(Short isSigned) {
		this.isSigned = isSigned;
	}

	/**
	 * 授权ID	 * @return Long
     * @hibernate.id column="assignId" type="java.lang.Long" generator-class="native"
	 */
	public Long getAssignId() {
		return this.assignId;
	}
	
	/**
	 * Set the assignId
	 */	
	public void setAssignId(Long aValue) {
		this.assignId = aValue;
	}	

	/**
	 * jbpm流程定义的id	 * @return String
	 * @hibernate.property column="deployId" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getDeployId() {
		return this.deployId;
	}
	
	/**
	 * Set the deployId
	 * @spring.validator type="required"
	 */	
	public void setDeployId(String aValue) {
		this.deployId = aValue;
	}	

	/**
	 * 流程节点名称	 * @return String
	 * @hibernate.property column="activityName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getActivityName() {
		return this.activityName;
	}
	
	/**
	 * Set the activityName
	 * @spring.validator type="required"
	 */	
	public void setActivityName(String aValue) {
		this.activityName = aValue;
	}	

	/**
	 * 角色Id	 * @return String
	 * @hibernate.property column="roleId" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getRoleId() {
		return this.roleId;
	}
	
	/**
	 * Set the roleId
	 */	
	public void setRoleId(String aValue) {
		this.roleId = aValue;
	}	

	/**
	 * 用户ID	 * @return String
	 * @hibernate.property column="userId" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(String aValue) {
		this.userId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ProUserAssign)) {
			return false;
		}
		ProUserAssign rhs = (ProUserAssign) object;
		return new EqualsBuilder()
				.append(this.assignId, rhs.assignId)
				.append(this.deployId, rhs.deployId)
				.append(this.activityName, rhs.activityName)
				.append(this.roleId, rhs.roleId)
				.append(this.userId, rhs.userId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.assignId) 
				.append(this.deployId) 
				.append(this.activityName) 
				.append(this.roleId) 
				.append(this.userId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("assignId", this.assignId) 
				.append("deployId", this.deployId) 
				.append("activityName", this.activityName) 
				.append("roleId", this.roleId) 
				.append("userId", this.userId) 
				.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "assignId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return assignId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
