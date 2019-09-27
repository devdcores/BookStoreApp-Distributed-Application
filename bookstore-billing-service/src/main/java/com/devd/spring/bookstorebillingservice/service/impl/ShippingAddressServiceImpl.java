package com.devd.spring.bookstorebillingservice.service.impl;

import com.devd.spring.bookstorebillingservice.repository.ShippingAddressRepository;
import com.devd.spring.bookstorebillingservice.repository.dao.ShippingAddressDao;
import com.devd.spring.bookstorebillingservice.service.ShippingAddressService;
import com.devd.spring.bookstorebillingservice.web.CreateShippingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetShippingAddressResponse;
import com.devd.spring.bookstorecommons.feign.AccountFeignClient;
import com.devd.spring.bookstorecommons.web.GetUserResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
  public void createShippingAddress(CreateShippingAddressRequest createShippingAddressRequest) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userName = (String) authentication.getPrincipal();

    GetUserResponse userById = accountFeignClient.getUserByUserName(userName);

    if (shippingAddressRepository.existsByUserId(userById.getUserId())) {
      throw new RuntimeException("Shipping Address already exists for this User!");
    }

    ShippingAddressDao shippingAddressDao = ShippingAddressDao.builder()
        .addressLine1(createShippingAddressRequest.getAddressLine1())
        .addressLine2(createShippingAddressRequest.getAddressLine2())
        .city(createShippingAddressRequest.getCity())
        .country(createShippingAddressRequest.getCountry())
        .phone(createShippingAddressRequest.getPhone())
        .postalCode(createShippingAddressRequest.getPostalCode())
        .state(createShippingAddressRequest.getState())
        .userId(userById.getUserId())
        .build();

    shippingAddressRepository.save(shippingAddressDao);

  }

  @Override
  public GetShippingAddressResponse getShippingAddress() {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userName = (String) authentication.getPrincipal();
    GetUserResponse userById = accountFeignClient.getUserByUserName(userName);

    Optional<ShippingAddressDao> byUserId = shippingAddressRepository
        .findByUserId(userById.getUserId());

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
}
