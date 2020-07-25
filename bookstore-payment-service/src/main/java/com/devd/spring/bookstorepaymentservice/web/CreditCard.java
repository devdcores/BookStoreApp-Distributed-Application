package com.devd.spring.bookstorepaymentservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditCard {
    private String firstName;
    private String lastName;
    private String cardNumber;
    private String last4Digits;
    private int expirationMonth;
    private int expirationYear;
    private int cvv;
}
