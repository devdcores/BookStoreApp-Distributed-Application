package com.devd.spring.bookstoreapigatewayservice.config;

import brave.sampler.Sampler;
import com.devd.spring.bookstoreapigatewayservice.filters.PostFilter;
import com.devd.spring.bookstoreapigatewayservice.filters.PreFilter;
import com.devd.spring.bookstoreapigatewayservice.filters.RouteFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-15
 */
@Configuration
public class ApiGatewayConfig {

    @Bean
    public Sampler sampler() {
        return Sampler.ALWAYS_SAMPLE;
    }

    @Bean
    public PreFilter preFilter() {
        return new PreFilter();
    }

    @Bean
    public PostFilter postFilter() {
        return new PostFilter();
    }

    @Bean
    public RouteFilter routeFilter() {
        return new RouteFilter();
    }

}
