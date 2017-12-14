package com.htsoft.oa.service.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.CustomerDao;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;

public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService{
	private CustomerDao dao;
	
	public CustomerServiceImpl(CustomerDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkCustomerNo(String customerNo) {
		return dao.checkCustomerNo(customerNo);
	}

}