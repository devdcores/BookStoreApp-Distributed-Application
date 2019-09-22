package com.devd.spring.bookstorebillingservice.repository;

import com.devd.spring.bookstorebillingservice.repository.dao.ShippingAddressDao;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
public interface ShippingAddressRepository extends CrudRepository<ShippingAddressDao, String> {

    Optional<ShippingAddressDao> findByUserId(String userId);
    
    Boolean existsByUserId(String userId);
    
}
