package com.htsoft.oa.dao.document.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocPrivilegeDao;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;

public class DocPrivilegeDaoImpl extends BaseDaoImpl<DocPrivilege> implements DocPrivilegeDao{

	public DocPrivilegeDaoImpl() {
		super(DocPrivilege.class);
	}

	@Override
	public List<DocPrivilege> getAll(DocPrivilege docPrivilege,Long folderId, PagingBean pb) {
		StringBuffer hql=new StringBuffer("from DocPrivilege vo where 1=1");
		ArrayList list=new ArrayList();
		if(folderId!=null){
		    hql.append(" and vo.docFolder.folderId=?");
			list.add(folderId);
		}
		if(docPrivilege!=null){
			if(docPrivilege.getUdrName()!=null){
				hql.append(" and vo.udrName=?");
				list.add(docPrivilege.getUdrName());
			}
			if(docPrivilege.getFlag()!=null){
				hql.append(" and vo.flag=?");
				list.add(docPrivilege.getFlag());
			}
		}
		return findByHql(hql.toString(),list.toArray(),pb);
	}

	@Override
	public List<DocPrivilege> getByPublic(DocPrivilege docPrivilege,Long urdId) {
		StringBuffer sb=new StringBuffer("from DocPrivilege vo where 1=1");
		return findByHql(sb.toString());
	}

	@Override
	public List<Integer> getRightsByFolder(AppUser user, Long folderId) {
		List<Integer> rights=new ArrayList<Integer>();
		List list=new ArrayList();
		StringBuffer buff=new StringBuffer("from DocPrivilege vo where vo.docFolder.folderId=?");
		list.add(folderId);
		buff.append(" and (");
		if(user!=null){
			buff.append("(vo.udrId=? and vo.flag=1)");
			list.add(Integer.parseInt(user.getUserId().toString()));
		}
		if(user.getDepartment()!=null){
			buff.append(" or (vo.udrId=? and vo.flag=2)");
			list.add(Integer.parseInt(user.getDepartment().getDepId().toString()));
		}
		if(user.getRoles()!=null&&user.getRoles().size()>0){
			Set<AppRole> roles=user.getRoles();
			StringBuffer sb=new StringBuffer();
			Iterator it=roles.iterator();
			while(it.hasNext()){
				sb.append(((AppRole)it.next()).getRoleId()+",");
			}
			if(roles.size()>0){
				sb.deleteCharAt(sb.length()-1);
			}
			if(sb!=null){
				buff.append(" or (vo.udrId in ("+sb+") and vo.flag=3)");
			}
		}
		buff.append(" )");
		List<DocPrivilege> docPr=findByHql(buff.toString(),list.toArray());
		if(docPr!=null){
			for(DocPrivilege doc:docPr){
				rights.add(doc.getRights());
			}
		}
		return rights;
	}

	@Override
	public Integer getRightsByDocument(AppUser user, Long docId) {
		List list=new ArrayList();
		StringBuffer buff=new StringBuffer("select pr from Document doc,DocFolder docF,DocPrivilege pr where doc.docFolder=docF and pr.docFolder=docF and pr.rights>0 and doc.docId=?");
		list.add(docId);		
		buff.append(" and (");
		if(user!=null){
			buff.append("(pr.udrId=? and pr.flag=1)");
			list.add(Integer.parseInt(user.getUserId().toString()));
		}
		if(user.getDepartment()!=null){
			buff.append(" or (pr.udrId=? and pr.flag=2)");
			list.add(Integer.parseInt(user.getDepartment().getDepId().toString()));
		}
		if(user.getRoles()!=null&&user.getRoles().size()>0){
			Set<AppRole> roles=user.getRoles();
			StringBuffer sb=new StringBuffer();
			Iterator it=roles.iterator();
			while(it.hasNext()){
				sb.append(((AppRole)it.next()).getRoleId()+",");
			}
			if(roles.size()>0){
				sb.deleteCharAt(sb.length()-1);
			}
			if(sb!=null){
				buff.append(" or (pr.udrId in ("+sb+") and pr.flag=3)");
			}
		}
		buff.append(" )");
		List<DocPrivilege> docPr=findByHql(buff.toString(),list.toArray());
		Integer right=0;
		if(docPr!=null){
			for(DocPrivilege doc:docPr){
				right|=doc.getRights();
			}
		}
		return right;
	}
	
	@Override
	public Integer countPrivilege() {
        String hql="from DocPrivilege pr";
		List<DocPrivilege> list=findByHql(hql);
		return list.size();
	}

}