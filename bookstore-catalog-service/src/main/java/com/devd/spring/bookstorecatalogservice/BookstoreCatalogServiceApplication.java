package com.devd.spring.bookstorecatalogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BookstoreCatalogServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreCatalogServiceApplication.class, args);
	}

}
