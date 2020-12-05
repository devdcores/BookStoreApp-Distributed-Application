package com.devd.spring.bookstorebillingservice.service.impl;

import com.devd.spring.bookstorebillingservice.repository.BillingAddressRepository;
import com.devd.spring.bookstorebillingservice.repository.dao.BillingAddressDao;
import com.devd.spring.bookstorebillingservice.service.BillingAddressService;
import com.devd.spring.bookstorebillingservice.web.BillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;
import com.devd.spring.bookstorecommons.feign.AccountFeignClient;
import com.devd.spring.bookstorecommons.web.GetUserInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author: Devaraj Reddy, Date : 2019-09-20
 */
@Service
public class BillingAddressServiceImpl implements BillingAddressService {

  @Autowired
  AccountFeignClient accountFeignClient;

  @Autowired
  BillingAddressRepository billingAddressRepository;

  @Override
  public void createBillingAddress(BillingAddressRequest billingAddressRequest) {

    GetUserInfoResponse userInfo = accountFeignClient.getUserInfo();

    if (billingAddressRepository.existsByUserId(userInfo.getUserId())) {
      throw new RuntimeException("Billing Address already exists for this User!");
    }

    BillingAddressDao billingAddressDao = BillingAddressDao.builder()
        .addressLine1(billingAddressRequest.getAddressLine1())
        .addressLine2(billingAddressRequest.getAddressLine2())
        .city(billingAddressRequest.getCity())
        .country(billingAddressRequest.getCountry())
        .phone(billingAddressRequest.getPhone())
        .postalCode(billingAddressRequest.getPostalCode())
        .state(billingAddressRequest.getState())
            .userId(userInfo.getUserId())
        .build();

    billingAddressRepository.save(billingAddressDao);

  }

  @Override
  public GetBillingAddressResponse getBillingAddress() {

    GetUserInfoResponse userInfo = accountFeignClient.getUserInfo();
    Optional<BillingAddressDao> byUserId = billingAddressRepository
            .findByUserId(userInfo.getUserId());

    BillingAddressDao billingAddressDao = byUserId
        .orElseThrow(() -> new RuntimeException("Billing Address does't exist for user!"));

    return GetBillingAddressResponse.builder()
        .billingAddressId(billingAddressDao.getBillingAddressId())
        .addressLine1(billingAddressDao.getAddressLine1())
        .addressLine2(billingAddressDao.getAddressLine2())
        .city(billingAddressDao.getCity())
        .country(billingAddressDao.getCountry())
        .phone(billingAddressDao.getPhone())
        .postalCode(billingAddressDao.getPostalCode())
        .state(billingAddressDao.getState())
        .userId(billingAddressDao.getUserId())
        .build();
  }
}
