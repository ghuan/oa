package com.htsoft.oa.model.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

/**
 * UserSub Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * subordinate
 */
public class UserSub extends com.htsoft.core.model.BaseModel {

	@Expose
    protected Long subId;
	@Expose
	protected com.htsoft.oa.model.system.AppUser subAppUser;
	@Expose
	protected java.lang.Long userId;
//	protected com.htsoft.oa.model.system.AppUser appUser; //下属




	/**
	 * Default Empty Constructor for class UserSub
	 */
	public UserSub () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UserSub
	 */
	public UserSub (
		 Long in_subId
        ) {
		this.setSubId(in_subId);
    }

	

    

//	public com.htsoft.oa.model.system.AppUser getAppUser() {
//		return appUser;
//	}
//
//	public void setAppUser(com.htsoft.oa.model.system.AppUser appUser) {
//		this.appUser = appUser;
//	}
	
	
	
	public com.htsoft.oa.model.system.AppUser getSubAppUser() {
		return subAppUser;
	}

	public void setSubAppUser(com.htsoft.oa.model.system.AppUser subAppUser) {
		this.subAppUser = subAppUser;
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="subId" type="java.lang.Long" generator-class="native"
	 */
	public Long getSubId() {
		return this.subId;
	}
	
	/**
	 * Set the subId
	 */	
	public void setSubId(Long aValue) {
		this.subId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getSubUserId() {
		return this.getSubAppUser()==null?null:this.subAppUser.getUserId();
	}
	
	/**
	 * Set the subUserId
	 */	
	public void setSubUserId(Long aValue) {
	    if (aValue==null) {
	    	subAppUser = null;
	    } else if (subAppUser == null) {
	    	subAppUser = new com.htsoft.oa.model.system.AppUser(aValue);
	    	subAppUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	subAppUser.setUserId(aValue);
	    }
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="userId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getUserId() {
//		return this.appUser==null?null:this.appUser.getUserId();
	    return this.userId;
	}
	
	/**
	 * Set the userId
	 * @spring.validator type="required"
	 */	
	public void setUserId(Long aValue) {
//		if (aValue==null) {
//	    	appUser = null;
//	    } else if (appUser == null) {
//	    	appUser = new com.htsoft.oa.model.system.AppUser(aValue);
//	    	appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	appUser.setUserId(aValue);
//	    }
		this.userId=aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UserSub)) {
			return false;
		}
		UserSub rhs = (UserSub) object;
		return new EqualsBuilder()
				.append(this.subId, rhs.subId)
						.append(this.userId, rhs.userId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.subId) 
						.append(this.userId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("subId", this.subId) 
						.append("userId",this.userId) 
				.toString();
	}



}
