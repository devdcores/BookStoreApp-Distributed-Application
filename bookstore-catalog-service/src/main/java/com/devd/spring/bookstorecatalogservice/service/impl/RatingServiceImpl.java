package com.devd.spring.bookstorecatalogservice.service.impl;

import com.devd.spring.bookstorecatalogservice.repository.RatingRepository;
import com.devd.spring.bookstorecatalogservice.repository.dao.Product;
import com.devd.spring.bookstorecatalogservice.repository.dao.Rating;
import com.devd.spring.bookstorecatalogservice.service.ProductService;
import com.devd.spring.bookstorecatalogservice.service.RatingService;
import com.devd.spring.bookstorecatalogservice.web.CreateOrUpdateRatingRequest;
import com.devd.spring.bookstorecatalogservice.web.ProductResponse;
import com.devd.spring.bookstorecommons.feign.AccountFeignClient;
import com.devd.spring.bookstorecommons.web.GetUserInfoResponse;
import com.devd.spring.bookstorecommons.web.GetUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    AccountFeignClient accountFeignClient;

    @Autowired
    ProductService productService;

    @Override
    public void createOrUpdateRating(CreateOrUpdateRatingRequest createOrUpdateRatingRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();

        GetUserInfoResponse user = accountFeignClient.getUserInfo();

        //check whether product exists.
        ProductResponse product = productService.getProduct(createOrUpdateRatingRequest.getProductId());
        if(product==null){
            throw new RuntimeException("Product doesn't exist!");
        }

        Optional<Rating> rating = ratingRepository.findByUserIdAndProductId(user.getUserId(), createOrUpdateRatingRequest.getProductId());

        if (rating.isPresent()) {
            Rating updatedRating = rating.get();
            updatedRating.setRatingValue(createOrUpdateRatingRequest.getRatingValue());
            ratingRepository.save(updatedRating);
        } else {
            Rating newRating = Rating.builder()
                    .ratingValue(createOrUpdateRatingRequest.getRatingValue())
                    .userId(user.getUserId())
                    .userName(userName)
                    .productId(createOrUpdateRatingRequest.getProductId())
                    .build();
            ratingRepository.save(newRating);
        }

    }

    @Override
    public List<Rating> getRatingForProduct(String productId) {
        Optional<List<Rating>> ratingforProducts = ratingRepository.findByProductId(productId);
        if(ratingforProducts.isPresent()) {
            return ratingforProducts.get();
        }
        return new ArrayList<>();
    }
}
