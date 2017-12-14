package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;

import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.XmlUtil;

/**
 * 流程任务辅助类
 * @author csx
 *
 */
public class ProcessActivityAssistant {
	
	private static final  Log logger=LogFactory.getLog(ProcessActivityAssistant.class);
	
	
	/**
	 * 构建提交的流程或任务对应的表单信息字段
	 * @param processName 流程名称
	 * @param activityName 活动名称
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, ParamField> constructFieldMap(String processName,String activityName){
		String fieldsXmlLoaction=getFieldAbsPath(processName, activityName);
		InputStream is=null;
		Map<String,ParamField>map=new LinkedHashMap<String, ParamField>();
		try{
			//is=Thread.currentThread().getContextClassLoader().getResourceAsStream(fieldsXmlLoaction);
			is=new FileInputStream(fieldsXmlLoaction);
		}catch(Exception ex){
			logger.warn("error when read the file from " + activityName + "-fields.xml, the reason is not upload the ");
		}
		if(is==null){
			//is=Thread.currentThread().getContextClassLoader().getResourceAsStream(getCommonFieldsPath(activityName));
			try{
				is=new FileInputStream(getCommonFieldsAbsPath(activityName));
			}catch(Exception ex){
				logger.warn("error when read the file from 通用、表单-fields.xml, the reason is not upload the ");
			}
		}
		Document doc=XmlUtil.load(is);
		Element fields=doc.getRootElement();
		List<Element> els = fields.elements();
		for(Element el:els){
			String name=el.attribute("name").getValue();
			
			Attribute attLabel = el.attribute("label");
			Attribute attType = el.attribute("type");
			Attribute attLength = el.attribute("length");
			Attribute attIsShowed=el.attribute("isShowed");
			
			String label=attLabel==null?name:attLabel.getValue();
			String type=attType==null?ParamField.FIELD_TYPE_VARCHAR:attType.getValue();
			Integer length=attLength==null?0:new Integer(attLength.getValue());
			Short isShowed=(attIsShowed==null||"true".equals(attIsShowed.getValue()))?(short)1:(short)0;
			
			ParamField pf=new ParamField(name,type,label,length,isShowed);
			map.put(name, pf);
		}
		
		
		return map;
	}
	
	public static String getFormPath(String processName,String activityName){
		return "/"+ processName+"/" + activityName+ ".vm";
	}
	
	/**
	 * 取得某流程表单的映射字段文件绝对路径
	 * @param processName
	 * @param activityName
	 * @return
	 */
	public static String getFieldAbsPath(String processName,String activityName){
		return AppUtil.getFlowFormAbsolutePath() + processName+"/" + activityName + "-fields.xml";
	}
	

	/**
	 * 取得通用的开始表单
	 * @return
	 */
	public static String getCommonFormPath(String activityName){
		if("开始".equals(activityName)){
			return "/通用/开始.vm";
		}else{
			return "/通用/表单.vm";
		}
		
	}
	/**
	 * 取得通用的映射字段文件绝对路径
	 * @param activityName
	 * @return
	 */
	public static String getCommonFieldsAbsPath(String activityName){		
		String absPath=AppUtil.getFlowFormAbsolutePath();
		
		if("开始".equals(activityName)){
			return absPath+"通用/开始-fields.xml";
		}else{
			return absPath+"通用/表单-fields.xml";
		}
	}
}
