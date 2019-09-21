package com.devd.spring.bookstorebillingservice.repository;

import com.devd.spring.bookstorebillingservice.repository.dao.BillingAddressDao;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
public interface BillingAddressRepository extends CrudRepository<BillingAddressDao, String> {

    Optional<BillingAddressDao> findByUserId(String userId);
    
    Boolean existsByUserId(String userId);
    
}
