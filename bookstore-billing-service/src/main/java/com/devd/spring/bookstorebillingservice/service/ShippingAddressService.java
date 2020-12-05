package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.web.ShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface ShippingAddressService {

  void createShippingAddress(ShippingAddressRequest shippingAddressRequest);

  GetShippingAddressResponse getShippingAddress();

  void updateShippingAddress(ShippingAddressRequest shippingAddressRequest);
}
