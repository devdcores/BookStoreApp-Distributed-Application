package com.devd.spring.bookstoreaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-30
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOAuthClientRequest {

    @NotNull(message = "client_id should not be null!")
    @NotEmpty(message = "client_id should not be empty!")
    private String client_id;
    @NotNull(message = "client_secret should not be null!")
    @NotEmpty(message = "client_secret should not be empty!")
    private String client_secret;
    private List<String> authorized_grant_types;
    private List<String> authorities;
    private List<String> scope;
    private List<String> resource_ids;
}
