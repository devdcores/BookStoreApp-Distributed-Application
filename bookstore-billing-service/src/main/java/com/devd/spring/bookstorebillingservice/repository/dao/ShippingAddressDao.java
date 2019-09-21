package com.devd.spring.bookstorebillingservice.repository.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Entity
@Table(name = "SHIPPING_ADDRESS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShippingAddressDao {
    
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "SHIPPING_ADDRESS_ID", updatable = false, nullable = false)
    private String shippingAddressId;
    
    @Column(name = "USER_ID", nullable = false)
    private String userId;
    
    @Column(name = "ADDRESS_LINE1", nullable = false)
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
