package com.devd.spring.bookstoreapigatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-14 12:39
 */
@SpringBootApplication
@EnableZuulProxy
public class BookstoreApiGatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreApiGatewayServiceApplication.class, args);
	}

}
