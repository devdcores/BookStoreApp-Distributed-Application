package com.devd.spring.bookstorecatalogservice.service;

import com.devd.spring.bookstorecatalogservice.repository.dao.ProductCategory;
import com.devd.spring.bookstorecatalogservice.web.CreateProductCategoryRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductCategoryRequest;
import javax.validation.Valid;
import org.springframework.data.domain.Page;

/**
 * @author: Devaraj Reddy, Date : 2019-09-27
 */
public interface ProductCategoryService {

  String createProductCategory(@Valid CreateProductCategoryRequest createProductCategoryRequest);

  ProductCategory getProductCategory(String productCategoryId);

  void deleteProductCategory(String productCategoryId);

  void updateProductCategory(UpdateProductCategoryRequest updateProductCategoryRequest);

  Page<ProductCategory> getAllProductCategories(String sort, Integer page, Integer size);
}
