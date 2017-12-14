package com.htsoft.oa.service.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.InMessageDao;
import com.htsoft.oa.dao.info.ShortMessageDao;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.ShortMessageService;

public class ShortMessageServiceImpl extends BaseServiceImpl<ShortMessage> implements
		ShortMessageService {
	private ShortMessageDao messageDao;
	@Resource
	private InMessageDao inMessageDao;
	@Resource
	private AppUserDao appUserDao;
	
	public ShortMessageServiceImpl(ShortMessageDao dao) {
		super(dao);
		this.messageDao=dao;
	}

	@Override
	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		return messageDao.findAll(userId, pb);
	}

	@Override
	public List<ShortMessage> findByUser(Long userId) {
		return messageDao.findByUser(userId);
	}

	@Override
	public List searchShortMessage(Long userId,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return messageDao.searchShortMessage(userId, shortMessage, from, to, pb);
	}

	public ShortMessage save (Long senderId,String receiveIds,String content,Short msgType){
		
		ShortMessage shortMessage =new ShortMessage();
		shortMessage.setContent(content);
		shortMessage.setMsgType(msgType);
		AppUser curUser=appUserDao.get(senderId);
		shortMessage.setSender(curUser.getFullname());
		shortMessage.setSenderId(curUser.getUserId());
		shortMessage.setSendTime(new Date());
		
		messageDao.save(shortMessage);
		
		String[]reIds=receiveIds.split("[,]");
		if(reIds!=null){
			
			for(String userId:reIds){
				InMessage inMsg=new InMessage();
				inMsg.setDelFlag(Constants.FLAG_UNDELETED);
				inMsg.setReadFlag(InMessage.FLAG_UNREAD);
				inMsg.setShortMessage(shortMessage);
				AppUser receiveUser=appUserDao.get(new Long(userId));
				
				inMsg.setUserId(receiveUser.getUserId());
				inMsg.setUserFullname(receiveUser.getFullname());
				inMessageDao.save(inMsg);
			}
		}
		
		return shortMessage;
	}
	
}
