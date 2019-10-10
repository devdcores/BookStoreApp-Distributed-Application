package com.devd.spring.bookstorebillingservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.ApplicationEventPublisher;

@SpringBootApplication
@EnableFeignClients(basePackages = {"com.devd.spring"})
@EnableCircuitBreaker
@EnableHystrixDashboard
@EnableDiscoveryClient
@EnableConfigurationProperties
@Slf4j
public class BookstoreBillingServiceApplication implements ApplicationRunner {

	@Autowired
	private ApplicationEventPublisher eventPublisher;

	public static void main(String[] args) {
		SpringApplication.run(BookstoreBillingServiceApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("HereItGo");
		eventPublisher.publishEvent(
				"RaleDeva");
	}
}

