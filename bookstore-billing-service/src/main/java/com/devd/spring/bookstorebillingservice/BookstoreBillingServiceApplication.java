package com.devd.spring.bookstorebillingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients(basePackages = {"com.devd.spring"})
@EnableCircuitBreaker
@EnableHystrixDashboard
public class BookstoreBillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreBillingServiceApplication.class, args);
	}

}
