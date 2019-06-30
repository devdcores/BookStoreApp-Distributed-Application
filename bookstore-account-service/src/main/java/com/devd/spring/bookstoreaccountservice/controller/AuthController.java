package com.devd.spring.bookstoreaccountservice.controller;

import com.devd.spring.bookstoreaccountservice.web.CreateOAuthClientRequest;
import com.devd.spring.bookstoreaccountservice.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstoreaccountservice.web.JwtAuthenticationResponse;
import com.devd.spring.bookstoreaccountservice.web.SignInRequest;
import com.devd.spring.bookstoreaccountservice.repository.dao.OAuthClient;
import com.devd.spring.bookstoreaccountservice.repository.dao.Role;
import com.devd.spring.bookstoreaccountservice.web.SignUpRequest;
import com.devd.spring.bookstoreaccountservice.repository.OAuthClientRepository;
import com.devd.spring.bookstoreaccountservice.repository.RoleRepository;
import com.devd.spring.bookstoreaccountservice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.micrometer.core.instrument.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
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
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.charset.StandardCharsets.UTF_8;

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

    @Value("${security.jwt.key-store}")
    private Resource keyStore;

    @Value("${security.jwt.key-store-password}")
    private String keyStorePassword;

    @Value("${security.jwt.key-pair-alias}")
    private String keyPairAlias;

    @Value("${security.jwt.key-pair-password}")
    private String keyPairPassword;

    @Value("${security.jwt.public-key}")
    private Resource publicKey;


    private int jwtExpirationInMs = 3000000;

    @PostMapping("/")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<Void> addClientId(@Valid @RequestBody CreateOAuthClientRequest createOAuthClientRequest) {

        String encode = passwordEncoder.encode(createOAuthClientRequest.getClient_secret());

        OAuthClient oAuthClient = OAuthClient.builder()
                .client_id(createOAuthClientRequest.getClient_id())
                .client_secret(encode)
                .authorities(String.join(", ", createOAuthClientRequest.getAuthorities()))
                .authorized_grant_types(String.join(", ", createOAuthClientRequest.getAuthorized_grant_types()))
                .scope(String.join(", ", createOAuthClientRequest.getScope()))
                .resource_ids(String.join(", ", createOAuthClientRequest.getResource_ids()))
                .build();

        oAuthClientRepository.save(oAuthClient);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getUsernameOrEmail(),
                        signInRequest.getPassword()
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
        com.devd.spring.bookstoreaccountservice.repository.dao.User user =
                new com.devd.spring.bookstoreaccountservice.repository.dao.User(
                        signUpRequest.getUserName(),
                        signUpRequest.getPassword(),
                        signUpRequest.getFirstName(),
                        signUpRequest.getLastName(),
                        signUpRequest.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByRoleName("STANDARD_USER")
                .orElseThrow(() -> new RuntimeException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        com.devd.spring.bookstoreaccountservice.repository.dao.User result = userRepository.save(user);

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

        String singingKeyBase64Encoded = getPublicKeyAsString();

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

    private String getPublicKeyAsString() {
        try {
            return IOUtils.toString(publicKey.getInputStream(), UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
