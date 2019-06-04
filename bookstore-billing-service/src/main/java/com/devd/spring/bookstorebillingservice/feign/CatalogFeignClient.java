package com.devd.spring.bookstorebillingservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-03
 */
@FeignClient("bookstore-catalog-service")
public interface CatalogFeignClient {

}
