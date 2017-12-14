package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.CarDao;
import com.htsoft.oa.model.admin.Car;
import com.htsoft.oa.service.admin.CarService;

public class CarServiceImpl extends BaseServiceImpl<Car> implements CarService{
	private CarDao dao;
	
	public CarServiceImpl(CarDao dao) {
		super(dao);
		this.dao=dao;
	}

}