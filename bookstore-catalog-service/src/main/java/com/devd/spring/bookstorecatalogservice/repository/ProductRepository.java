package com.devd.spring.bookstorecatalogservice.repository;

import com.devd.spring.bookstorecatalogservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
}
