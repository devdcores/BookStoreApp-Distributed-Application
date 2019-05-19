package com.devd.spring.bookstoreaccountservice.controller;

import com.devd.spring.bookstoreaccountservice.model.OAuthClientRequest;
import com.devd.spring.bookstoreaccountservice.repository.OAuthClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-18
 */
@RestController
public class AuthController {

    @Autowired
    OAuthClientRepository oAuthClientRepository;

    @PostMapping("/")
    public ResponseEntity<Void> addClientId(@Valid @RequestBody OAuthClientRequest oAuthClientRequest){


        oAuthClientRepository.save(oAuthClientRequest);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
