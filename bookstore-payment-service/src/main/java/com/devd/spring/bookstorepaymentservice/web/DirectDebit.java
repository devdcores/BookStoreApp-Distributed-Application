package com.devd.spring.bookstorepaymentservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DirectDebit {
    private String iban;
    private String accountNumber;
    private String branchCode;
    private String currency;
}
