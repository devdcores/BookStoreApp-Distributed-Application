package com.devd.spring.bookstorecommons.feign;

import com.devd.spring.bookstorecommons.web.GetUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-02
 */
@FeignClient("bookstore-account-service")
public interface AccountFeignClient {
    
    @GetMapping("/user")
    GetUserResponse getUser(@RequestParam("userName") String userName);

}
