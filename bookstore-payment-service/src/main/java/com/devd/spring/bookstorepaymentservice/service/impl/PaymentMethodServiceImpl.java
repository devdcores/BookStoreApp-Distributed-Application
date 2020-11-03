package com.devd.spring.bookstorepaymentservice.service.impl;

import com.devd.spring.bookstorecommons.feign.AccountFeignClient;
import com.devd.spring.bookstorecommons.web.GetUserResponse;
import com.devd.spring.bookstorepaymentservice.repository.CreditCardRepository;
import com.devd.spring.bookstorepaymentservice.repository.dao.CreditCard;
import com.devd.spring.bookstorepaymentservice.service.PaymentMethodService;
import com.devd.spring.bookstorepaymentservice.web.CreatePaymentMethodRequest;
import com.devd.spring.bookstorepaymentservice.web.PaymentMethodType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Service
@Slf4j
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private AccountFeignClient accountFeignClient;

    @Override
    public void createPaymentMethod(CreatePaymentMethodRequest createPaymentMethodRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();

        GetUserResponse userDetails = accountFeignClient.getUserByUserName(userName);

        if (createPaymentMethodRequest.getPaymentMethodType() == PaymentMethodType.CREDIT_CARD) {
            CreditCard creditCard = CreditCard.builder()
                    .userId(userDetails.getUserId())
                    .cardNumber(createPaymentMethodRequest.getCreditCard().getCardNumber())
                    .firstName(createPaymentMethodRequest.getCreditCard().getFirstName())
                    .lastName(createPaymentMethodRequest.getCreditCard().getLastName())
                    .expirationMonth(createPaymentMethodRequest.getCreditCard().getExpirationMonth())
                    .expirationYear(createPaymentMethodRequest.getCreditCard().getExpirationYear())
                    .cvv(createPaymentMethodRequest.getCreditCard().getCvv())
                    .last4Digits(createPaymentMethodRequest.getCreditCard().getLast4Digits())
                    .build();

            creditCardRepository.save(creditCard);
        }

    }
}
