package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.web.CreateUserRequest;
import com.devd.spring.bookstoreaccountservice.web.GetUserInfoResponse;
import com.devd.spring.bookstoreaccountservice.web.GetUserResponse;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface UserService {

  String createUser(CreateUserRequest createUserRequest);

  GetUserResponse getUserByUserName(String userName);

  GetUserResponse getUserByUserId(String userId);

  GetUserInfoResponse getUserInfo();
}
