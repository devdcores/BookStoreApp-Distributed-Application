package com.devd.spring.bookstoreaccountservice.controller;

import com.devd.spring.bookstoreaccountservice.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstoreaccountservice.model.JwtAuthenticationResponse;
import com.devd.spring.bookstoreaccountservice.model.LoginRequest;
import com.devd.spring.bookstoreaccountservice.model.OAuthClientRequest;
import com.devd.spring.bookstoreaccountservice.model.Role;
import com.devd.spring.bookstoreaccountservice.model.SignUpRequest;
import com.devd.spring.bookstoreaccountservice.repository.OAuthClientRepository;
import com.devd.spring.bookstoreaccountservice.repository.RoleRepository;
import com.devd.spring.bookstoreaccountservice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-05-18
 */
@RestController
public class AuthController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    OAuthClientRepository oAuthClientRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Value("${security.signing-key}")
    private String signingKey;

    private int jwtExpirationInMs = 3000000;

    @PostMapping("/")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<Void> addClientId(@Valid @RequestBody OAuthClientRequest oAuthClientRequest){

        String encode = passwordEncoder.encode(oAuthClientRequest.getClient_secret());
        oAuthClientRequest.setClient_secret(encode);
        oAuthClientRequest.setScope("read,write");

        oAuthClientRepository.save(oAuthClientRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        String s = generateToken(authentication);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(s));
    }


    @PostMapping("/signup")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUserName(signUpRequest.getUserName())) {
            throw new RunTimeExceptionPlaceHolder("Username is already taken!!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RunTimeExceptionPlaceHolder("Email address already in use!!");
        }

        // Creating user's account
        com.devd.spring.bookstoreaccountservice.model.User user =
                new com.devd.spring.bookstoreaccountservice.model.User(
                        signUpRequest.getUserName(),
                        signUpRequest.getPassword(),
                        signUpRequest.getFirstName(),
                        signUpRequest.getLastName(),
                        signUpRequest.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByRoleName("STANDARD_USER")
                .orElseThrow(() -> new RuntimeException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        com.devd.spring.bookstoreaccountservice.model.User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUserName()).toUri();

        return ResponseEntity.created(location).build();
    }


    private String generateToken(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        List<String> grantedAuthorityList = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        String singingKeyBase64Encoded = Base64.getEncoder().encodeToString(signingKey.getBytes());
        return Jwts.builder()
                .claim("user_name", user.getUsername())
                .claim("authorities", grantedAuthorityList)
                .claim("aud", Arrays.asList("web"))
                .setExpiration(expiryDate)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, singingKeyBase64Encoded)
                .setHeaderParam("typ", "JWT")
                .compact();
    }

}
