package com.devd.spring.bookstorepaymentservice.repository.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CREDIT_CARD")
@Builder
public class CreditCard extends DateAudit{

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "CREDIT_CARD_ID", updatable = false, nullable = false)
    private String id;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "CARD_NUMBER", nullable = false)
    private String cardNumber;

    @Column(name = "LAST_4_DIGITS")
    private String last4Digits;

    @Column(name = "EXPIRATION_MONTH", nullable = false)
    private int expirationMonth;

    @Column(name = "EXPIRATION_YEAR", nullable = false)
    private int expirationYear;

    @Column(name = "CVV", nullable = false)
    private int cvv;

}

