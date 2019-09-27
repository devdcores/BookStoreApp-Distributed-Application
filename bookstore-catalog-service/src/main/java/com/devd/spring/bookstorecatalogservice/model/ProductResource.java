package com.devd.spring.bookstorecatalogservice.model;

import com.devd.spring.bookstorecatalogservice.repository.dao.Product;
import lombok.Data;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;


/**
 * @author: Devaraj Reddy,
 * Date : 2019-08-27
 */
@Data
public class ProductResource extends Resource<Product> {
    
    private Pageable pageable;
    
    public ProductResource(Product content, Link... links) {
        super(content, links);
    }
}
