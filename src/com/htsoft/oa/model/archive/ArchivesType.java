package com.htsoft.oa.model.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * ArchivesType Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������������
 */
public class ArchivesType extends com.htsoft.core.model.BaseModel {

    protected Long typeId;
	protected String typeName;
	protected String typeDesc;

	protected java.util.Set archTemplates = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ArchivesType
	 */
	public ArchivesType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ArchivesType
	 */
	public ArchivesType (
		 Long in_typeId
        ) {
		this.setTypeId(in_typeId);
    }


	public java.util.Set getArchTemplates () {
		return archTemplates;
	}	
	
	public void setArchTemplates (java.util.Set in_archTemplates) {
		this.archTemplates = in_archTemplates;
	}
    

	/**
	 * 	 * @return Long
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
	 * 类型名称	 * @return String
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
	 * 类型描述	 * @return String
	 * @hibernate.property column="typeDesc" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getTypeDesc() {
		return this.typeDesc;
	}
	
	/**
	 * Set the typeDesc
	 */	
	public void setTypeDesc(String aValue) {
		this.typeDesc = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ArchivesType)) {
			return false;
		}
		ArchivesType rhs = (ArchivesType) object;
		return new EqualsBuilder()
				.append(this.typeId, rhs.typeId)
				.append(this.typeName, rhs.typeName)
				.append(this.typeDesc, rhs.typeDesc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.typeId) 
				.append(this.typeName) 
				.append(this.typeDesc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("typeId", this.typeId) 
				.append("typeName", this.typeName) 
				.append("typeDesc", this.typeDesc) 
				.toString();
	}



}
