package com.devd.spring.bookstorepaymentservice.service;

import com.devd.spring.bookstorepaymentservice.web.CreatePaymentRequest;
import com.devd.spring.bookstorepaymentservice.web.CreatePaymentResponse;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
public interface PaymentsService {
    CreatePaymentResponse createPaymentRequest(CreatePaymentRequest createPaymentRequest);
}
