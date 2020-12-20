package com.devd.spring.bookstoreaccountservice.repository;


import com.devd.spring.bookstoreaccountservice.repository.dao.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * @author: Devaraj Reddy, Date : 2019-05-17
 */
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

  Optional<User> findByUserName(String username);

  Optional<User> findByUserNameOrEmail(String uName, String eMail);

  Optional<User> findByUserId(String userId);

  void deleteByUserId(String userId);

  Boolean existsByUserName(String userName);

  Boolean existsByEmail(String email);

}
