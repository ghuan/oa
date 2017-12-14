package com.htsoft.core.security;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;


import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.service.system.AppRoleService;

/**
 * 
 * @author csx
 *
 */
public class SecurityDataSource {
	
	private AppRoleService appRoleService;

	public void setAppRoleService(AppRoleService appRoleService) {
		this.appRoleService = appRoleService;
	}

	/**
	 * 匿名访问的URLs
	 */
	private HashSet<String> anonymousUrls=null;
	/**
	 * 登录访问的共公URLs
	 */
	private HashSet<String> publicUrls=null;
	
	public SecurityDataSource() {
		
	}

	public Set<String> getAnonymousUrls() {
		return anonymousUrls;
	}

	public void setAnonymousUrls(Set<String> anonymousUrls) {
		this.anonymousUrls=(HashSet)anonymousUrls;
	}

	public HashSet<String> getPublicUrls() {
		return publicUrls;
	}

	public void setPublicUrls(HashSet<String> publicUrls) {
		this.publicUrls=(HashSet)publicUrls;
	}
	/**
	 * 取得安全匹配的数据源,可以考虑其他数据结构，HashMap总来说还不是最好，
	 * 相对来说，它的查找速度还是可以。
	 * @return
	 */
	public HashMap<String, Set<String>> getDataSource(){
		HashMap<String,Set<String>>tmap=appRoleService.getSecurityDataSource();
		tmap.put(AppRole.ROLE_ANONYMOUS, anonymousUrls);
		tmap.put(AppRole.ROLE_PUBLIC,publicUrls);
		return tmap;
	}
}
