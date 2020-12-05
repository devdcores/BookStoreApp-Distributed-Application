package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.web.BillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface BillingAddressService {

  void createBillingAddress(BillingAddressRequest billingAddressRequest);

  GetBillingAddressResponse getBillingAddress();
}
