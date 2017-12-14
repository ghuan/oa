package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.htsoft.core.Constants;
import com.htsoft.core.model.OnlineUser;
import com.htsoft.core.web.filter.SecurityInterceptorFilter;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Company;
import com.htsoft.oa.model.system.FunUrl;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.AppFunctionService;
import com.htsoft.oa.service.system.CompanyService;
import com.htsoft.oa.service.system.FunUrlService;
import com.htsoft.oa.service.system.SysConfigService;

/**
 * 方便取得Spring容器，取得其他服务实例，必须在Spring的配置文件里进行配置
 * 如：<bean id="appUtil" class="com.htsoft.util.core.AppUtil"/>
 * 也提供整个应用程序的相关配置获取方法
 * @author csx
 *
 */
public class AppUtil implements ApplicationContextAware{
	
	private static Log logger=LogFactory.getLog(AppUtil.class);
	
	/**
	 * 存放应用程序的配置,如邮件服务器等
	 */
	private static Map configMap=null;
	/**
	 * 应用程序全局对象
	 */
	private static ServletContext servletContext=null;
	
	//存放在线用户,SessionId,OnlineUser
	private static Map<String,OnlineUser> onlineUsers=new LinkedHashMap<String, OnlineUser>();
	
	public static ApplicationContext appContext;
	
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.appContext=applicationContext;
	}
    
	

	/**
	 * 系统的左边导航菜单文档，当系统启动时，
	 * 由系统去解析menu.xml，并放置系统，供权限菜单使用
	 */
	private static Document lefMenuDocument=null;
	
	/**
	 * 公共菜单
	 */
	private static Document publicDocument=null;
	
	/**
	 * 公共菜单IDs
	 */
	private static Set<String> publicMenuIds=null; 
	
	
	public static Document getLeftMenuDocument(){
		return lefMenuDocument;
	}
	
	public static void setLeftMenuDocument(Document doc){
		lefMenuDocument=doc;
	}

	
	public static Document getPublicDocument() {
		return publicDocument;
	}

	public static void setPublicDocument(Document pubDoc) {
		publicDocument = pubDoc;
	}

	public static void setPublicMenuIds(Set<String> pubIds) {
		publicMenuIds = pubIds;
	}

	/**
	 * 取得Bean
	 * @param beanId
	 * @return
	 */
	public static Object getBean(String beanId){
		
		System.out.println("================="+beanId+"===="+appContext);
		return appContext.getBean(beanId);
	}
	/**
	 * 返回在线用户
	 * @return
	 */
	public static Map<String,OnlineUser> getOnlineUsers(){
		return onlineUsers;
	}
	/**
	 * 移除在线用户
	 * @param sessionId
	 */
	public static void removeOnlineUser(String sessionId){
		onlineUsers.remove(sessionId);
	}
	
	public static void addOnlineUser(String sessionId,AppUser user){
		
		if(!onlineUsers.containsKey(sessionId)){
			OnlineUser onlineUser=new OnlineUser();
			onlineUser.setFullname(user.getFullname());
			onlineUser.setSessionId(sessionId);
			onlineUser.setUsername(user.getUsername());
			onlineUser.setUserId(user.getUserId());
			if(!user.getUserId().equals(AppUser.SUPER_USER)){
			  onlineUser.setDepPath("."+user.getDepartment().getPath());
			}
			Set<AppRole> roles = user.getRoles();
			StringBuffer roleIds = new StringBuffer(",");
			for(AppRole role : roles){
				roleIds.append(role.getRoleId()+",");
			}
			onlineUser.setRoleIds(roleIds.toString());
			onlineUser.setTitle(user.getTitle());
			onlineUsers.put(sessionId, onlineUser);
		}
	}
	
	/**
	 * 取得应用程序的绝对路径
	 * @return
	 */
	public static String getAppAbsolutePath(){
		return servletContext.getRealPath("/");
	}
	
	/**
	 * 取得流程表单模板的目录的绝对路径
	 * @return
	 */
	public static String getFlowFormAbsolutePath(){
		String path=(String)configMap.get("app.flowFormPath");
		if(path==null) path="/WEB-INF/FlowForm/";
		return getAppAbsolutePath()+path;
		
	}
	
	/**
	 * 重新加载安全权限匹配的数据源
	 */
	public static void reloadSecurityDataSource(){
		SecurityInterceptorFilter securityInterceptorFilter=(SecurityInterceptorFilter)AppUtil.getBean("securityInterceptorFilter");
		securityInterceptorFilter.loadDataSource();
	}
	
	/**
	 * 应用程序启动时调用
	 * @param servletContext
	 */
	 public static void init(ServletContext in_servletContext){
	    	servletContext=in_servletContext;
	    	configMap=new HashMap();
	    	//读取来自config.properties文件的配置,并且放入configMap内,应用程序共同使用
	    	String filePath=servletContext.getRealPath("/WEB-INF/classes");
	    	
	    	Properties props=new Properties();
	    	try{
	    		InputStream is=new BufferedInputStream(new FileInputStream(filePath+"/config.properties"));
	    		props.load(is);
	    		Iterator it= props.keySet().iterator();
	    		while(it.hasNext()){
	    			String key=(String)it.next();
	    			configMap.put(key, props.get(key));
	    		}
	    	}catch(Exception ex){
	    		logger.error(ex.getMessage());
	    	}
	    	
	    	//TODO 从系统配置中读取所有的信息
	    	SysConfigService sysConfigService=(SysConfigService)getBean("sysConfigService");
	    	List<SysConfig> list=sysConfigService.getAll();
	    	for(SysConfig conf:list){
	    		configMap.put(conf.getConfigKey(),conf.getDataValue());
	    	}
	    	CompanyService companyService=(CompanyService)getBean("companyService");
	    	List<Company> cList=companyService.findCompany();
	    	if(cList.size()>0){
	    		Company company=cList.get(0);
	    		configMap.put(Constants.COMPANY_LOGO,company.getLogo());
	    		configMap.put(Constants.COMPANY_NAME,company.getCompanyName());
	    	}
	    	//加载菜单转换器
			String xslStyle=servletContext.getRealPath("/js")+"/menu-left.xsl";
			Document doc = getOrignalMenuDocument();
			try{
				//把menu.xml中的Function元素去除，为系统的左菜单显示加快下载速度
				Document finalDoc=XmlUtil.styleDocument(doc,xslStyle);
				AppUtil.setLeftMenuDocument(finalDoc);
			}catch(Exception ex){
				logger.error("menux.xml trasform has error:" + ex.getMessage());
			}
			
			//加载公共权限，为用户认证提供方便
			String publicStyle=servletContext.getRealPath("/js")+"/menu-public.xsl";
			try{
				Document publicDoc=XmlUtil.styleDocument(doc, publicStyle);
				HashSet pubIds=new HashSet();
				Element rootEl=publicDoc.getRootElement();
				 List idNodes=rootEl.selectNodes("/Menus//*");
				 for(int i=0;i<idNodes.size();i++){
					 Element el=(Element)idNodes.get(i);
					 Attribute attr= el.attribute("id");
					 if(attr!=null){
						 pubIds.add(attr.getValue());
					 }
				 }
				 
				 setPublicMenuIds(pubIds);
				 setPublicDocument(publicDoc);
					
			}catch(Exception ex){
				logger.error("menu.xml + menu-public.xsl transform has error:" + ex.getMessage());
			}
	  }
	 
	 /**
	  * 取得未经转化的menu.xml文档,即直接加载menu.xml的Document
	  * @return
	  */
	 public static Document getOrignalMenuDocument(){
		 String menuFilePath = servletContext.getRealPath("/js")+"/menu.xml";
		 Document doc = XmlUtil.load(menuFilePath);
		 return doc;
	 }
	 
	 /**
	  * 取得用于授权的文档，即转化后，去掉url的元素
	  * @return
	  */
	 public static Document getGrantMenuDocument(){
		String xslStyle = servletContext.getRealPath("/js")+"/menu-grant.xsl";
		Document finalDoc=null;
		try{
			finalDoc=XmlUtil.styleDocument(getOrignalMenuDocument(),xslStyle);
		}catch(Exception ex){
			logger.error("menu.xml + menu-grant.xsl transform has error:" + ex.getMessage());
		}
		return finalDoc;
	 }
	 
	 /**
	  * 取得公共的菜单文档，即menu.xml文件中标注为isPublic=true的属性
	  * @return
	  */
	 public static Document getPublicMenuDocument(){
		return publicDocument;
	 }
	 
	 /**
	  * 取得当前配置文件中的公共菜单的ID
	  * @return
	  */
	 public static Set<String> getPublicMenuIds(){
		 return publicMenuIds;
	 }
	 
	 public static void synMenu(){
		 AppFunctionService appFunctionService=(AppFunctionService)getBean("appFunctionService");
			FunUrlService funUrlService=(FunUrlService)getBean("funUrlService");
			
			//同步menu.xml中的功能菜单配置至app_function表
			
			List funNodeList=getOrignalMenuDocument().getRootElement().selectNodes("/Menus/Items//Item/Function");
			
			for(int i=0;i<funNodeList.size();i++){
				Element funNode=(Element)funNodeList.get(i);
				
				String key=funNode.attributeValue("id");
				String name=funNode.attributeValue("text");
				
				AppFunction appFunction=appFunctionService.getByKey(key);
				
				if(appFunction==null){	
					appFunction=new AppFunction(key,name);
				}else{
					appFunction.setFunName(name);
				}
				
				List urlNodes=funNode.selectNodes("./url");
				
				appFunctionService.save(appFunction);
				
				for(int k=0;k<urlNodes.size();k++){
					Node urlNode=(Node)urlNodes.get(k);
					String path=urlNode.getText();
					FunUrl fu=funUrlService.getByPathFunId(path, appFunction.getFunctionId());
					if(fu==null){
						fu=new FunUrl();
						fu.setUrlPath(path);
						fu.setAppFunction(appFunction);
						funUrlService.save(fu);
					}
				}
			}

	 }
	 
	 /*
	  * 是否同步菜单
	  */
	 public static boolean getIsSynMenu(){
	    String synMenu=(String)configMap.get("isSynMenu");
	    if("true".equals(synMenu)){
	    	return true;
	    }
	    return false;
	 }
	 
	/**
	 * 获取系统配置MAP 
	 */
	 public static Map getSysConfig(){
		 return configMap;
	 }
	 
	 public static String getCompanyLogo(){
		 String defaultLogoPath=Constants.DEFAULT_LOGO;
		 String path=(String)configMap.get(Constants.COMPANY_LOGO);
		 if(StringUtils.isNotEmpty(path)){
			 defaultLogoPath="/attachFiles/"+path;
		 }
		 return defaultLogoPath;
	 }
	 
	 public static String getCompanyName(){
		 String defaultName=Constants.DEFAULT_COMPANYNAME;
		 String companyName=(String)configMap.get(Constants.COMPANY_NAME);
		 if(StringUtils.isNotEmpty(companyName)){
			 defaultName=companyName;
		 }
		 return defaultName;
	 }
	
}
