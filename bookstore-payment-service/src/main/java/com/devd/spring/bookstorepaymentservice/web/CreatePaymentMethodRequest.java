package com.devd.spring.bookstorepaymentservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentMethodRequest {

    @NotNull
    PaymentMethodType paymentMethodType;
    CreditCard creditCard;
    DebitCard debitCard;
    DirectDebit directDebit;

}
