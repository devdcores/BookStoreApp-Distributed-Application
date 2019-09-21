package com.devd.spring.bookstorebillingservice.feign;

import com.devd.spring.bookstorebillingservice.model.User;
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
    User getUserByUserName(@RequestParam("userName") String userName);
    
    @GetMapping("/user")
    User getUserById(@RequestParam("userId") String userId);
    
}
