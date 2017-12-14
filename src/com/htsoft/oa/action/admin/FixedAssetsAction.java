package com.htsoft.oa.action.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.DepreRecord;
import com.htsoft.oa.model.admin.DepreType;
import com.htsoft.oa.model.admin.FixedAssets;
import com.htsoft.oa.service.admin.DepreRecordService;
import com.htsoft.oa.service.admin.DepreTypeService;
import com.htsoft.oa.service.admin.FixedAssetsService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class FixedAssetsAction extends BaseAction{
	@Resource
	private FixedAssetsService fixedAssetsService;
	private FixedAssets fixedAssets;
	
	@Resource
	private DepreRecordService depreRecordService;
	@Resource
	private DepreTypeService depreTypeService;
	
	private Long assetsId;

	public Long getAssetsId() {
		return assetsId;
	}

	public void setAssetsId(Long assetsId) {
		this.assetsId = assetsId;
	}

	public FixedAssets getFixedAssets() {
		return fixedAssets;
	}

	public void setFixedAssets(FixedAssets fixedAssets) {
		this.fixedAssets = fixedAssets;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<FixedAssets> list= fixedAssetsService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("buyDate","startDepre","manuDate");
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
				Long assetsId=new Long(id);
				FixedAssets fixedAssets=fixedAssetsService.get(assetsId);
				Set<DepreRecord> records=fixedAssets.getDepreRecords();
				Iterator<DepreRecord> it=records.iterator();
				while(it.hasNext()){
					depreRecordService.remove(it.next().getRecordId());
				}
				fixedAssetsService.remove(new Long(id));
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
		FixedAssets fixedAssets=fixedAssetsService.get(assetsId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer= JsonUtil.getJSONSerializer("manuDate","buyDate","startDepre");
		sb.append(serializer.exclude(new String[]{"class"}).serialize(fixedAssets));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss-SSSS");//自动生成商品号
	    if(fixedAssets.getAssetsId()==null){
	    	fixedAssets.setAssetsNo(sdf.format(new Date()));
	    }
	    Long typeId=fixedAssets.getDepreType().getDepreTypeId();
	    if(typeId!=null){
	    	DepreType depreType =depreTypeService.get(typeId);
		    if(depreType.getCalMethod()!=2){//不为工作量折算时
			    BigDecimal remainRate=fixedAssets.getRemainValRate();
			    BigDecimal depreRate=new BigDecimal("1").subtract(remainRate.divide(new BigDecimal("100"))).divide(fixedAssets.getIntendTerm(),2,2);  //折旧率
			    fixedAssets.setDepreRate(depreRate);
		    }
	    }
	    fixedAssetsService.save(fixedAssets);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	

}
