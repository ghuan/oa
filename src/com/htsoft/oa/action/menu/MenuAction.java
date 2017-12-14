package com.htsoft.oa.action.menu;

/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;


import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppRole;

/**
 * 显示系统左边的功能菜单
 * @author csx
 *
 */
public class MenuAction extends BaseAction{
	
	//Menu ID
	private String id=null;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private static final String USER_MENU_DOC="_USER_MENU_DOC";
	
	/**
	 * 根据权限获取当前用户的菜单
	 * @return
	 */
	private Document getCurDocument(){
		
		HttpSession session=getSession();
		Document userDoc=(Document)session.getAttribute(USER_MENU_DOC);
		if(userDoc!=null){
			return userDoc; 
		}
		
		Document doc=AppUtil.getLeftMenuDocument();
		Set<String> rights=ContextUtil.getCurrentUser().getRights();
		
		if(rights.contains(AppRole.SUPER_RIGHTS)){//具有超级管理权限
			return doc;
		}
		
		//加上公共权限
		rights.addAll(AppUtil.getPublicMenuIds());

		Document newDoc=DocumentHelper.createDocument();
		Element root = newDoc.addElement( "Menus" );
		
		createSubMenus(rights,doc.getRootElement(),root);
		//放置newDoc至Session,为下次访问带来方便，注意一点就是Session不能随便放置太多的数据
		session.setAttribute(USER_MENU_DOC, newDoc);
		return newDoc;
		
	}
	
	private void createSubMenus(Set<String>rights,Element curNodes,Element newCurNodes){
		List els = curNodes.elements();
		if(els.size()==0) return ;
		
		for (int i = 0; i < els.size(); i++) {
			Element el = (Element) els.get(i);
			Attribute id = el.attribute("id");
			if(id!=null){
				String idVal=id.getValue();
				if(rights.contains(idVal) || idVal==null ){
					Element newNodes=newCurNodes.addElement(el.getName());
					Iterator<Attribute> it=el.attributeIterator();
					
					while(it.hasNext()){
						Attribute at=it.next();
						newNodes.addAttribute(at.getName(),at.getValue());
					}
					createSubMenus(rights,el,newNodes);
				}
			}			
		}
	}
	
	
	/**
	 * 显示某一项模块下的菜单
	 * @return
	 */
	public String items(){
		
		Document doc=getCurDocument();
		
		if(doc!=null){
			
			StringBuffer sb=new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r");
			
			Element el=doc.getRootElement();
			
			List nodes=el.selectNodes("/Menus/Items[@id='"+id+"']/*");
			
			sb.append("<Menus>\r");
			for(int i=0;i<nodes.size();i++){
				
				Node node=(Node)nodes.get(i);
				sb.append(node.asXML());
				
			}
			sb.append("\r</Menus>\r");
			setJsonString(sb.toString());
		}
		
		return SUCCESS;
	}
	
	/**
	 * 显示系统下所有的模块
	 * @return
	 */
	public String models(){
		Document doc=getCurDocument();
		StringBuffer sb = new StringBuffer("[");
		
		if (doc != null) {
			Element root = doc.getRootElement();
			List els = root.elements();

			for (int i = 0; i < els.size(); i++) {
				Element el = (Element) els.get(i);
				
				Attribute id = el.attribute("id");
				Attribute text = el.attribute("text");
				Attribute iconCls = el.attribute("iconCls");
				
				sb.append("{id:'").append(id == null ? "" : id.getValue()).append("',");
				sb.append("text:'").append(text == null ? "" : text.getValue()).append("',");
				sb.append("iconCls:'").append(iconCls == null ? "" : iconCls.getValue()).append("'},");

			}
			if(els.size()>0){
				sb.deleteCharAt(sb.length()-1);
			}
		}
		
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	
	}
	
}
