package com.htsoft.oa.action.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.model.OnlineUser;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DepartmentService;
import com.htsoft.oa.service.system.UserSubService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * 
 * @author csx
 * 
 */
public class AppUserAction extends BaseAction {
	private static Long SUPPER_MANAGER_ID = -1l;// 超级管理员角色ID
	@Resource
	private AppUserService appUserService;
	@Resource
	private DepartmentService departmentService;
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private UserSubService userSubService;

	private AppUser appUser;

	private Long userId;

	private Long depId;

	private Long roleId;

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * 显示当前用户,并且加载该用户的所有权限
	 * 
	 * @return
	 */
	public String getCurrent() {
		AppUser currentUser = ContextUtil.getCurrentUser();

		Iterator<String> publicIds = AppUtil.getPublicMenuIds().iterator();
		StringBuffer publicIdSb = new StringBuffer();
		
		while (publicIds.hasNext()) {
			publicIdSb.append(",").append(publicIds.next());
		}
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,user:{userId:'").append(
				currentUser.getUserId()).append("',fullname:'").append(
				currentUser.getFullname()).append("',depId:'")
				.append(currentUser.getDepartment().getDepId()).append("',depName:'")
				.append(currentUser.getDepartment().getDepName()).append("',rights:'");
		sb.append(currentUser.getRights().toString().replace("[","").replace("]", ""));
		if (!"".equals(currentUser.getRights()) && publicIdSb.length() > 0) {
			sb.append(publicIdSb.toString());
		}
		sb.append("'}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter
				.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED
						.toString());
		List<AppUser> list = appUserService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"accessionTime"});
		buff.append(serializer.exclude(new String[]{"password"}).serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据部门查找列表
	 */
	public String select() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		String path = "0.";
		appUser = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = appUser.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		List<AppUser> list = appUserService.findByDepartment(path, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"accessionTime"});
		buff.append(serializer.exclude(new String[]{"password"}).serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 在线用户
	 * 
	 * @return
	 */
	public String online() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByRole = new HashMap<String, OnlineUser>();

		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户

		// 按部门选择在线用户
		if (depId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				// if(onlineUser.getDepId().equals(depId)){
				String path="";
				if(!onlineUser.getUserId().equals(AppUser.SUPER_USER)){	
					path=onlineUser.getDepPath();
				}
				if(!depId.equals(new Long(0))){
					if(java.util.regex.Pattern.compile("." + depId + ".").matcher(path).find()) {
						onlineUsersByDep.put(sessionId, onlineUser);
					}
				}else{
					onlineUsersByDep.put(sessionId, onlineUser);
				}
			}
		}

		// 按角色选择在线用户
		if (roleId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				if (java.util.regex.Pattern.compile("," + roleId + ",")
						.matcher(onlineUser.getRoleIds()).find()) {
					onlineUsersByRole.put(sessionId, onlineUser);
				}
			}
		}

		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");

		Gson gson = new Gson();
		if (depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else if (roleId != null) {
			buff.append(gson.toJson(onlineUsersByRole.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 
	 * 根据角色查询
	 */
	public String find() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		if (StringUtils.isNotEmpty(strRoleId)) {
			List<AppUser> userList = appUserService.findByRole(Long.parseLong(strRoleId), pb);
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(userList, type));
			buff.append("}");

			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				AppRole superManager = appRoleService.get(SUPPER_MANAGER_ID);
				if (delUser.getRoles().contains(superManager)) {
					buff.append("员工:").append(delUser.getUsername()).append(
							"是超级管理员,不能删除!<br><br/>");
				} else if (delUser.getUserId().equals(
						ContextUtil.getCurrentUserId())) {
					buff.append("不能删除自己!<br></br>");
				} else {
					delUser.setStatus(Constants.FLAG_DISABLE);
					delUser.setDelFlag(Constants.FLAG_DELETED);
					delUser.setUsername("__" + delUser.getUsername());
					appUserService.save(delUser);
				}
			}
			buff.append("'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		AppUser appUser = null;
		JSONSerializer json = JsonUtil
				.getJSONSerializer(new String[] { "accessionTime" });
		if (userId != null) {
			appUser = appUserService.get(userId);
		} else {
			json.exclude(new String[] { "accessionTime", "department",
					"password", "status", "position" });
			appUser = ContextUtil.getCurrentUser();
		}
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(JsonUtil.getJSONSerializer(new String[] { "accessionTime" })
				.serialize(appUser));
		sb.append("]}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
			String rolesIds = getRequest().getParameter("AppUserRoles");
			String[] ids = rolesIds.split(",");
			Set<AppRole> roles = new HashSet<AppRole>();
			for (String id : ids) {
				if (!"".equals(id)) {
					AppRole role = appRoleService.get(new Long(id));
					roles.add(role);
				}
			}
			appUser.setRoles(roles);
			if (appUser.getUserId() != null) {
				AppUser old = appUserService.get(appUser.getUserId());
				appUser.setDelFlag(old.getDelFlag());
				appUser.setPassword(old.getPassword());
				appUserService.merge(appUser);
				setJsonString("{success:true}");
			} else {
				if(appUserService.findByUserName(appUser.getUsername())==null){
					appUser.setDelFlag(Constants.FLAG_UNDELETED);
					appUser.setPassword(StringUtil.encryptSha256(appUser.getPassword()));
					appUserService.merge(appUser);
					setJsonString("{success:true}");
				}else{
					setJsonString("{success:false,msg:'用户登录账号:"+appUser.getUsername()+"已存在,请重新输入账号.'}");
				}
			}
		return SUCCESS;
	}

	/**
	 * 查询已有角色
	 */
	public String selectedRoles() {
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> roles = appUser.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询可选角色
	 * 
	 * @return
	 */
	public String chooseRoles() {
		List<AppRole> chooseRoles = appRoleService.getAll();
		;
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> selectedRoles = appUser.getRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 修改密码
	 * 
	 * @return
	 */
	public String resetPassword() {
		String userId = getRequest().getParameter("appUserUserId");
		String oldPassword = StringUtil.encryptSha256(getRequest()
				.getParameter("oldPassword"));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else
				msg.append("两次输入不一致.'");
		} else
			msg.append("旧密码输入不正确.'");
		if (pass) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			appUserService.save(appUser);
			setJsonString("{success:true}");
		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}

	/**
	 * 删除用户照片
	 * 
	 * @return
	 */
	public String photo() {
		setAppUser(appUserService.get(getUserId()));
		appUser.setPhoto("");
		appUserService.save(appUser);
		return SUCCESS;
	}

	/**
	 * 按部门查找合适做下属的用户
	 * 
	 * @return
	 */
	public String subAdepartment() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		String path = "0.";
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = user.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		if ("0.".equals(path)) {
			path = null;
		}
		Long uId = user.getUserId();
		Set<Long> userIds = userSubService.findAllUpUser(uId);
		List<Long> userIdsL = userSubService.subUsers(uId);
		userIds.add(uId);
		for (Long l : userIdsL) {
			userIds.add(l);
		}
		List<AppUser> list = appUserService.findSubAppUser(path, userIds, pb);
		Type type = new TypeToken<List<AppUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据角色来选择合适做下属的用户
	 * 
	 * @return
	 */
	public String subArole() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strRoleId)) {
			Long uId = user.getUserId();
			Set<Long> userIds = userSubService.findAllUpUser(uId);
			List<Long> userIdsL = userSubService.subUsers(uId);
			userIds.add(uId);
			for (Long l : userIdsL) {
				userIds.add(l);
			}
			List<AppUser> userList = appUserService.findSubAppUserByRole(
					new Long(strRoleId), userIds, pb);
			// List<AppUser>
			// userList=appUserService.findByRole(Long.parseLong(strRoleId),
			// pb);
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(userList, type));
			buff.append("}");
			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 按在线查找合适当下属的用户
	 */

	public String onlineAsub() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersBySub = new HashMap<String, OnlineUser>();
		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户
		// 按在线用户
		AppUser user = ContextUtil.getCurrentUser();
		Long uId = user.getUserId();
		Set<Long> userIds = userSubService.findAllUpUser(uId);
		userIds.add(uId);
		List<Long> userIdsL = userSubService.subUsers(uId);
		for (Long l : userIdsL) {
			userIds.add(l);
		}
		for (String sessionId : onlineUsers.keySet()) {
			OnlineUser onlineUser = new OnlineUser();
			onlineUser = onlineUsers.get(sessionId);
			if (!userIds.contains(onlineUser.getUserId())) {
				onlineUsersBySub.put(sessionId, onlineUser);
			}
		}
		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");
		Gson gson = new Gson();
		buff.append(gson.toJson(onlineUsersBySub.values(), type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 上属
	 * 
	 * @return
	 */
	public String upUser() {
		List<Long> ids = userSubService.upUser(ContextUtil.getCurrentUserId());
		List<AppUser> list = new ArrayList<AppUser>();
		for (Long l : ids) {
			list.add(appUserService.get(l));
		}
		StringBuffer buff = new StringBuffer("[");
		for (AppUser user : list) {
			buff.append("['" + user.getUserId().toString() + "','"
					+ user.getFullname() + "'],");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 当前用户修改个人资料
	 * 
	 * @return
	 */
	public String profile() {
		AppUser old = ContextUtil.getCurrentUser();
		try {
			BeanUtil.copyNotNullProperties(old, appUser);
		} catch (Exception e) {
			logger.info(e);
		}
		appUserService.save(old);
		jsonString = "{success:true}";
		return SUCCESS;
	}
}
