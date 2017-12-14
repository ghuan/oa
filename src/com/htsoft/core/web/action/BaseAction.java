package com.htsoft.core.web.action;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.DefaultActionSupport;
import org.springframework.mail.MailSender;


import com.htsoft.core.engine.MailEngine;
import com.htsoft.core.web.paging.PagingBean;


/**
 * Ext Base Action for all the request.
 * 
 * @author csx
 * 
 */
public class BaseAction extends DefaultActionSupport {
	public static final String JSON_SUCCESS="{success:true}";
	
	/**
	 * 结合Ext的分页功能： dir DESC limit 25 sort id start 50
	 */
	/**
	 * 当前是升序还是降序排数据
	 */
	protected String dir;
	/**
	 * 排序的字段
	 */
	protected String sort;
	/**
	 * 每页的大小
	 */
	protected Integer limit=25;
	/**
	 * 开始取数据的索引号
	 */
	protected Integer start=0;

	protected String jsonString;

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String getJsonString() {
		return jsonString;
	}

	public BaseAction() {
		this.setSuccessResultValue("/jsonString.jsp");
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected transient final Log logger = LogFactory.getLog(getClass());

	protected MailEngine mailEngine;
	
	protected MailSender mailSender;

	
	public final String CANCEL = "cancel";

	public final String VIEW = "view";

	/**
	 * Convenience method to get the request
	 * 
	 * @return current request
	 */
	protected HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * Convenience method to get the response
	 * 
	 * @return current response
	 */
	protected HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * Convenience method to get the session. This will create a session if one
	 * doesn't exist.
	 * 
	 * @return the session from the request (request.getSession()).
	 */
	protected HttpSession getSession() {
		return getRequest().getSession();
	}

	// ---------------------------Methods------------------------------

	protected PagingBean getInitPagingBean() {
		PagingBean pb = new PagingBean(start,limit);
		return pb;
	}

	public void setMailEngine(MailEngine mailEngine) {
		this.mailEngine = mailEngine;
	}
	
	public MailEngine getMailEngine(){
		return mailEngine;
	}

	public String list() {
		return SUCCESS;
	}

	public String edit() {
		return INPUT;
	}

	public String save() {
		return INPUT;
	}

	public String delete() {
		return SUCCESS;
	}

	public String multiDelete() {
		return SUCCESS;
	}

	public String multiSave() {
		return SUCCESS;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

}
