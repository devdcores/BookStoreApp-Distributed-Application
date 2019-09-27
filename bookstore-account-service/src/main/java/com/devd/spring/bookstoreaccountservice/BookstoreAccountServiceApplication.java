package com.devd.spring.bookstoreaccountservice;

import com.devd.spring.bookstorecommons.security.GlobalResourceServerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

/**
 * @author: Devaraj Reddy, Date : 2019-05-16
 */
@SpringBootApplication
@EnableEurekaClient
@ComponentScan(basePackages = {"com.devd.spring"}, excludeFilters = {
    @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = GlobalResourceServerConfig.class)})
@EnableFeignClients
public class BookstoreAccountServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(BookstoreAccountServiceApplication.class, args);
  }

}
