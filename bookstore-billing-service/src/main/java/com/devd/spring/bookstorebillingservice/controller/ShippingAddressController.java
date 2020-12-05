package com.devd.spring.bookstorebillingservice.controller;

import com.devd.spring.bookstorebillingservice.service.ShippingAddressService;
import com.devd.spring.bookstorebillingservice.web.ShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<Object> createShippingAddress(@RequestBody ShippingAddressRequest shippingAddressRequest) {
        shippingAddressService.createShippingAddress(shippingAddressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/shippingAddress")
    public ResponseEntity<Object> updateShippingAddress(@RequestBody ShippingAddressRequest shippingAddressRequest) {
        shippingAddressService.updateShippingAddress(shippingAddressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/shippingAddress")
    public ResponseEntity<GetShippingAddressResponse> getShippingAddress() {
        GetShippingAddressResponse shippingAddress = shippingAddressService.getShippingAddress();
        return ResponseEntity.ok(shippingAddress);
    }
    
}
