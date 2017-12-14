package com.htsoft.oa.action.customer;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;
/**
 * 
 * @author csx
 *
 */
public class CustomerAction extends BaseAction{
	@Resource
	private CustomerService customerService;
	private Customer customer;
	
	private Long customerId;

	private String customerNo;
	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getCustomerNo() {
		return customerNo;
	}

	public void setCustomerNo(String customerNo) {
		this.customerNo = customerNo;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Customer> list= customerService.getAll(filter);
		
		Type type=new TypeToken<List<Customer>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				customerService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		Customer customer=customerService.get(customerId);
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(customer));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		boolean pass = false;
		StringBuffer buff = new StringBuffer("{");
		if(customer.getCustomerId()==null){//新增客户时的验证
			if(customerService.checkCustomerNo(customer.getCustomerNo())){
									pass = true;
			}else buff.append("msg:'客户已存在,请重新填写.',rewrite:true,");
		}else{
			pass = true;
		}
		if(pass){
			customerService.save(customer);
			buff.append("success:true,customerId:"+customer.getCustomerId()+"}");
		}else{
			buff.append("failure:true}");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 系统按时间生成客户编号给用户
	 * @return
	 */
	public String number(){
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss-SSS");
		String customerNo = date.format(new Date());
		setJsonString("{success:true,customerNo:'"+customerNo+"'}");
		return SUCCESS;
	}
	
	/**
	 * 验证客户编号是否可用
	 * @return
	 */
	public String check(){
		boolean pass = false;
		pass = customerService.checkCustomerNo(customerNo);
		if(pass){
			setJsonString("{success:true,pass:true}");
		}else{
			setJsonString("{success:true,pass:false}");
		}
		return SUCCESS;
	}
}
