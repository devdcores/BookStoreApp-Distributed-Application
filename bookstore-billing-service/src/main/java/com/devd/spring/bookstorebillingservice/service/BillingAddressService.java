package com.devd.spring.bookstorebillingservice.service;

import com.devd.spring.bookstorebillingservice.feign.AccountFeignClient;
import com.devd.spring.bookstorebillingservice.feign.CatalogFeignClient;
import com.devd.spring.bookstorebillingservice.model.User;
import com.devd.spring.bookstorebillingservice.repository.BillingAddressRepository;
import com.devd.spring.bookstorebillingservice.repository.dao.BillingAddressDao;
import com.devd.spring.bookstorebillingservice.web.CreateBillingAddressRequest;
import com.devd.spring.bookstorebillingservice.web.GetBillingAddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Service
public class BillingAddressService {
    
    @Autowired
    AccountFeignClient accountFeignClient;
    
    @Autowired
    BillingAddressRepository billingAddressRepository;
    
    public void createBillingAddress(CreateBillingAddressRequest createBillingAddressRequest) {
    
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();
        
        User userById = accountFeignClient.getUserByUserName(userName);
        
        if(billingAddressRepository.existsByUserId(userById.getUserId())){
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
    
    public GetBillingAddressResponse getBillingAddress() {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();
        User userById = accountFeignClient.getUserByUserName(userName);
        Optional<BillingAddressDao> byUserId = billingAddressRepository.findByUserId(userById.getUserId());
        
        BillingAddressDao billingAddressDao = byUserId.orElseThrow(() -> new RuntimeException("Billing Address does't exist for user!"));
        
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
