package com.htsoft.oa.action.system;

/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.CompanyService;
import com.htsoft.oa.service.system.DepartmentService;

public class DepartmentAction extends BaseAction{

	private Department department;
	
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	@Resource
	private DepartmentService departmentService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private CompanyService companyService;
	
	/**
	 * 显示所有的部门信息
	 * @param depId
	 * @return
	 */
	public String select(){
		
		String depId=getRequest().getParameter("depId");
		QueryFilter filter=new QueryFilter(getRequest());
		if(StringUtils.isNotEmpty(depId)&&!"0".equals(depId)){
			department=departmentService.get(new Long(depId));
			filter.addFilter("Q_path_S_LFK", department.getPath());
			
		}
		filter.addSorted("path", "asc");
		List<Department> list=departmentService.getAll(filter);
		Type type=new TypeToken<List<Department>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();		
		
		return SUCCESS;
	}
	
	public String list(){
		String opt=getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if(StringUtils.isNotEmpty(opt)){
			buff.append("[");
		}else{
			buff.append("[{id:'"+0+"',text:'"+AppUtil.getCompanyName()+"',expanded:true,children:[");
		}
		List<Department> listParent;
		listParent=departmentService.findByParentId(new Long(0));//最顶层父节点
		for(Department dep:listParent){
			buff.append("{id:'"+dep.getDepId()+"',text:'"+dep.getDepName()+"',");
		    buff.append(findChild(dep.getDepId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		if(StringUtils.isNotEmpty(opt)){
		   buff.append("]");
		}else{
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/*
	 * 寻找子根节点*/
	
	public String findChild(Long depId){
		StringBuffer buff1=new StringBuffer("");
		List<Department> list=departmentService.findByParentId(depId);
		if(list.size()==0){
			buff1.append("leaf:true},");
			return buff1.toString(); 
		}else {
			buff1.append("children:[");
			for(Department dep2:list){				
				buff1.append("{id:'"+dep2.getDepId()+"',text:'"+dep2.getDepName()+"',");
				buff1.append(findChild(dep2.getDepId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	
	public String add(){
		Long parentId=department.getParentId();
		String depPath="";
		int level=0;
		if(parentId<1){
			parentId=new Long(0);
			depPath="0.";
		}else{
		depPath=departmentService.get(parentId).getPath();
		level=departmentService.get(parentId).getDepLevel();
		}
		if(level<1){
			level=1;			
		}
		department.setDepLevel(level+1);
		departmentService.save(department);
		if(department!=null){
		    depPath+=department.getDepId().toString()+".";
		    department.setPath(depPath);
		    departmentService.save(department);		
		    setJsonString("{success:true}");
		}else{
			 setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	
	public String remove(){
		PagingBean pb=getInitPagingBean();
		Long depId=Long.parseLong(getRequest().getParameter("depId"));
		Department department=departmentService.get(depId);
		List userList=appUserService.findByDepartment(department.getPath(), pb);
    	if(userList.size()>0){
    		setJsonString("{success:false,message:'该部门还有人员，请将人员转移后再删除部门!'}");
    		return SUCCESS;
    	}
		departmentService.remove(depId);
	    List<Department> list=departmentService.findByParentId(depId);
	    for(Department dep:list){
	    	List users=appUserService.findByDepartment(dep.getPath(), pb);
	    	if(users.size()>0){
	    		setJsonString("{success:false,message:'该部门还有人员，请将人员转移后再删除部门!'}");
	    		return SUCCESS;
	    	}
	    	departmentService.remove(dep.getDepId());
	    }
	    setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String detail(){
		Long depId=Long.parseLong(getRequest().getParameter("depId"));
		setDepartment(departmentService.get(depId));
		Gson gson=new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(department));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
