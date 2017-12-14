package com.htsoft.oa.action.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import nl.captcha.Captcha;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.AuthenticationManager;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;
import org.springframework.security.ui.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.ui.webapp.AuthenticationProcessingFilter;

import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;

public class LoginAction extends BaseAction{
	private AppUser user;
	private String username;
	private String password;
	private String checkCode;//验证码
	
	//must be same to app-security.xml
	private String key="RememberAppUser";
	
	//private String rememberMe;//自动登录
	@Resource
	private AppUserService userService;
	@Resource(name="authenticationManager")
	private AuthenticationManager authenticationManager=null;

	
	/**
	 * 登录
	 * @return
	 */
	public String login(){
		StringBuffer msg = new StringBuffer("{msg:'");
		Captcha captcha = (Captcha)getSession().getAttribute(Captcha.NAME);
		Boolean login = false;
		
		String newPassword=null;
		
		if(!"".equals(username)&&username!=null){
			setUser(userService.findByUserName(username));
			if(user!=null){
				if(StringUtils.isNotEmpty(password)){
					newPassword=StringUtil.encryptSha256(password);
					if(user.getPassword().equalsIgnoreCase(newPassword)){
						if(captcha.isCorrect(checkCode)){
							if(user.getStatus()==1){
								login=true;
							}
							else msg.append("此用户已被禁用.'");
						}
						else msg.append("验证码不正确.'");
					}
					else msg.append("密码不正确.'");
				}
				else msg.append("密码不能为空.'");
			}
			else msg.append("用户不存在.'");
		}
		if(login){
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authenticationManager.authenticate(authRequest));
			SecurityContextHolder.setContext(securityContext);
	        getSession().setAttribute(AuthenticationProcessingFilter.SPRING_SECURITY_LAST_USERNAME_KEY,username);
	        String rememberMe = getRequest().getParameter("_spring_security_remember_me");
	        if(rememberMe!=null&&rememberMe.equals("on")){
				//加入cookie
				long tokenValiditySeconds = 1209600; // 14 days
		        long tokenExpiryTime = System.currentTimeMillis() + (tokenValiditySeconds * 1000);
		        //DigestUtils.md5Hex(username + ":" + tokenExpiryTime + ":" + password + ":" + getKey());
		        String signatureValue = DigestUtils.md5Hex(username + ":" + tokenExpiryTime + ":" + user.getPassword() + ":" + key);
		        
		        String tokenValue = username + ":" + tokenExpiryTime + ":" + signatureValue;
		        String tokenValueBase64 = new String(Base64.encodeBase64(tokenValue.getBytes()));
		        getResponse().addCookie(makeValidCookie(tokenExpiryTime, tokenValueBase64));
		        
	        }
	        
			setJsonString("{success:true}");
		}else{
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}
	//add Cookie
	protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64) {
		HttpServletRequest request=getRequest();
		Cookie cookie = new Cookie(TokenBasedRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY, tokenValueBase64);
		cookie.setMaxAge(60 * 60 * 24 * 365 * 5); // 5 years
		cookie.setPath(org.springframework.util.StringUtils.hasLength(request.getContextPath()) ? request.getContextPath():"/");
		return cookie;
	}
	
	public AppUser getUser() {
		return user;
	}
	
	public void setUser(AppUser user) {
		this.user = user;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getCheckCode() {
		return checkCode;
	}

	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

}
