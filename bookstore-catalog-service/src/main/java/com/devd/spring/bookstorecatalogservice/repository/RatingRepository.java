package com.devd.spring.bookstorecatalogservice.repository;

import com.devd.spring.bookstorecatalogservice.repository.dao.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Devaraj Reddy, Date : 07-Nov-2020
 */
@Repository
public interface RatingRepository extends JpaRepository<Rating, String> {

    Optional<Rating> findByUserIdAndProductId(String userId, String productId);


    Optional<List<Rating>> findByProductId(String productId);
}
