package com.devd.spring.bookstoreaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

/**
 * @author: Devaraj Reddy, Date : 2019-06-30
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    @Size(min = 6, max = 20, message = "password length should not be between 6 and 20 characters")
    private String password;

    @Size(max = 40, message = "First Name length should not be grater than 40 characters")
    private String firstName;

    private String lastName;

    @Size(max = 40, message = "email length should not be grater than 40 characters")
    @Email
    private String email;

}
