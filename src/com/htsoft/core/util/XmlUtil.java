package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamSource;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.DocumentResult;
import org.dom4j.io.DocumentSource;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

/**
 * XML读写工具
 * @author csx
 *
 */
public class XmlUtil {
	
	private static final Log logger=LogFactory.getLog(XmlUtil.class);
	
	/**
	 * 把Document对象转成XML String
	 * @param document
	 * @return
	 */
	public static String docToString(Document document) {
		String s = "";
		try {
			ByteArrayOutputStream out = new ByteArrayOutputStream();

			OutputFormat format = new OutputFormat("  ", true, "UTF-8");
			XMLWriter writer = new XMLWriter(out, format);
			writer.write(document);
			s = out.toString("UTF-8");
		} catch (Exception ex) {
			logger.error("docToString error:"+ex.getMessage());
		}
		return s;
	}
	/**
	 * 把XML String转成Document对象
	 * @param s
	 * @return
	 */
	public static Document stringToDocument(String s) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(s);
		} catch (Exception ex) {
			logger.error("stringToDocument error:"+ex.getMessage());
		}
		return doc;
	}
	
	/**
	 * 把Document对象转成XML对象
	 * @param document
	 * @param filename
	 * @return
	 */
	public static boolean docToXmlFile(Document document, String filename) {
		boolean flag = true;
		try {
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("UTF-8");
			XMLWriter writer = new XMLWriter(
					new FileWriter(new File(filename)), format);
			writer.write(document);
			writer.close();
		} catch (Exception ex) {
			flag = false;
			logger.error("docToXmlFile error:"+ex.getMessage());
		}
		return flag;
	}
	/**
	 * 把String XML转成XML文件
	 * @param str
	 * @param filename
	 * @return
	 */
	public static boolean stringToXmlFile(String str, String filename) {
		boolean flag = true;
		try {
			Document doc = DocumentHelper.parseText(str);
			flag = docToXmlFile(doc, filename);
		} catch (Exception ex) {
			flag = false;
			logger.error("stringToXmlFile error:"+ex.getMessage());
		}
		return flag;
	}
	/**
	 * 加载一个XML文件转成Document对象
	 * @param filename
	 * @return
	 */
	public static Document load(String filename) {
		Document document = null;
		try {
			SAXReader saxReader = new SAXReader();
			saxReader.setEncoding("UTF-8");
			document = saxReader.read(new File(filename));
		} catch (Exception ex) {
			logger.error("load XML File error:"+ex.getMessage());
		}
		return document;
	}
	/**
	 * 通过流加载一个XML文档对象
	 * @param is
	 * @return
	 */
	public static Document load(InputStream is){
		Document document = null;
		try {
			SAXReader saxReader = new SAXReader();
			saxReader.setEncoding("UTF-8");
			document = saxReader.read(is);
		} catch (Exception ex) {
			logger.error("load XML File error:"+ex.getMessage());
		}
		return document;
	}
	
	/**
	 * 通过流加载一个XML文档对象
	 * @param is
	 * @return
	 */
	public static Document load(InputStream is,String encode){
		Document document = null;
		try {
			SAXReader saxReader = new SAXReader();
			saxReader.setEncoding(encode);
			document = saxReader.read(is);
		} catch (Exception ex) {
			logger.error("load XML File error:"+ex.getMessage());
		}
		return document;
	}
	
	public static Document styleDocument(
	        Document document, 
	        String stylesheet
	    ) throws Exception {

	        // load the transformer using JAXP
	        TransformerFactory factory = TransformerFactory.newInstance();
	        Transformer transformer = factory.newTransformer( 
	            new StreamSource( stylesheet ) 
	        );

	        // now lets style the given document
	        DocumentSource source = new DocumentSource( document );
	        DocumentResult result = new DocumentResult();
	        transformer.transform( source, result );

	        // return the transformed document
	        Document transformedDoc = result.getDocument();
	        return transformedDoc;
	    }

	
	public static void main(String[]args){
		String filePath="L:/devtools/workspace/eoffice/web/js/menu.xml";
		String style="L:/devtools/workspace/eoffice/web/js/menu-public.xsl";
		Document doc=XmlUtil.load(filePath);
		try{
			Document another=styleDocument(doc,style);
			System.out.println("xml:" + another.asXML());
			
			
			//Set idSet=new HashSet();
			 Document publicDoc=another;
			 Element rootEl=publicDoc.getRootElement();
			 List idNodes=rootEl.selectNodes("/Menus//*");
			 
			 System.out.println("size:" + idNodes.size());
			 
			 for(int i=0;i<idNodes.size();i++){
				 Element el=(Element)idNodes.get(i);
				 Attribute attr= el.attribute("id");
				 if(attr!=null){
					 System.out.println("attr:" + attr.getValue());
					 //idSet.add(attr.getValue());
				 }
			 }
			
			
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		
//		if(doc!=null){
			
//			Element el=doc.getRootElement();
//			System.out.println("NODE NAME:"+el.getName());
//			List menus=el.selectNodes("/Menus/Items[@id='Task']/*");
			
//			Node funNode=el.selectSingleNode("/Menus/Items//Item/Function[@id='_AppUserAdd']");
			
//			System.out.println("name:" + funNode.getName());
			
//			List urlEls=el.selectNodes("/Menus/Items//Item/Function");
//			
//			for(int i=0;i<urlEls.size();i++){
//				Node node=(Node)urlEls.get(i);
//				System.out.println("url:" + node.asXML());
//			}
			
//			List nodes=el.selectNodes("/Menus/Items//Item/Function[@id='_AppUserAdd']/*");
			
//			List menus=el.elements();
			
//			for(int i=0;i<menus.size();i++){
//				Element e=(Element)menus.get(i);
//				Node node=(Node)e;
//				//System.out.println("Name:"+e.getName());
//				System.out.println("xml:" + node.asXML());
//			}
			
//			for(int i=0;i<nodes.size();i++){
//				Node node=(Node)nodes.get(i);
//				
//				System.out.println("xml:" + node.getText());
//			}
			
//		}
//		StringBuffer sb=new StringBuffer("");
//		if(doc!=null){
//			Element root=doc.getRootElement();
//			List els=root.elements();
//			for(int i=0;i<els.size();i++){
//				Element el=(Element)els.get(i);
//				Attribute id=el.attribute("id");
//				Attribute text=el.attribute("text");
//				Attribute iconCls=el.attribute("iconCls");
//				
//				sb.append("{id:'").append(id==null?"":id.getValue()).append("',");
//				sb.append("text:'").append(text==null?"":text.getValue()).append("',");
//				sb.append("iconCls:'").append(iconCls==null?"":iconCls.getValue()).append("'},");
//			}
//			
//		}
//		
//		if(sb.length()>0){
//			sb.deleteCharAt(sb.length()-1);
//		}
//		
//		System.out.println("len:" + sb.toString());
		
	}
	
	

}
