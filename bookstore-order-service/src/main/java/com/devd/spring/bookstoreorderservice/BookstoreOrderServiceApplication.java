package com.devd.spring.bookstoreorderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-13-06
 */
@SpringBootApplication
@ComponentScan("com.devd.spring")
public class BookstoreOrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreOrderServiceApplication.class, args);
	}

}
