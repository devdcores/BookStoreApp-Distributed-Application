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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product extends DateAudit {

    private String productID;
    private String productName;
    private String description;
    private double price;
    private String productCategory;
    private int availableItemCount;
}
