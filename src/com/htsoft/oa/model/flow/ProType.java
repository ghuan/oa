package com.htsoft.oa.model.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import flexjson.JSON;

/**
 * ProType Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 流程分类
 */
public class ProType  {

    protected Long typeId;
	protected String typeName;

	//protected java.util.Set proDefinitions = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ProType
	 */
	public ProType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ProType
	 */
	public ProType (
		 Long in_typeId
        ) {
		this.setTypeId(in_typeId);
    }


//	public java.util.Set getProDefinitions () {
//		return proDefinitions;
//	}	
//	
//	public void setProDefinitions (java.util.Set in_proDefinitions) {
//		this.proDefinitions = in_proDefinitions;
//	}
    

	/**
	 * 类别ID	 * @return Long
     * @hibernate.id column="typeId" type="java.lang.Long" generator-class="native"
	 */
	public Long getTypeId() {
		return this.typeId;
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
		this.typeId = aValue;
	}	

	/**
	 * 分类名称	 * @return String
	 * @hibernate.property column="typeName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTypeName() {
		return this.typeName;
	}
	
	/**
	 * Set the typeName
	 * @spring.validator type="required"
	 */	
	public void setTypeName(String aValue) {
		this.typeName = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ProType)) {
			return false;
		}
		ProType rhs = (ProType) object;
		return new EqualsBuilder()
				.append(this.typeId, rhs.typeId)
				.append(this.typeName, rhs.typeName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.typeId) 
				.append(this.typeName) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("typeId", this.typeId) 
				.append("typeName", this.typeName) 
				.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	@JSON(include=false)
	public String getFirstKeyColumnName() {
		return "typeId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	@JSON
	public Long getId() {
		return typeId;
	}

}
