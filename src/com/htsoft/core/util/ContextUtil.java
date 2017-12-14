/**
 * 此方法作用为取得当前用户
 */
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.Authentication;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;

import com.htsoft.oa.model.system.AppUser;



public class ContextUtil {
	private static final Log logger=LogFactory.getLog(ContextUtil.class);
	
	/**
	 * 从上下文取得当前用户
	 * @return
	 */
	public static AppUser getCurrentUser(){
		SecurityContext securityContext = SecurityContextHolder.getContext();
        if (securityContext != null) {
            Authentication auth = securityContext.getAuthentication();
            if (auth != null) {
                Object principal = auth.getPrincipal();
                if (principal instanceof AppUser) {
                    return (AppUser) principal;
                }
            } else {
                logger.warn("WARN: securityContext cannot be lookuped using SecurityContextHolder.");
            }
        }
        return null;
	}
	
	public static Long getCurrentUserId(){
		AppUser curUser=getCurrentUser();
		if(curUser!=null) return curUser.getUserId();
		return null;
	}
}
