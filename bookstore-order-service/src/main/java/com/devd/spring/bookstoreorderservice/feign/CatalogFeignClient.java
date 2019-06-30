package com.devd.spring.bookstoreorderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-03
 */
@FeignClient("bookstore-order-service")
public interface CatalogFeignClient {

}
