package com.devd.spring.bookstoreaccountservice.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-04-12 12:04
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Error {
    private String code;
    private String message;
}
