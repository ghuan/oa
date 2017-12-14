package com.htsoft.oa.action.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.DepreType;
import com.htsoft.oa.model.admin.FixedAssets;
import com.htsoft.oa.service.admin.DepreTypeService;
import com.htsoft.oa.service.admin.FixedAssetsService;
/**
 * 
 * @author csx
 *
 */
public class DepreTypeAction extends BaseAction{
	@Resource
	private DepreTypeService depreTypeService;
	private DepreType depreType;
	@Resource
	private FixedAssetsService fixedAssetsService;
	
	private Long depreTypeId;

	public Long getDepreTypeId() {
		return depreTypeId;
	}

	public void setDepreTypeId(Long depreTypeId) {
		this.depreTypeId = depreTypeId;
	}

	public DepreType getDepreType() {
		return depreType;
	}

	public void setDepreType(DepreType depreType) {
		this.depreType = depreType;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<DepreType> list= depreTypeService.getAll(filter);
		Type type=new TypeToken<List<DepreType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				QueryFilter filter=new QueryFilter(getRequest());
				filter.addFilter("Q_depreType.depreTypeId_L_EQ",id);
				List<FixedAssets> list=fixedAssetsService.getAll(filter);
				if(list.size()>0){
					jsonString="{success:false,message:'该折算类型下还有资产，请把该资产移走后，再进行删除！'}";
					return SUCCESS;
				}
				depreTypeService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		DepreType depreType=depreTypeService.get(depreTypeId);
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(depreType));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		depreTypeService.save(depreType);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 传输给COMBOX的数组
	 * 
	 */
	public String combox(){
		List<DepreType> list= depreTypeService.getAll();
		StringBuffer buff=new StringBuffer("[");
		for(DepreType depreType:list){
			buff.append("['"+depreType.getDepreTypeId()+"','"+depreType.getTypeName()+"','"+depreType.getCalMethod()+"'],");
		}
		if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
