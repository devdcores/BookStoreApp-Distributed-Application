package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface BillingAddressService {

  void createBillingAddress(CreateBillingAddressRequest createBillingAddressRequest);

  GetBillingAddressResponse getBillingAddress();
}
