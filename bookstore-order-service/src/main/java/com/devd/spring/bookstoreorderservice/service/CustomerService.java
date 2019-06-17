package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.model.Customer;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
public interface CustomerService {

    void addCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer getCustomerByemailId(String emailId);

}
