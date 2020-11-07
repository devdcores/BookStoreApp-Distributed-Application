package com.devd.spring.bookstorecatalogservice.controller;

import com.devd.spring.bookstorecatalogservice.service.RatingService;
import com.devd.spring.bookstorecatalogservice.web.CreateOrUpdateRatingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
@RestController
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping("/rating")
    public ResponseEntity<?> createOrUpdateRating(@RequestBody @Valid CreateOrUpdateRatingRequest createOrUpdateRatingRequest) {

        ratingService.createOrUpdateRating(createOrUpdateRatingRequest);
        return ResponseEntity.ok().build();
    }
}
