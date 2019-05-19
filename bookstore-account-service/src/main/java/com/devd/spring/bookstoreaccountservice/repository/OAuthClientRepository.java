package com.devd.spring.bookstoreaccountservice.repository;

import com.devd.spring.bookstoreaccountservice.model.OAuthClientRequest;
import com.devd.spring.bookstoreaccountservice.model.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-18
 */
public interface OAuthClientRepository extends CrudRepository<OAuthClientRequest, Long> {
}
