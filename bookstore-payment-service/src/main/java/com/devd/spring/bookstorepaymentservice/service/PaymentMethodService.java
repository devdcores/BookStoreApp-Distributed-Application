package com.devd.spring.bookstorepaymentservice.service;

import com.devd.spring.bookstorepaymentservice.web.CreatePaymentMethodRequest;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
public interface PaymentMethodService {
    void createPaymentMethod(CreatePaymentMethodRequest createPaymentMethodRequest);
}
