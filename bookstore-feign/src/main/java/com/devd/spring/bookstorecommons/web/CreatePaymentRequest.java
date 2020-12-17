package com.devd.spring.bookstorecommons.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * @author Devaraj Reddy - 17-Dec-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentRequest {
    private int amount;
    private String currency;
    private String paymentMethodId;

}
