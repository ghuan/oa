package com.htsoft.oa.dao.document.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocumentDao;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;

public class DocumentDaoImpl extends BaseDaoImpl<Document> implements DocumentDao{

	public DocumentDaoImpl() {
		super(Document.class);
	}

	@Override
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb) {
		ArrayList list=new ArrayList();
		StringBuffer buff=new StringBuffer();
		if(roleIds.contains(AppRole.SUPER_ROLEID)){
			buff.append("select vo from Document vo where vo.isShared=1");
		}else{
			buff.append("select vo from Document vo where vo.isShared=1 and ( 0=1 ");
			if(depId!=null){
				buff.append(" or vo.sharedDepIds like ? ");
				list.add("%,"+depId+",%");
			}
			if(roleIds!=null){
				for(Long roleId:roleIds){
			        buff.append(" or vo.sharedRoleIds like ?");
			        list.add("%,"+roleId+",%");
				}
			}
			if(userId!=null){
				buff.append(" or vo.sharedUserIds like ?");
				list.add("%,"+userId+",%");
			}
			buff.append(")");
		}
		if(document!=null){
			if(StringUtils.isNotEmpty(document.getDocName())){
				buff.append(" and vo.docName like ?");
				list.add("%"+document.getDocName()+"%");
			}
			if(StringUtils.isNotEmpty(document.getFullname())){
				buff.append(" and vo.fullname=?");
				list.add(","+document.getFullname()+",");
			}
		}
		if(to!=null){
			buff.append(" and vo.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			buff.append(" and vo.createtime >= ?");
			list.add(from);
		}
		buff.append(" order by vo desc");
		return findByHql(buff.toString(),list.toArray(),pb);
	}

	/**
	 * 查询公共文档列表
	 * 参数Path:是文件夹路径
	 * 
	 */
	@Override
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser,PagingBean pb) {
		StringBuffer sb =new StringBuffer();
		List list=new ArrayList();
		if(!appUser.getRights().contains(AppRole.SUPER_RIGHTS)){
		sb.append("select doc from Document doc,DocFolder docF,DocPrivilege pr where doc.docFolder=docF and pr.docFolder=docF");	
		Set<AppRole> roles=appUser.getRoles();
		StringBuffer buff=new StringBuffer();
		if(roles!=null){
			Iterator it=roles.iterator();
			while(it.hasNext()){
				Long roleId=((AppRole)it.next()).getRoleId();
				buff.append(roleId.toString()+',');
			}
			if(roles.size()>0){
				buff.deleteCharAt(buff.length()-1);
			}
		}
		sb.append(" and pr.rights>0 and ((pr.udrId=? and pr.flag=1)");
		Integer userId=Integer.parseInt(appUser.getUserId().toString());
		list.add(userId);
		if(appUser.getDepartment()!=null){
			Integer depId=Integer.parseInt(appUser.getDepartment().getDepId().toString());
			sb.append(" or (pr.udrId=? and pr.flag=2)");
			list.add(depId);
		}
		if(buff.toString()!=null&&buff.length()>0){
			sb.append(" or (pr.udrId in ("+buff.toString()+") and pr.flag=3)");
		}
		sb.append(")");
		}else{
			sb.append("select doc from Document doc,DocFolder docF where doc.docFolder=docF and docF.isShared=1");
		}
		if(path!=null){
			sb.append(" and docF.path like ?");
			list.add(path+"%");
		}
		if(document!=null){
			if(document.getDocName()!=null){
			   sb.append(" and doc.docName like ?");
			   list.add("%"+document.getDocName()+"%");
			}
		}
		if(to!=null){
			sb.append(" and doc.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			sb.append(" and doc.createtime >= ?");
			list.add(from);
		}
		sb.append(" group by doc order by doc desc");
		List<Document> docList=findByHql(sb.toString(),list.toArray(),pb);
		return docList;
	}

	@Override
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to, String path, PagingBean pb) {
		StringBuffer sb=new StringBuffer();
		ArrayList list=new ArrayList();		
		  sb.append("select doc from Document doc,DocFolder docFolder where doc.docFolder=docFolder and docFolder.appUser.userId is not Null");
		if(path!=null){
		  sb.append(" and docFolder.path like ?");
		  list.add(path+"%");
		}
		if(userId!=null){
			sb.append(" and doc.appUser.userId=?");
			list.add(userId);
		}
		if(document!=null){
			if(document.getDocName()!=null){
			   sb.append(" and doc.docName like ?");
			   list.add("%"+document.getDocName()+"%");
			}
		}
		if(to!=null){
			sb.append(" and vo.createtime <= ?");
			list.add(to);
		}
		if(from!=null){
			sb.append(" and vo.createtime >= ?");
			list.add(from);
		}
		sb.append(" group by doc");
		return findByHql(sb.toString(),list.toArray(),pb);
	}

	@Override
	public List<Document> findByFolder(String path) {
		String hql="select doc from Document doc where doc.docFolder.path like ?";
		List list=new ArrayList();
		list.add(path+"%");
		return findByHql(hql,list.toArray());
	}

	@Override
	public List<Document> searchDocument(AppUser appUser, String content,
			boolean isHaveData, PagingBean pb) {
		StringBuffer buff = new StringBuffer(
				"select doc from Document doc,DocFolder docF ");
		if (isHaveData) {
			buff.append(" ,DocPrivilege pr");
		}
		buff.append(" where ");
		Set<AppRole> roles = appUser.getRoles();
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		Iterator it = roles.iterator();
		if (roles.size() > 0) {
			while (it.hasNext()) {
				Long roleId = ((AppRole) it.next()).getRoleId();
				sb.append(roleId.toString() + ',');
			}
			if (roles.size() > 0) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		buff.append(" ((doc.isShared=1 and (0=1");
		if (appUser.getDepartment() != null) {
			buff.append(" or doc.sharedDepIds like ? ");
			list.add("%," + appUser.getDepartment().getDepId() + ",%");
		}
		while (it.hasNext()) {
			Long roleId = ((AppRole) it.next()).getRoleId();
			buff.append(" or doc.sharedRoleIds like ?");
			list.add("%," + roleId.toString() + ",%");
		}
		if (appUser.getUserId() != null) {
			buff.append(" or doc.sharedUserIds like ?");
			list.add("%," + appUser.getUserId() + ",%");
		}
		buff
				.append(")) or (doc.isShared=0 and doc.docFolder=docF and docF.appUser.userId is not Null and doc.appUser.userId=? )");
		list.add(appUser.getUserId());
		
		buff.append(" or (doc.docFolder=docF and docF.isShared=1");
		if (isHaveData) {	
			if (!appUser.getRights().contains(AppRole.SUPER_RIGHTS)) {
				buff.append(" and pr.docFolder=docF");
				buff.append(" and pr.rights>0 and ((pr.udrId=? and pr.flag=1)");
				Integer userId = Integer.parseInt(appUser.getUserId()
						.toString());
				list.add(userId);
				if (appUser.getDepartment() != null) {
					Integer depId = Integer.parseInt(appUser.getDepartment()
							.getDepId().toString());
					buff.append(" or (pr.udrId=? and pr.flag=2)");
					list.add(depId);
				}
				if (sb.toString() != null && sb.length() > 1) {
					buff.append(" or (pr.udrId in (" + sb.toString()
							+ ") and pr.flag=3))");
				}
			}
		}
		buff.append(")");
		
		buff.append(")");
		if (StringUtils.isNotEmpty(content)) {
			buff.append(" and (doc.content like ? or doc.docName like ?)");
			list.add("%" + content + "%");
			list.add("%" + content + "%");
		}
		buff.append(" group by doc order by doc desc");
		return findByHql(buff.toString(), list.toArray(), pb);
	}
	
	
}