package com.htsoft.oa.service.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ProductDao;
import com.htsoft.oa.model.customer.Product;
import com.htsoft.oa.service.customer.ProductService;

public class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService{
	private ProductDao dao;
	
	public ProductServiceImpl(ProductDao dao) {
		super(dao);
		this.dao=dao;
	}

}