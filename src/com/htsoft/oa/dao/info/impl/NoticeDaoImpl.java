package com.htsoft.oa.dao.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NoticeDao;
import com.htsoft.oa.model.info.Notice;

public class NoticeDaoImpl extends BaseDaoImpl<Notice> implements NoticeDao {

	public NoticeDaoImpl() {
		super(Notice.class);
	}

	@Override
	public List<Notice> findBySearch(Notice notice, Date from, Date to,
			PagingBean pb) {
		StringBuffer hql = new StringBuffer("from Notice notice where 1=1");
		List params = new ArrayList();
		if(!"".equals(notice.getPostName())&&notice.getPostName()!=null){
			hql.append("and notice.postName like ?");
			params.add("%"+notice.getPostName()+"%");
		}
		if(!"".equals(notice.getNoticeTitle())&&notice.getNoticeTitle()!=null){
			hql.append("and notice.noticeTitle like ?");
			params.add("%"+notice.getNoticeTitle()+"%");
		}
		if(from!=null){
			hql.append("and notice.effectivDate > ?");
			params.add(from);
		}
		if(to!=null){
			hql.append("and notice.expirationDate < ?");
			params.add(to);
		}
		return findByHql(hql.toString(), params.toArray(), pb);
	}

	@Override
	public List<Notice> findByNoticeId(Long noticeId, PagingBean pb) {
		final String hql = "from Notice notice where notice.noticeId=?";
		Object[] params ={noticeId} ;
		return findByHql(hql, params, pb);
	}

	@Override
	public List<Notice> findBySearch(String searchContent, PagingBean pb) {
		ArrayList params=new ArrayList();
		StringBuffer hql = new StringBuffer("from Notice nt where nt.state = ?");
		params.add(Constants.FLAG_ACTIVATION);	
		if(StringUtils.isNotEmpty(searchContent)){
			hql.append(" and (nt.noticeTitle like ? or nt.noticeContent like ?)");
			params.add("%"+searchContent+"%");
			params.add("%"+searchContent+"%");
		}
		return findByHql(hql.toString(),params.toArray(), pb);
	}
}
