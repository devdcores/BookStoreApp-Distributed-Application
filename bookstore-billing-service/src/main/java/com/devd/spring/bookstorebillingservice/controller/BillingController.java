package com.devd.spring.bookstorebillingservice.controller;

import com.devd.spring.bookstorebillingservice.service.BillingService;
import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-04
 */
@RestController
public class BillingController {
    
    @Autowired
    BillingService billingService;
    
    @PostMapping("/billingAddress")
    public ResponseEntity<Object> createBillingAddress(@RequestBody CreateBillingAddressRequest createBillingAddressRequest) {
        
        billingService.createBillingAddress(createBillingAddressRequest);
        
        return ResponseEntity.ok("DevD");
        
    }
}
