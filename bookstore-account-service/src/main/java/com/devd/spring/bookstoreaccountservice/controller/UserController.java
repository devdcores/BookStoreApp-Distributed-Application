package com.devd.spring.bookstoreaccountservice.controller;

import com.devd.spring.bookstoreaccountservice.repository.dao.User;
import com.devd.spring.bookstoreaccountservice.service.UserService;
import com.devd.spring.bookstoreaccountservice.web.CreateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-30
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserRequest createUserRequest) {

        String userId = userService.createUser(createUserRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{userId}")
                .buildAndExpand(userId).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/user/{userName}")
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity<User> getUserByUserName(@PathVariable("userName") String userName) {

        User user = userService.getUserByUserName(userName);

        return ResponseEntity.ok(user);
    }


    //TODO CRUD for user
}
