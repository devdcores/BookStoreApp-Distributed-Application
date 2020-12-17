package com.devd.spring.bookstorepaymentservice.service.impl;

import com.devd.spring.bookstorecommons.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstorepaymentservice.repository.UserPaymentCustomerRepository;
import com.devd.spring.bookstorepaymentservice.repository.dao.UserPaymentCustomer;
import com.devd.spring.bookstorepaymentservice.service.PaymentMethodService;
import com.devd.spring.bookstorepaymentservice.web.CreatePaymentMethodRequest;
import com.devd.spring.bookstorepaymentservice.web.GetPaymentMethodResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentMethod;
import com.stripe.model.PaymentMethodCollection;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.devd.spring.bookstorecommons.util.CommonUtilityMethods.getUserIdFromToken;
import static com.devd.spring.bookstorecommons.util.CommonUtilityMethods.getUserNameFromToken;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Service
@Slf4j
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private UserPaymentCustomerRepository userPaymentCustomerRepository;

    public PaymentMethodServiceImpl() {
    }

    @Override
    public void createPaymentMethod(CreatePaymentMethodRequest createPaymentMethodRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = getUserIdFromToken(authentication);
        String userNameFromToken = getUserNameFromToken(authentication);

        UserPaymentCustomer paymentCustomer = userPaymentCustomerRepository.findByUserId(userIdFromToken);

        String customerId;
        if (paymentCustomer == null) {
            //Create Customer at stripe end;
            customerId = createCustomerAtStripe();
            //save
            UserPaymentCustomer userPaymentCustomer = new UserPaymentCustomer();
            userPaymentCustomer.setUserId(userIdFromToken);
            userPaymentCustomer.setUserName(userNameFromToken);
            userPaymentCustomer.setPaymentCustomerId(customerId);
            userPaymentCustomerRepository.save(userPaymentCustomer);
        } else {
            customerId = paymentCustomer.getPaymentCustomerId();
        }

        //create Payment Method
        String paymentMethod = createPaymentMethodAtStripe(createPaymentMethodRequest);

        //link customer and Payment Method
        linkCustomerAndPaymentMethod(paymentMethod, customerId);

    }

    @Override
    public List<GetPaymentMethodResponse> getAllMyPaymentMethods() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = getUserIdFromToken(authentication);

        List<GetPaymentMethodResponse> list = new ArrayList<>();

        UserPaymentCustomer paymentCustomer = userPaymentCustomerRepository.findByUserId(userIdFromToken);

        if (paymentCustomer != null) {
            PaymentMethodCollection paymentMethods = getAllPaymentMethodsForCustomerFromStripe(paymentCustomer.getPaymentCustomerId());

            paymentMethods.getData().forEach(pm->{
                GetPaymentMethodResponse getPaymentMethodResponse = GetPaymentMethodResponse.builder()
                        .paymentMethodId(pm.getId())
                        .cardCountry(pm.getCard().getCountry())
                        .cardExpirationMonth(pm.getCard().getExpMonth())
                        .cardExpirationYear(pm.getCard().getExpYear())
                        .cardLast4Digits(pm.getCard().getLast4())
                        .cardType(pm.getCard().getBrand())
                        .build();

                list.add(getPaymentMethodResponse);
            });
        }

        return list;
    }

    @Override
    public GetPaymentMethodResponse getMyPaymentMethodById(String paymentMethodId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = getUserIdFromToken(authentication);

        UserPaymentCustomer paymentCustomer = userPaymentCustomerRepository.findByUserId(userIdFromToken);

        try {
            PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);

            if(!paymentCustomer.getPaymentCustomerId().equals(paymentMethod.getCustomer())){
                throw new RunTimeExceptionPlaceHolder("PaymentMethod doesn't belong to this User");
            }
            GetPaymentMethodResponse getPaymentMethodResponse = GetPaymentMethodResponse.builder()
                    .paymentMethodId(paymentMethod.getId())
                    .cardCountry(paymentMethod.getCard().getCountry())
                    .cardExpirationMonth(paymentMethod.getCard().getExpMonth())
                    .cardExpirationYear(paymentMethod.getCard().getExpYear())
                    .cardLast4Digits(paymentMethod.getCard().getLast4())
                    .cardType(paymentMethod.getCard().getBrand())
                    .build();
            return getPaymentMethodResponse;
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while fetching payment method.");
        }
    }

    private PaymentMethodCollection getAllPaymentMethodsForCustomerFromStripe(String paymentCustomerId) {

        Map<String, Object> params = new HashMap<>();
        params.put("customer", paymentCustomerId);
        params.put("type", "card");

        try {
            return PaymentMethod.list(params);
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while retrieving customer.");
        }

    }

    private void linkCustomerAndPaymentMethod(String paymentMethodId, String customerId) {

        PaymentMethod paymentMethod = null;
        try {
            paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while retrieving payment method.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("customer", customerId);

        try {
            PaymentMethod updatedPaymentMethod = paymentMethod.attach(params);
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while attaching payment method.");
        }

    }

    private String createPaymentMethodAtStripe(CreatePaymentMethodRequest createPaymentMethodRequest) {
        Map<String, Object> card = new HashMap<>();
        card.put("number", createPaymentMethodRequest.getCard().getCardNumber());
        card.put("exp_month", createPaymentMethodRequest.getCard().getExpirationMonth());
        card.put("exp_year", createPaymentMethodRequest.getCard().getExpirationYear());
        card.put("cvc", createPaymentMethodRequest.getCard().getCvv());
        Map<String, Object> params = new HashMap<>();
        params.put("type", "card");
        params.put("card", card);

        try {
            PaymentMethod paymentMethod = PaymentMethod.create(params);
            return paymentMethod.getId();
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while setting up payment method.");
        }
    }

    private String createCustomerAtStripe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = getUserIdFromToken(authentication);
        Map<String, Object> params = new HashMap<>();
        params.put(
                "description",
                "Creating Customer Account for UserId : " + userIdFromToken
        );

        try {
            return Customer.create(params).getId();
        } catch (StripeException e) {
            throw new RunTimeExceptionPlaceHolder("Error while setting up payment customer.");
        }

    }
}
