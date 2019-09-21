package com.devd.spring.bookstoreaccountservice.service;

import com.devd.spring.bookstoreaccountservice.exception.Error;
import com.devd.spring.bookstoreaccountservice.exception.ErrorResponse;
import com.devd.spring.bookstoreaccountservice.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstoreaccountservice.exception.SuccessCodeWithErrorResponse;
import com.devd.spring.bookstoreaccountservice.repository.RoleRepository;
import com.devd.spring.bookstoreaccountservice.repository.UserRepository;
import com.devd.spring.bookstoreaccountservice.repository.dao.Role;
import com.devd.spring.bookstoreaccountservice.repository.dao.User;
import com.devd.spring.bookstoreaccountservice.web.CreateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-30
 */
@Service
public class UserService {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;


    public String createUser(CreateUserRequest createUserRequest) {

        String encodedPassword = passwordEncoder.encode(createUserRequest.getPassword());

        if (userRepository.existsByUserName(createUserRequest.getUserName())) {
            throw new RunTimeExceptionPlaceHolder("Username is already taken!!");
        }

        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            throw new RunTimeExceptionPlaceHolder("Email address already in use!!");
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(new ArrayList<>())
                .build();

        List<Role> validRoles = new ArrayList<>();

        createUserRequest.getRoleNames().forEach(roleName -> {

            //if role exists add to list and persist, else add to error response persist valid roles and send
            // response containing invalid roles.
            roleRepository.findByRoleName(roleName).<Runnable>map(role -> () -> validRoles.add(role))
                    .orElse(() -> {
                        Error error = Error.builder()
                                .code("400")
                                .message(roleName + " role doesn't exist")
                                .build();
                        errorResponse.getErrors().add(error);
                    })
                    .run();
        });

        User user = User.builder()
                .userName(createUserRequest.getUserName())
                .email(createUserRequest.getEmail())
                .firstName(createUserRequest.getFirstName())
                .lastName(createUserRequest.getLastName())
                .password(encodedPassword)
                .roles(new HashSet<>(validRoles))
                .build();

        User savedUser = userRepository.save(user);

        if (!errorResponse.getErrors().isEmpty()) {
            throw new SuccessCodeWithErrorResponse(savedUser.getUserId(), errorResponse);
        }
    
        return savedUser.getUserId();
    }

    public User getUserByUserName(String userName) {

        Optional<User> userNameOrEmailOptional = userRepository.findByUserNameOrEmail(userName, userName);
        User user = userNameOrEmailOptional.orElseThrow(() ->
                new RunTimeExceptionPlaceHolder("UserName or Email doesn't exist!!")
        );

        return user;
    }
    
    public User getUserByUserId(String userId) {
        Optional<User> userIdOptional = userRepository.findByUserId(userId);
        User user = userIdOptional.orElseThrow(() ->
                                                                new RunTimeExceptionPlaceHolder("UserName or Email doesn't exist!!")
                                                       );
        
        return user;
    }
}
