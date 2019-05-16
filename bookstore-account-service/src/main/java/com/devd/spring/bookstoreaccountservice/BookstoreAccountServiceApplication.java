package com.devd.spring.bookstoreaccountservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-16
 */
@SpringBootApplication
@EnableEurekaClient
public class BookstoreAccountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreAccountServiceApplication.class, args);
	}

}
