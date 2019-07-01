package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.exception.Error;
import com.devd.spring.bookstoreaccountservice.exception.ErrorResponse;
import com.devd.spring.bookstoreaccountservice.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstoreaccountservice.exception.SuccessCodeWithErrorResponse;
import com.devd.spring.bookstoreaccountservice.repository.RoleRepository;
import com.devd.spring.bookstoreaccountservice.repository.UserRepository;
import com.devd.spring.bookstoreaccountservice.repository.dao.Role;
import com.devd.spring.bookstoreaccountservice.repository.dao.User;
import com.devd.spring.bookstoreaccountservice.web.MapRoleToUsersRequest;
import com.devd.spring.bookstoreaccountservice.web.MapUserToRolesRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-01
 */
@Service
public class UserRoleService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    public void mapUserToRoles(String userNameOrEmail, MapUserToRolesRequest mapUserToRolesRequest) {

        User byUserNameOrEmail = userRepository.findByUserNameOrEmail(userNameOrEmail, userNameOrEmail);

        if (byUserNameOrEmail == null) {
            throw new RunTimeExceptionPlaceHolder("UserNameOrEmail doesn't exist!!");
        }

        Set<Role> roles = byUserNameOrEmail.getRoles();

        ErrorResponse errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(new ArrayList<>())
                .build();

        mapUserToRolesRequest.getRoleNames().forEach(roleName -> {
            //if role exists add to list and persist, else add to error response persist valid roles and send
            // response containing invalid roles.
            roleRepository.findByRoleName(roleName).<Runnable>map(role -> () -> roles.add(role))
                    .orElse(() -> {
                        Error error = Error.builder()
                                .code("400")
                                .message(roleName + " role doesn't exist!!")
                                .build();
                        errorResponse.getErrors().add(error);
                    })
                    .run();
        });

        byUserNameOrEmail.setRoles(roles);

        userRepository.save(byUserNameOrEmail);

        if (!errorResponse.getErrors().isEmpty()) {
            throw new SuccessCodeWithErrorResponse(errorResponse);
        }

    }

    public void mapRoleToUsers(String roleName, MapRoleToUsersRequest mapRoleToUsersRequest) {

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role doesn't exist!!"));

        ErrorResponse errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(new ArrayList<>())
                .build();

        mapRoleToUsersRequest.getUserNames().forEach(userName -> {
            userRepository.findByUserName(userName).<Runnable>map(user -> () -> role.addUser(user))
                    .orElse(() -> {
                        Error error = Error.builder()
                                .code("400")
                                .message(userName + " userName doesn't exist!!")
                                .build();
                        errorResponse.getErrors().add(error);
                    })
                    .run();
        });

        roleRepository.save(role);

        if (!errorResponse.getErrors().isEmpty()) {
            throw new SuccessCodeWithErrorResponse(errorResponse);
        }
    }
}
