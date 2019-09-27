package com.devd.spring.bookstoreorderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-13-06
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.devd.spring"})
//, excludeFilters={
//		@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE, value=GlobalSecurityConfig.class)})
@EnableFeignClients(basePackages = {"com.devd.spring"})
@EnableEurekaClient
public class BookstoreOrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookstoreOrderServiceApplication.class, args);
    }

}
