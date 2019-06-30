package com.devd.spring.bookstoreaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-20
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;
}

