package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.repository.dao.Product;
import com.devd.spring.bookstorecatalogservice.web.CreateProductRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductRequest;
import javax.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface ProductService {

  String createProduct(@Valid CreateProductRequest createProductRequest);

  Product getProduct(String productId);

  void deleteProduct(String productId);

  void updateProduct(UpdateProductRequest updateProductRequest);

  Page<Product> findAllProducts(Pageable pageable);

  Page<Product> getAllProducts(String sort, Integer page, Integer size);
}
