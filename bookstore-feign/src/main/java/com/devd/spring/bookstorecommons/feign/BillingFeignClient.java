package com.devd.spring.bookstorecommons.feign;

import com.devd.spring.bookstorecommons.web.GetAddressResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author: Devaraj Reddy, Date : 2019-07-02
 */
@FeignClient("bookstore-billing-service")
public interface BillingFeignClient {

    @GetMapping("/address/{addressId}")
    GetAddressResponse getAddressById(@PathVariable("addressId") String addressId);

}
