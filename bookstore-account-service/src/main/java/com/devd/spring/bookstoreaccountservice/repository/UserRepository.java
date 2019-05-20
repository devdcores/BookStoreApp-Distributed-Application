package com.devd.spring.bookstoreaccountservice.repository;


import com.devd.spring.bookstoreaccountservice.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-17
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserName(String username);

    User findByUserNameOrEmail(String uName, String eMail);

    Boolean existsByUserName(String userName);

    Boolean existsByEmail(String email);
}
