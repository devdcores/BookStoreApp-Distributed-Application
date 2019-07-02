package com.devd.spring.bookstoreorderservice.feign;

import com.devd.spring.bookstoreorderservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-02
 */
@FeignClient("bookstore-account-service")
public interface AccountFeignClient {

    @GetMapping("/user/{userName}")
    User getUser(@PathVariable("userName") String userName);

}
