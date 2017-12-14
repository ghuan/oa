package com.htsoft.core.jbpm.pv;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.Serializable;

/**
 * 流程中的参与人员
 * @author csx
 *
 */
public class UserInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户的DB对应中的id
	 */
	private Long userId;
	/**
	 * 用户的账号
	 */
	private String username;
	/**
	 * 用户的姓名
	 */
	private String fullname;

	public UserInfo() {
		
	}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
}
