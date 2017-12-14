package com.htsoft.oa.model.system;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * Dictionary Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ����������������
 */
public class Dictionary extends com.htsoft.core.model.BaseModel {

    protected Long dicId;
	protected String itemName;
	protected String itemValue;
	protected String descp;


	/**
	 * Default Empty Constructor for class Dictionary
	 */
	public Dictionary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class Dictionary
	 */
	public Dictionary (
		 Long in_dicId
        ) {
		this.setDicId(in_dicId);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="dicId" type="java.lang.Long" generator-class="native"
	 */
	public Long getDicId() {
		return this.dicId;
	}
	
	/**
	 * Set the dicId
	 */	
	public void setDicId(Long aValue) {
		this.dicId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="itemName" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getItemName() {
		return this.itemName;
	}
	
	/**
	 * Set the itemName
	 * @spring.validator type="required"
	 */	
	public void setItemName(String aValue) {
		this.itemName = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="itemValue" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getItemValue() {
		return this.itemValue;
	}
	
	/**
	 * Set the itemValue
	 * @spring.validator type="required"
	 */	
	public void setItemValue(String aValue) {
		this.itemValue = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="descp" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getDescp() {
		return this.descp;
	}
	
	/**
	 * Set the descp
	 */	
	public void setDescp(String aValue) {
		this.descp = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Dictionary)) {
			return false;
		}
		Dictionary rhs = (Dictionary) object;
		return new EqualsBuilder()
				.append(this.dicId, rhs.dicId)
				.append(this.itemName, rhs.itemName)
				.append(this.itemValue, rhs.itemValue)
				.append(this.descp, rhs.descp)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.dicId) 
				.append(this.itemName) 
				.append(this.itemValue) 
				.append(this.descp) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("dicId", this.dicId) 
				.append("itemName", this.itemName) 
				.append("itemValue", this.itemValue) 
				.append("descp", this.descp) 
				.toString();
	}



}
