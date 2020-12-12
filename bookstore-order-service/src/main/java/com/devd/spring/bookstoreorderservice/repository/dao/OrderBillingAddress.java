package com.devd.spring.bookstoreorderservice.repository.dao;

import com.devd.spring.bookstorecommons.util.DateAudit;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
 * @author Devaraj Reddy, Date : 07-Dec-2020
 */
@Entity
@Table(name = "ORDER_BILLING_ADDRESS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderBillingAddress extends DateAudit {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "ORDER_BILLING_ID", updatable = false, nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String orderBillingId;

    @Column(name = "ORDER_ID", updatable = false, nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String orderId;

    @Column(name = "ADDRESS_LINE1", nullable = false)
    private String addressLine1;

    @Column(name = "ADDRESS_LINE2")
    private String addressLine2;

    @Column(name = "CITY", nullable = false)
    private String city;

    @Column(name = "STATE", nullable = false)
    private String state;

    @Column(name = "POSTAL_CODE", nullable = false)
    private String postalCode;

    @Pattern(regexp = "[A-Z]{2}", message = "2-letter ISO country code required")
    @NonNull
    private String country;

    @Column(name = "PHONE")
    private String phone;
}
