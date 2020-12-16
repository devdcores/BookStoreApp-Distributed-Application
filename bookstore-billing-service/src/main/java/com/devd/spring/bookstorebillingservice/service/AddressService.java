package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.web.CreateAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetAddressResponse;
import com.devd.spring.bookstorebillingservice.web.UpdateAddressRequest;

import java.util.List;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface AddressService {

  void createAddress(CreateAddressRequest createAddressRequest);

  List<GetAddressResponse> getAddress();

  void updateAddress(UpdateAddressRequest updateAddressRequest);

  GetAddressResponse getAddressById(String addressId);

  void deleteAddressById(String addressId);
}
