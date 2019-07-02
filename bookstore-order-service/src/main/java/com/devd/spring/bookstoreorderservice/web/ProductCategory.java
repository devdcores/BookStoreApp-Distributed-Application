package com.devd.spring.bookstoreorderservice.web;

import com.devd.spring.bookstoreorderservice.model.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-04
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCategory extends DateAudit {

    private String productCategoryId;
    private String productCategoryName;
    private String description;
}
