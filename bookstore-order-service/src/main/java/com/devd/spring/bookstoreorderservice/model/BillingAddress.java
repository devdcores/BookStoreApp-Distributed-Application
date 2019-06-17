package com.devd.spring.bookstoreorderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@Entity
@Table(name = "billingAddress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String billindAddressId;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String country;

    @OneToOne(mappedBy = "billingAddress")
    private Customer customer;

}
