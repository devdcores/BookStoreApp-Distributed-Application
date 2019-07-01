package com.devd.spring.bookstoreaccountservice.repository;

import com.devd.spring.bookstoreaccountservice.repository.dao.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-17
 */
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByRoleName(String name);

    Boolean existsByRoleName(String roleName);
}
