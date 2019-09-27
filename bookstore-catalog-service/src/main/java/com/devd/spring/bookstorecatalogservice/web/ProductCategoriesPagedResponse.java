package com.devd.spring.bookstorecatalogservice.web;

import com.devd.spring.bookstorecatalogservice.repository.dao.ProductCategory;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-08-29
 */
@Data
public class ProductCategoriesPagedResponse {
    
    Page<ProductCategory> page;
    Map<String, String> _links = new HashMap<>();
    
}
