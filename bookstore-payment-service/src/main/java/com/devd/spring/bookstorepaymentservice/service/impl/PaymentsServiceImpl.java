package com.devd.spring.bookstorepaymentservice.service.impl;

import com.devd.spring.bookstorecommons.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstorepaymentservice.repository.UserPaymentCustomerRepository;
import com.devd.spring.bookstorepaymentservice.repository.dao.UserPaymentCustomer;
import com.devd.spring.bookstorepaymentservice.service.PaymentsService;
import com.devd.spring.bookstorepaymentservice.web.CreatePaymentRequest;
import com.devd.spring.bookstorepaymentservice.web.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

import static com.devd.spring.bookstorecommons.util.CommonUtilityMethods.getUserIdFromToken;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Service
public class PaymentsServiceImpl implements PaymentsService {

    @Autowired
    private UserPaymentCustomerRepository userPaymentCustomerRepository;

    @Override
    public CreatePaymentResponse createPaymentRequest(CreatePaymentRequest createPaymentRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = getUserIdFromToken(authentication);
        UserPaymentCustomer customer = userPaymentCustomerRepository.findByUserId(userIdFromToken);

        Map<String, Object> params = new HashMap<>();
        params.put("amount", createPaymentRequest.getAmount());
        params.put("currency", createPaymentRequest.getCurrency());
        params.put("payment_method", createPaymentRequest.getPaymentMethodId());
        params.put("customer", customer.getPaymentCustomerId());
        params.put("confirm", true);

        try {
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            CreatePaymentResponse createPaymentResponse = new CreatePaymentResponse();

            Optional<Charge> paidRecord = paymentIntent.getCharges().getData().stream().filter(Charge::getPaid).findAny();

            if (paidRecord.isPresent()) {
                createPaymentResponse.setPaymentId(paidRecord.get().getId());
                LocalDateTime paymentTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(paidRecord.get().getCreated()), TimeZone.getDefault().toZoneId());
                createPaymentResponse.setPaymentDate(paymentTime);
                createPaymentResponse.setCaptured(true);
                createPaymentResponse.setReceipt_url(paidRecord.get().getReceiptUrl());
                return createPaymentResponse;
            } else {
                createPaymentResponse.setCaptured(false);
                return createPaymentResponse;
            }

        } catch (StripeException e) {
            e.printStackTrace();
            throw new RunTimeExceptionPlaceHolder("Error while doing payment!!");
        }

    }
}
