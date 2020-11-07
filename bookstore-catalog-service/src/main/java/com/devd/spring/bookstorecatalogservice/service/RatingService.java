package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.repository.dao.Rating;
import com.devd.spring.bookstorecatalogservice.web.CreateOrUpdateRatingRequest;

import java.util.List;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
public interface RatingService {

    void createOrUpdateRating(CreateOrUpdateRatingRequest createOrUpdateRatingRequest);

    List<Rating> getRatingForProduct(String productId);

}
