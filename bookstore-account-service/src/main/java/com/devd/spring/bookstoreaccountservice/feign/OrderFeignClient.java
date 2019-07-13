package com.devd.spring.bookstoreaccountservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-13
 */
@FeignClient("bookstore-order-service")
public interface OrderFeignClient {

    @PostMapping("/cart")
    Map<String, String> createCart();

}
