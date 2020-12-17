package com.devd.spring.bookstorepaymentservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author Devaraj Reddy - 17-Dec-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePaymentRequest {

    private int amount;
    @NotBlank
    private String currency;
    @NotBlank
    private String paymentMethodId;

}
