package com.devd.spring.bookstorebillingservice.web;

import lombok.Builder;
import lombok.Data;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-21
 */
@Data
@Builder
public class GetShippingAddressResponse {
    
    private String shippingAddressId;
    private String userId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String phone;
    
}
