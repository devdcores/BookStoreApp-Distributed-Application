package com.devd.spring.bookstorecommons.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Devaraj Reddy, Date : 14-Dec-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetPaymentMethodResponse {

    private String paymentMethodId;
    private String cardType;
    private String cardLast4Digits;
    private Long cardExpirationMonth;
    private Long cardExpirationYear;
    private String cardCountry;

}
