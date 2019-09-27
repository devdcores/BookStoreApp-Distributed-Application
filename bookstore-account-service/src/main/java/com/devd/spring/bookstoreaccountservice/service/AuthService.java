package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.web.CreateOAuthClientRequest;
import com.devd.spring.bookstoreaccountservice.web.SignInRequest;
import com.devd.spring.bookstoreaccountservice.web.SignUpRequest;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface AuthService {

  void createOAuthClient(CreateOAuthClientRequest createOAuthClientRequest);

  String authenticateUser(SignInRequest signInRequest);

  String registerUser(SignUpRequest signUpRequest);
}
