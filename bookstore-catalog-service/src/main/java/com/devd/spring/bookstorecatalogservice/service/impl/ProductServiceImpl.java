package com.devd.spring.bookstorecatalogservice.service.impl;

import com.devd.spring.bookstorecatalogservice.repository.ProductCategoryRepository;
import com.devd.spring.bookstorecatalogservice.repository.ProductRepository;
import com.devd.spring.bookstorecatalogservice.repository.dao.Product;
import com.devd.spring.bookstorecatalogservice.repository.dao.ProductCategory;
import com.devd.spring.bookstorecatalogservice.repository.dao.Rating;
import com.devd.spring.bookstorecatalogservice.service.ProductService;
import com.devd.spring.bookstorecatalogservice.service.RatingService;
import com.devd.spring.bookstorecatalogservice.web.CreateProductRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    RatingService ratingService;

    @Override
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
        return savedProduct.getProductId();
    }

    @Override
    public Product getProduct(String productId) {
        Optional<Product> productOptional =
                productRepository.findById(productId);

        Product product = productOptional.orElseThrow(() -> new RuntimeException("Product Id doesn't exist!"));
        List<Rating> ratingForProduct = ratingService.getRatingForProduct(productId);
        if (ratingForProduct.size() > 0) {
            double sum = ratingForProduct.stream().mapToDouble(Rating::getRatingValue).sum();
            double rating = sum / ratingForProduct.size();
            product.setAverageRating(rating);
        }

        return product;
    }

    @Override
    public void deleteProduct(String productId) {

        productRepository.deleteById(productId);

    }

    @Override
    public void updateProduct(UpdateProductRequest updateProductRequest) {

        Optional<ProductCategory> productCategoryOptional =
                productCategoryRepository.findById(updateProductRequest.getProductCategoryId());

        //check weather product category exists
        ProductCategory productCategory = productCategoryOptional.orElseThrow(() -> new RuntimeException("ProductCategory doesn't exist!"));

        Optional<Product> productOptional =
                productRepository.findById(updateProductRequest.getProductId());

        //check weather product exists
        final Product productExisting = productOptional.orElseThrow(() -> new RuntimeException("Product Id doesn't exist!"));

        Product product = Product.builder()
                                 .productId(updateProductRequest.getProductId())
                                 .productName(updateProductRequest.getProductName())
                                 .description(updateProductRequest.getDescription())
                                 .availableItemCount(updateProductRequest.getAvailableItemCount())
                                 .price(updateProductRequest.getPrice())
                                 .productCategory(productCategory)
                                 .build();

        product.setCreated_at(productExisting.getCreated_at());

        productRepository.save(product);
    }

    @Override
    public Page<Product> findAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }
    
    @Override
    public Page<Product> getAllProducts(String sort, Integer page, Integer size) {
        
        //set defaults
        if (size == null || size == 0) {
            size = 20;
        }
        
        //set defaults
        if (page == null || page == 0) {
            page = 0;
        }
        
        Pageable pageable;
        
        if (sort == null) {
            pageable = PageRequest.of(page, size);
        } else {
            Sort.Order order;
            
            try {
                String[] split = sort.split(",");
                
                Sort.Direction sortDirection = Sort.Direction.fromString(split[1]);
                order = new Sort.Order(sortDirection, split[0]).ignoreCase();
                pageable = PageRequest.of(page, size, Sort.by(order));
                
            } catch (Exception e) {
                throw new RuntimeException("Not a valid sort value, It should be 'fieldName,direction', example : 'productName,asc");
            }
            
        }
        
        return productRepository.findAll(pageable);
        
    }
}
