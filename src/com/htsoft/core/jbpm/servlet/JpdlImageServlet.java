package com.htsoft.core.jbpm.servlet;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/


import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.util.Set;

import javax.imageio.ImageIO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.ProcessInstance;
import com.htsoft.core.jbpm.jpdl.JpdlModel;
import com.htsoft.core.jbpm.jpdl.JpdlModelDrawer;
import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.service.flow.JbpmService;


/**
 * 解析xml生成流程图.
 *
 * @author
 */
public class JpdlImageServlet extends HttpServlet {
   
    
    /**
     * Jbpm　Service
     */
    private JbpmService jbpmService=(JbpmService)AppUtil.getBean("jbpmService");

   /**
    * 取得流程定义的XML
    * @param request
    * @return
    */
    public String getProcessDefintionXml(HttpServletRequest request){
    	String defId=request.getParameter("defId");
    	
    	if(StringUtils.isNotEmpty(defId)){
    		return jbpmService.getDefinitionXmlByDefId(new Long(defId));
    	}
    	
    	String deployId=request.getParameter("deployId");
    	if(StringUtils.isNotEmpty(deployId)){
    		return jbpmService.getDefinitionXmlByDpId(deployId);
    	}
    	
    	String piId=request.getParameter("piId");
    	return jbpmService.getDefinitionXmlByPiId(piId);
    }

    /**
     * 处理get请求.
     *
     * @param request request
     * @param response response
     * @throws IOException io异常
     * @throws ServletException servlet异常
     */
    public void doGet(HttpServletRequest request,
        HttpServletResponse response) throws IOException, ServletException {
    	response.setCharacterEncoding("UTF-8");
    	
    	String defXml=getProcessDefintionXml(request);
        try {

        	JpdlModel jpdlModel = new JpdlModel(new ByteArrayInputStream(defXml.getBytes()));
            String pid=request.getParameter("piId");

            if(StringUtils.isNotEmpty(pid)){
            	ProcessInstance pi=jbpmService.getProcessInstance(pid);
            	if(pi!=null){
            		Set activeActivityNames=pi.findActiveActivityNames();
            		if(activeActivityNames!=null){
            			jpdlModel.setActivityNames(activeActivityNames);
            		}
            	}
            }
            response.setContentType("image/png");
            ImageIO.write(new JpdlModelDrawer().draw(jpdlModel), "png", response.getOutputStream());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
