package com.devd.spring.bookstorebillingservice.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.validation.constraints.Pattern;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateShippingAddressRequest {
    
    private String shippingAddressId;
    
    @NonNull
    private String userId;
    
    @NonNull
    private String addressLine1;
    private String addressLine2;
    
    @Column(name = "CITY", nullable = false)
    private String city;
    
    private String state;
    
    private String postalCode;
    
    @Pattern(regexp = "[A-Z]{2}", message = "2-letter ISO country code required")
    @NonNull
    private String country;
    
    private String phone;
    
}
