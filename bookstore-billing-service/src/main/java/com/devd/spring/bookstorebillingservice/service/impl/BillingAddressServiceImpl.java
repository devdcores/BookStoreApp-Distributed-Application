package com.devd.spring.bookstorebillingservice.service.impl;

import com.devd.spring.bookstorebillingservice.repository.BillingAddressRepository;
import com.devd.spring.bookstorebillingservice.repository.dao.BillingAddressDao;
import com.devd.spring.bookstorebillingservice.service.BillingAddressService;
import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;
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
public class BillingAddressServiceImpl implements BillingAddressService {

  @Autowired
  AccountFeignClient accountFeignClient;

  @Autowired
  BillingAddressRepository billingAddressRepository;

  @Override
  public void createBillingAddress(CreateBillingAddressRequest createBillingAddressRequest) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userName = (String) authentication.getPrincipal();

    GetUserResponse userById = accountFeignClient.getUserByUserName(userName);

    if (billingAddressRepository.existsByUserId(userById.getUserId())) {
      throw new RuntimeException("Billing Address already exists for this User!");
    }

    BillingAddressDao billingAddressDao = BillingAddressDao.builder()
        .addressLine1(createBillingAddressRequest.getAddressLine1())
        .addressLine2(createBillingAddressRequest.getAddressLine2())
        .city(createBillingAddressRequest.getCity())
        .country(createBillingAddressRequest.getCountry())
        .phone(createBillingAddressRequest.getPhone())
        .postalCode(createBillingAddressRequest.getPostalCode())
        .state(createBillingAddressRequest.getState())
        .userId(userById.getUserId())
        .build();

    billingAddressRepository.save(billingAddressDao);

  }

  @Override
  public GetBillingAddressResponse getBillingAddress() {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String userName = (String) authentication.getPrincipal();
    GetUserResponse userById = accountFeignClient.getUserByUserName(userName);
    Optional<BillingAddressDao> byUserId = billingAddressRepository
        .findByUserId(userById.getUserId());

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
