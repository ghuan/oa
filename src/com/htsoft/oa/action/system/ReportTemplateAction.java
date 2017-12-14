package com.htsoft.oa.action.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.Filter;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.system.ReportParam;
import com.htsoft.oa.model.system.ReportTemplate;
import com.htsoft.oa.service.system.ReportParamService;
import com.htsoft.oa.service.system.ReportTemplateService;
/**
 * 
 * @author csx
 *
 */
public class ReportTemplateAction extends BaseAction{
	@Resource
	private ReportTemplateService reportTemplateService;
	private ReportTemplate reportTemplate;
	@Resource
	private ReportParamService reportParamService;
	
	private Long reportId;

	public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	public ReportTemplate getReportTemplate() {
		return reportTemplate;
	}

	public void setReportTemplate(ReportTemplate reportTemplate) {
		this.reportTemplate = reportTemplate;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ReportTemplate> list= reportTemplateService.getAll(filter);
		
		Type type=new TypeToken<List<ReportTemplate>>(){}.getType();
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
				List<ReportParam> list=reportParamService.findByRepTemp(new Long(id));
				for(ReportParam rp:list){
					reportParamService.remove(rp);
				}
				reportTemplateService.remove(new Long(id));
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
		ReportTemplate reportTemplate=reportTemplateService.get(reportId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(reportTemplate));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//通过后台直接设置报表上传时间和修改时间
		if(reportTemplate.getReportId()==null){
		   reportTemplate.setCreatetime(new Date());
		   reportTemplate.setUpdatetime(new Date());
		}else{
		   reportTemplate.setUpdatetime(new Date());
		}
		reportTemplateService.save(reportTemplate);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 加载搜索条件框
	 */
	public String load(){
		String strReportId=getRequest().getParameter("reportId");
		if(StringUtils.isNotEmpty(strReportId)){
			List<ReportParam> list= reportParamService.findByRepTemp(new Long(strReportId));
			StringBuffer sb=new StringBuffer("[");
			for(ReportParam rp:list){
				sb.append("{xtype:'label',text:'"+rp.getParamName()+"'},{");
				if("date".equals(rp.getParamType())){
					sb.append("xtype:'datefield',format:'Y-m-d'");
				}else if("datetime".equals(rp.getParamType())){
					sb.append("xtype:'datetimefield',format:'Y-m-d H:i:s'");
				}else{
					sb.append("xtype:'textfield'");
				}
				sb.append(",name:'"+rp.getParamKey()+"',value:'"+rp.getDefaultVal()+"'},");
			}
			if(list.size()>0){
				sb.deleteCharAt(sb.length()-1);
			}
			sb.append("]");
			setJsonString("{success:true,data:"+sb.toString()+"}");
		}else{
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	/**
	 * 提交数据
	 */
	public String submit(){
		Map map=getRequest().getParameterMap();
		Iterator it=map.entrySet().iterator();
		StringBuffer sb=new StringBuffer();
		while(it.hasNext()){
			Map.Entry entry=(Map.Entry)it.next();
			String key=(String)entry.getKey();
			String[] value=(String[])entry.getValue();
			sb.append("&"+key+"="+value[0]);
		}
		setJsonString("{success:true,data:'"+sb.toString()+"'}");
		return SUCCESS;
	}
}
