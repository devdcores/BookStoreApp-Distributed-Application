package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.web.CreateOrUpdateReviewRequest;

/**
 * @author Devaraj Reddy, Date : 08-Nov-2020
 */
public interface ReviewService {

    void createOrUpdateReview(CreateOrUpdateReviewRequest createOrUpdateReviewRequest);

}
