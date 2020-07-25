package com.devd.spring.bookstorebillingservice.controller;

import com.devd.spring.bookstorebillingservice.service.ShippingAddressService;
import com.devd.spring.bookstorebillingservice.web.CreateShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;
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
public class ShippingAddressController {
    
    @Autowired
    ShippingAddressService shippingAddressService;
    
    @PostMapping("/shippingAddress")
    public ResponseEntity<Object> createShippingAddress(@RequestBody CreateShippingAddressRequest createShippingAddressRequest) {
        shippingAddressService.createShippingAddress(createShippingAddressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    @GetMapping("/shippingAddress")
    public ResponseEntity<GetShippingAddressResponse> getShippingAddress() {
        GetShippingAddressResponse shippingAddress = shippingAddressService.getShippingAddress();
        return ResponseEntity.ok(shippingAddress);
    }
    
}
