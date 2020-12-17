package com.devd.spring.bookstorecommons.feign;

import com.devd.spring.bookstorecommons.web.CreatePaymentRequest;
import com.devd.spring.bookstorecommons.web.CreatePaymentResponse;
import com.devd.spring.bookstorecommons.web.GetPaymentMethodResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author Devaraj Reddy, Date : 15-Dec-2020
 */
@FeignClient("bookstore-payment-service")
public interface PaymentFeignClient {

    @GetMapping("/paymentMethod/{paymentMethodId}")
    GetPaymentMethodResponse getMyPaymentMethodById(@PathVariable("paymentMethodId") String paymentMethodId);

    @PostMapping("/pay")
    CreatePaymentResponse doPayment(CreatePaymentRequest createPaymentRequest);
}
