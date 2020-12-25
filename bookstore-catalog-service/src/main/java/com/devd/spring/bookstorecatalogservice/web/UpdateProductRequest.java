package com.devd.spring.bookstorecatalogservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductRequest {

    @NotNull(message = "productId should not be null!")
    @NotEmpty(message = "productId should not be empty!")
    private String productId;

    private String productName;

    private String description;

    @Min(value = 0)
    private Double price;

    private String imageId;

    private String productCategoryId;

    private Integer availableItemCount;

}
