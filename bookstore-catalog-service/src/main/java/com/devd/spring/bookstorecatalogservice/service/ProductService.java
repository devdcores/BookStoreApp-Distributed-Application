package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.dto.CreateProductRequest;
import com.devd.spring.bookstorecatalogservice.model.Product;
import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import com.devd.spring.bookstorecatalogservice.repository.ProductCategoryRepository;
import com.devd.spring.bookstorecatalogservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public String createProduct(@Valid CreateProductRequest createProductRequest) {

        Optional<ProductCategory> productCategoryOptional =
                productCategoryRepository.findById(createProductRequest.getProductCategoryId());

        ProductCategory productCategory = productCategoryOptional.orElseThrow(() -> new RuntimeException("ProductCategory doesn't exist!"));

        Product product = Product.builder()
                .productName(createProductRequest.getProductName())
                .description(createProductRequest.getDescription())
                .availableItemCount(createProductRequest.getAvailableItemCount())
                .price(createProductRequest.getPrice())
                .productCategory(productCategory)
                .build();


        Product savedProduct = productRepository.save(product);
        return savedProduct.getProductID();
    }

    public Product getProduct(String productId) {
        Optional<Product> productOptional =
                productRepository.findById(productId);

        Product product = productOptional.orElseThrow(() -> new RuntimeException("Product Id doesn't exist!"));

        return product;
    }
}
