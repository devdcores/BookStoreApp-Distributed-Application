package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.dto.CreateProductCategoryRequest;
import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import com.devd.spring.bookstorecatalogservice.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Service
public class ProductCategoryService {

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public String createProductCategory(@Valid CreateProductCategoryRequest createProductCategoryRequest) {

        ProductCategory productCategory = ProductCategory.builder()
                .productCategoryName(createProductCategoryRequest.getProductCategoryName())
                .description(createProductCategoryRequest.getDescription())
                .build();

        ProductCategory savedProductCategory = productCategoryRepository.save(productCategory);
        return savedProductCategory.getProductCategoryId();
    }

    public ProductCategory getProductCategory(String productCategoryId) {

        Optional<ProductCategory> productCategoryOptional = productCategoryRepository.findById(productCategoryId);

        ProductCategory productCategory = productCategoryOptional.orElseThrow(() -> new RuntimeException("Product Category doesn't exist!"));

        return productCategory;
    }
}
