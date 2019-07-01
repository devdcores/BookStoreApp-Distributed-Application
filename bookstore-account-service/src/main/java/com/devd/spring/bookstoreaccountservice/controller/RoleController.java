package com.devd.spring.bookstoreaccountservice.controller;

import com.devd.spring.bookstoreaccountservice.service.RoleService;
import com.devd.spring.bookstoreaccountservice.web.CreateRoleRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/role")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> createRole(@RequestBody @Valid CreateRoleRequest createRoleRequest) {

        String userId = roleService.createRole(createRoleRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{roleId}")
                .buildAndExpand(userId).toUri();

        return ResponseEntity.created(location).build();
    }

    //TODO CRUD for role
}
