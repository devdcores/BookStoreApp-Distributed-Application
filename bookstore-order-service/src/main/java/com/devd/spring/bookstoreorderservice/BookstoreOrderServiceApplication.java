package com.devd.spring.bookstoreorderservice;

import com.devd.spring.bookstorecommons.security.GlobalSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-13-06
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.devd.spring"})
//, excludeFilters={
//		@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE, value=GlobalSecurityConfig.class)})
public class BookstoreOrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreOrderServiceApplication.class, args);
	}

}
