package com.devd.spring.bookstoreaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy, Date : 2019-10-07
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserInfoResponse {

  private String userId;
  private String userName;
  private String firstName;
  private String lastName;
  private String email;

}
