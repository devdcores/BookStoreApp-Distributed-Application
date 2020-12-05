package com.devd.spring.bookstorebillingservice.service.impl;

import com.devd.spring.bookstorebillingservice.repository.ShippingAddressRepository;
import com.devd.spring.bookstorebillingservice.repository.dao.ShippingAddressDao;
import com.devd.spring.bookstorebillingservice.service.ShippingAddressService;
import com.devd.spring.bookstorebillingservice.web.ShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;
import com.devd.spring.bookstorecommons.feign.AccountFeignClient;
import com.devd.spring.bookstorecommons.web.GetUserInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author: Devaraj Reddy, Date : 2019-09-20
 */
@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {

  @Autowired
  AccountFeignClient accountFeignClient;

  @Autowired
  ShippingAddressRepository shippingAddressRepository;

  @Override
  public void createShippingAddress(ShippingAddressRequest shippingAddressRequest) {

    GetUserInfoResponse userInfo = accountFeignClient.getUserInfo();

    if (shippingAddressRepository.existsByUserId(userInfo.getUserId())) {
      throw new RuntimeException("Shipping Address already exists for this User!");
    }

    ShippingAddressDao shippingAddressDao = ShippingAddressDao.builder()
        .addressLine1(shippingAddressRequest.getAddressLine1())
        .addressLine2(shippingAddressRequest.getAddressLine2())
        .city(shippingAddressRequest.getCity())
        .country(shippingAddressRequest.getCountry())
        .phone(shippingAddressRequest.getPhone())
        .postalCode(shippingAddressRequest.getPostalCode())
        .state(shippingAddressRequest.getState())
            .userId(userInfo.getUserId())
        .build();

    shippingAddressRepository.save(shippingAddressDao);

  }

  @Override
  public GetShippingAddressResponse getShippingAddress() {

    GetUserInfoResponse userInfo = accountFeignClient.getUserInfo();

    Optional<ShippingAddressDao> byUserId = shippingAddressRepository
            .findByUserId(userInfo.getUserId());

    ShippingAddressDao shippingAddressDao = byUserId
        .orElseThrow(() -> new RuntimeException("Shipping Address does't exist for user!"));

    return GetShippingAddressResponse.builder()
        .shippingAddressId(shippingAddressDao.getShippingAddressId())
        .addressLine1(shippingAddressDao.getAddressLine1())
        .addressLine2(shippingAddressDao.getAddressLine2())
        .city(shippingAddressDao.getCity())
        .country(shippingAddressDao.getCountry())
        .phone(shippingAddressDao.getPhone())
        .postalCode(shippingAddressDao.getPostalCode())
        .state(shippingAddressDao.getState())
        .userId(shippingAddressDao.getUserId())
        .build();

  }

  @Override
  public void updateShippingAddress(ShippingAddressRequest shippingAddressRequest) {
    GetUserInfoResponse userInfo = accountFeignClient.getUserInfo();

    if (!shippingAddressRepository.existsByUserId(userInfo.getUserId())) {
      throw new RuntimeException("Shipping Address doesn't exists for this User!");
    }

    GetShippingAddressResponse existingShippingAddress = getShippingAddress();

    ShippingAddressDao shippingAddressDao = ShippingAddressDao.builder()
            .shippingAddressId(existingShippingAddress.getShippingAddressId())
            .addressLine1(shippingAddressRequest.getAddressLine1())
            .addressLine2(shippingAddressRequest.getAddressLine2())
            .city(shippingAddressRequest.getCity())
            .country(shippingAddressRequest.getCountry())
            .phone(shippingAddressRequest.getPhone())
            .postalCode(shippingAddressRequest.getPostalCode())
            .state(shippingAddressRequest.getState())
            .userId(userInfo.getUserId())
            .build();

    shippingAddressRepository.save(shippingAddressDao);
  }
}
