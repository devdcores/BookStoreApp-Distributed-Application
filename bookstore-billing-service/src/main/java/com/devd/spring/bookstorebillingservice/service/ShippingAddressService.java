package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.web.CreateShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface ShippingAddressService {

  void createShippingAddress(CreateShippingAddressRequest createShippingAddressRequest);

  GetShippingAddressResponse getShippingAddress();
}
