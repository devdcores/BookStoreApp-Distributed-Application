package com.devd.spring.bookstoreaccountservice.model;

import com.devd.spring.bookstoreaccountservice.repository.dao.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy, Date : 2019-06-17
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

  private String cartId;
  private User user;

}
