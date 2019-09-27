package com.devd.spring.bookstoreaccountservice.web;

import lombok.Value;

/**
 * @author devaraj.reddy
 */
@Value
public class JwtAuthenticationResponse {

  private String accessToken;
  private String tokenType = "Bearer";
}
