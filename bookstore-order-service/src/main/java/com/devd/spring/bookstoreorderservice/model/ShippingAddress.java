package com.devd.spring.bookstoreorderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@Entity
@Table(name = "SHIPPING_ADDRESS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShippingAddress {
    
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "SHIPPING_ADDRESS_ID", updatable = false, nullable = false)
    private String shippingAddressId;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String country;
    
    //User details field needed
}
