package com.devd.spring.bookstorecatalogservice.controller;

import com.devd.spring.bookstorecatalogservice.repository.dao.Review;
import com.devd.spring.bookstorecatalogservice.service.ReviewService;
import com.devd.spring.bookstorecatalogservice.web.CreateOrUpdateReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Devaraj Reddy, Date : 08-Nov-2020
 */
@RestController
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/review")
    public ResponseEntity<?> createOrUpdateReview(@RequestBody @Valid CreateOrUpdateReviewRequest createOrUpdateReviewRequest) {

        reviewService.createOrUpdateReview(createOrUpdateReviewRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/review")
    public ResponseEntity<?> getAllReviewsForProduct(@RequestParam("productId") String productId) {
        List<Review> reviewsForProduct = reviewService.getReviewsForProduct(productId);
        return ResponseEntity.ok(reviewsForProduct);
    }
}
