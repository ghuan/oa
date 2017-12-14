package com.htsoft.oa.workflow.event;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jbpm.api.listener.EventListener;
import org.jbpm.api.listener.EventListenerExecution;
import org.jbpm.api.model.OpenProcessInstance;

import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.personal.ErrandsRegister;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.personal.ErrandsRegisterService;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
/**
 * 当请假单由上级审批完成后，会调用该事件进行相关的处理
 * @author 
 *
 */
public class HolidayApprovalListener implements EventListener {
	
	private Log logger=LogFactory.getLog(HolidayApprovalListener.class);
	
	/**
	 * 审批的选择
	 */
	Short choice;
	
	@Override
	public void notify(EventListenerExecution execution) throws Exception {
		
		if(logger.isDebugEnabled()){
			logger.info("enter the HolidayApprovalListener notify method...");
		}
		
		OpenProcessInstance pi=execution.getProcessInstance();
		//上司的dateId
		Long dateId=(Long)pi.getVariable("dateId");
		//上司的意见
		String superOption=(String)pi.getVariable("superOption");
		
		if(dateId!=null){
			
			ErrandsRegisterService erService=(ErrandsRegisterService)AppUtil.getBean("errandsRegisterService");
			ShortMessageService smService=(ShortMessageService)AppUtil.getBean("shortMessageService");
			ErrandsRegister errandsRegister=erService.get(dateId);
			
			if(errandsRegister!=null){
				errandsRegister.setStatus(choice);
				errandsRegister.setApprovalOption(superOption);
				erService.save(errandsRegister);
				
				//发送短消息
				smService.save(AppUser.SYSTEM_USER, errandsRegister.getUserId().toString(), "你的请假申请  （" + errandsRegister.getDescp() + "），最终审批意见：" + superOption, ShortMessage.MSG_TYPE_SYS);
			}
			
		}
		
		
	}

}
