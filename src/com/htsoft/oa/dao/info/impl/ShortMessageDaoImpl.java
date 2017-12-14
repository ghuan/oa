package com.htsoft.oa.dao.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.ShortMessageDao;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;

public class ShortMessageDaoImpl extends BaseDaoImpl<ShortMessage> implements
		ShortMessageDao {

	public ShortMessageDaoImpl() {
		super(ShortMessage.class);
	}

	@Override
	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		String hql="from ShortMessage vo where vo.senderId=?";
		Object[] objs={userId};
		return findByHql(hql, objs, pb);
	}

	@Override
	public List<ShortMessage> findByUser(Long userId) {
		String hql="from ShortMessage vo where vo.senderId=?";
		Object[] objs={userId};
		return findByHql(hql,objs);
	}

	/**
	 * 收到的信息
	 */
	
	@Override
	public List searchShortMessage(Long userId,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		ArrayList paramList=new ArrayList();
		StringBuffer hql=new StringBuffer("select vo1,vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo1.delFlag=0 and vo1.userId=?");
		paramList.add(userId);
		if(shortMessage!=null){
			if(shortMessage.getMsgType()!=null){
				hql.append(" and vo2.msgType=?");
				paramList.add(shortMessage.getMsgType());
			}
			if(StringUtils.isNotEmpty(shortMessage.getSender())){
				hql.append(" and vo2.sender=?");
				paramList.add(shortMessage.getSender());
			}
		}
		if(to!=null){
			hql.append("and vo2.sendTime <= ?");
			paramList.add(to);
		}
		if(from!=null){
			hql.append("and vo2.sendTime >= ?");
			paramList.add(from);
		}
		 hql.append(" order by vo2.sendTime desc");
		return findByHql(hql.toString(), paramList.toArray(), pb);
	}


}
