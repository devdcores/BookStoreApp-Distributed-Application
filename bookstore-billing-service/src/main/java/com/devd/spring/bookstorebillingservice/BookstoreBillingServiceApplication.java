package com.devd.spring.bookstorebillingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BookstoreBillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreBillingServiceApplication.class, args);
	}

}
