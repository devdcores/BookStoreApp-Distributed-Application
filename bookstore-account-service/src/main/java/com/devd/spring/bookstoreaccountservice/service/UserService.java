package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.repository.dao.User;
import com.devd.spring.bookstoreaccountservice.web.CreateUserRequest;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface UserService {

  String createUser(CreateUserRequest createUserRequest);

  User getUserByUserName(String userName);

  User getUserByUserId(String userId);
}
