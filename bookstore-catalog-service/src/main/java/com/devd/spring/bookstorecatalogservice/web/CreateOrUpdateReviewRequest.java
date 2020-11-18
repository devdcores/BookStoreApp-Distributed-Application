package com.devd.spring.bookstorecatalogservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrUpdateReviewRequest {

    @NotNull(message = "productId should not be null!")
    @NotEmpty(message = "productId should not be empty!")
    private String productId;

    private String reviewMessage;

    @Min(value = 1)
    @Max(value = 5)
    private double ratingValue;
}
