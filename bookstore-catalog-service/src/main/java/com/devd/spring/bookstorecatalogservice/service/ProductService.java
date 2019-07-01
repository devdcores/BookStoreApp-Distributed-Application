package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.web.CreateProductRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductRequest;
import com.devd.spring.bookstorecatalogservice.model.Product;
import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import com.devd.spring.bookstorecatalogservice.model.ProductOrderByEnum;
import com.devd.spring.bookstorecatalogservice.repository.ProductCategoryRepository;
import com.devd.spring.bookstorecatalogservice.repository.ProductRepository;
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

    public void deleteProduct(String productId) {

        productRepository.deleteById(productId);

    }

    public void updateProduct(UpdateProductRequest updateProductRequest) {

        Optional<ProductCategory> productCategoryOptional =
                productCategoryRepository.findById(updateProductRequest.getProductCategoryId());

        //check weather product category exists
        ProductCategory productCategory = productCategoryOptional.orElseThrow(() -> new RuntimeException("ProductCategory doesn't exist!"));

        Optional<Product> productOptional =
                productRepository.findById(updateProductRequest.getProductID());

        //check weather product exists
        final Product productExisting = productOptional.orElseThrow(() -> new RuntimeException("Product Id doesn't exist!"));

        Product product = Product.builder()
                .productID(updateProductRequest.getProductID())
                .productName(updateProductRequest.getProductName())
                .description(updateProductRequest.getDescription())
                .availableItemCount(updateProductRequest.getAvailableItemCount())
                .price(updateProductRequest.getPrice())
                .productCategory(productCategory)
                .build();

        product.setCreated_at(productExisting.getCreated_at());

        productRepository.save(product);
    }

    public Page<Product> findAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> getAllProducts(ProductOrderByEnum orderBy, Sort.Direction direction, int page,
                                                  int size) {
        Pageable pageable = PageRequest.of(page, size, direction, orderBy.getOrderByCode());
        Page<Product> data = productRepository.findAll(pageable);
        return data;
    }
}
