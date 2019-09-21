package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.feign.AccountFeignClient;
import com.devd.spring.bookstorebillingservice.feign.CatalogFeignClient;
import com.devd.spring.bookstorebillingservice.model.User;
import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Service
public class BillingService {
    
    @Autowired
    AccountFeignClient accountFeignClient;
    
    @Autowired
    CatalogFeignClient catalogFeignClient;
    
    public void createBillingAddress(CreateBillingAddressRequest createBillingAddressRequest) {
    
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();
    
        Product product = catalogFeignClient.getProduct("402880e46b2d7ce9016b2d7d28350003");
        
        User userById = accountFeignClient.getUserByUserName(userName);
        
        System.out.println(userById);
    
    }
}
