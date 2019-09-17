package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.repository.RoleRepository;
import com.devd.spring.bookstoreaccountservice.repository.dao.Role;
import com.devd.spring.bookstoreaccountservice.web.CreateRoleRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-30
 */
@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;


    public String createRole(CreateRoleRequest createRoleRequest) {

        Role role = Role.builder()
                .roleName(createRoleRequest.getRoleName())
                .roleDescription(createRoleRequest.getRoleDescription())
                .build();

        Role savedRole = roleRepository.save(role);
        return savedRole.getId();
    }
    
    public List<Role> getAllRoles() {
        List<Role> allRoles = roleRepository.findAll();
        return allRoles;
    }
}
