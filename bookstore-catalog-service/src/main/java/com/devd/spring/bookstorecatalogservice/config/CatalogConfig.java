package com.devd.spring.bookstorecatalogservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Configuration
@EnableSwagger2
public class CatalogConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.devd.spring"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Catalog Service REST Api's",
                "",
                "v1",
                "",
                new Contact("Devaraj Reddy", "https://github.com/devdcores", "devarajreddy.gdr@gmail.com"),
                "License of API", "API license URL", Collections.emptyList());
    }


}
