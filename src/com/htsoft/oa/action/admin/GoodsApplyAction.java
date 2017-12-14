package com.htsoft.oa.action.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.GoodsApply;
import com.htsoft.oa.model.admin.OfficeGoods;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.admin.GoodsApplyService;
import com.htsoft.oa.service.admin.OfficeGoodsService;
import com.htsoft.oa.service.info.ShortMessageService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class GoodsApplyAction extends BaseAction{
	
	private static short PASS_APPLY=1;//通过审批
	private static short NOTPASS_APPLY=0;//未通过审批
	@Resource
	private GoodsApplyService goodsApplyService;
	private GoodsApply goodsApply;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private OfficeGoodsService officeGoodsService;
	
	private Long applyId;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public GoodsApply getGoodsApply() {
		return goodsApply;
	}

	public void setGoodsApply(GoodsApply goodsApply) {
		this.goodsApply = goodsApply;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<GoodsApply> list= goodsApplyService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("applyDate");
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
				goodsApplyService.remove(new Long(id));
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
		GoodsApply goodsApply=goodsApplyService.get(applyId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("applyDate");
		sb.append(serializer.exclude(new String[]{"class"}).serialize(goodsApply));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		OfficeGoods officeGoods=officeGoodsService.get(goodsApply.getOfficeGoods().getGoodsId());
		Integer con=goodsApply.getUseCounts();
		Integer least=officeGoods.getStockCounts()-con;
		if(least>0){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss-SSSS");//自动生成申请号
			goodsApply.setApplyNo("GA"+sdf.format(new Date()));
			if(goodsApply.getApplyId()==null){
				goodsApply.setApprovalStatus(NOTPASS_APPLY);//设初始值为0,即是为未通过审批
			}
			goodsApplyService.save(goodsApply);
			if(goodsApply.getApprovalStatus()==PASS_APPLY){
				Long receiveId=goodsApply.getUserId();
				String content="你申请的办公用品为"+officeGoods.getGoodsName()+"已经通过审批，请查收";
				shortMessageService.save(AppUser.SYSTEM_USER,receiveId.toString(), content, ShortMessage.MSG_TYPE_SYS);
				officeGoods.setStockCounts(least);
				officeGoodsService.save(officeGoods);
			}
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false,message:'库存不足!'}");
		}
		return SUCCESS;
	}
}
