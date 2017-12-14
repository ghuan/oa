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
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.CartRepair;
import com.htsoft.oa.service.admin.CartRepairService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class CartRepairAction extends BaseAction{
	@Resource
	private CartRepairService cartRepairService;
	private CartRepair cartRepair;
	
	private Long repairId;

	public Long getRepairId() {
		return repairId;
	}

	public void setRepairId(Long repairId) {
		this.repairId = repairId;
	}

	public CartRepair getCartRepair() {
		return cartRepair;
	}

	public void setCartRepair(CartRepair cartRepair) {
		this.cartRepair = cartRepair;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CartRepair> list= cartRepairService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("repairDate");
		buff.append(serializer.exclude(new String[]{"class"}).serialize(list));
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
				cartRepairService.remove(new Long(id));
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
		CartRepair cartRepair=cartRepairService.get(repairId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("repairDate");
		sb.append(serializer.exclude(new String[]{"class","car.cartRepairs"}).serialize(cartRepair));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		cartRepairService.save(cartRepair);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
