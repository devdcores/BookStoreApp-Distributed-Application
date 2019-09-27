package com.devd.spring.bookstoreorderservice.repository;

import com.devd.spring.bookstoreorderservice.repository.dao.Order;
import org.springframework.data.repository.CrudRepository;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-18
 */
public interface OrderRepository extends CrudRepository<Order, String> {

}
