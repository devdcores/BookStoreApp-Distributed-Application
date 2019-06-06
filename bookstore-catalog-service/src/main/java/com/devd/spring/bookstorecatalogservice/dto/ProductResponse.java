package com.devd.spring.bookstorecatalogservice.dto;

import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private String productID;
    private String productName;
    private String description;
    private double price;
    private ProductCategory productCategory;
    private int availableItemCount;

    @Override
    public String toString() {
        return "ProductResponse{" +
                "productID='" + productID + '\'' +
                ", productName='" + productName + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", productCategory=" + productCategory.getProductCategoryId() +
                ", availableItemCount=" + availableItemCount +
                '}';
    }
}
