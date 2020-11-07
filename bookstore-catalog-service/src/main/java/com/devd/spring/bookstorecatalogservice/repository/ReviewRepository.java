package com.devd.spring.bookstorecatalogservice.repository;

import com.devd.spring.bookstorecatalogservice.repository.dao.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

}
