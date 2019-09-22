package com.devd.spring.bookstorebillingservice.controller;

import com.devd.spring.bookstorebillingservice.service.BillingAddressService;
import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-04
 */
@RestController
public class BillingAddressController {
    
    @Autowired
    BillingAddressService billingAddressService;
    
    @PostMapping("/billingAddress")
    public ResponseEntity<Object> createBillingAddress(@RequestBody CreateBillingAddressRequest createBillingAddressRequest) {
        
        billingAddressService.createBillingAddress(createBillingAddressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
        
    }
    
    @GetMapping("/billingAddress")
    public ResponseEntity<GetBillingAddressResponse> getBillingAddress(){
    
        GetBillingAddressResponse billingAddress = billingAddressService.getBillingAddress();
        return ResponseEntity.ok(billingAddress);
    }
    
}
