package com.devd.spring.bookstorecatalogservice.repository;

import com.devd.spring.bookstorecatalogservice.repository.dao.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Devaraj Reddy - 21-Dec-2020
 */
public interface ImageRepository extends JpaRepository<ImageModel, Long> {
    Optional<ImageModel> findByName(String name);

    Optional<ImageModel> findByImageId(String imageId);
}