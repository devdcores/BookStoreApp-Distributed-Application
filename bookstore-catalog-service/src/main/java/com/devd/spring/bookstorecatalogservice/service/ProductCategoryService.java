package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.web.CreateProductCategoryRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductCategoryRequest;
import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import com.devd.spring.bookstorecatalogservice.model.ProductCategoryOrderByEnum;
import com.devd.spring.bookstorecatalogservice.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public void deleteProductCategory(String productCategoryId) {

        productCategoryRepository.deleteById(productCategoryId);

    }

    public void updateProductCategory(UpdateProductCategoryRequest updateProductCategoryRequest) {

        //To check weather the ProductCategory exist.
        ProductCategory getProductCategory =
                this.getProductCategory(updateProductCategoryRequest.getProductCategoryId());

        ProductCategory productCategory = ProductCategory.builder()
                .productCategoryId(updateProductCategoryRequest.getProductCategoryId())
                .productCategoryName(updateProductCategoryRequest.getProductCategoryName())
                .description(updateProductCategoryRequest.getDescription())
                .build();

        productCategory.setCreated_at(getProductCategory.getCreated_at());

        productCategoryRepository.save(productCategory);

    }

    public Page<ProductCategory> getAllProductCategories(ProductCategoryOrderByEnum orderBy, Sort.Direction direction, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, direction, orderBy.getOrderByCode());
        Page<ProductCategory> data = productCategoryRepository.findAll(pageable);
        return data;
    }
}
