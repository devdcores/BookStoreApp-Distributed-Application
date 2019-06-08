package com.devd.spring.bookstorecatalogservice.model;

/**
 * * @author: Devaraj Reddy,
 * Date : 2019-06-07
 */
public enum ProductOrderByEnum {

    PRODUCTNAME("productName"), PRICE("price"), AVAILABLEITEMCOUNT("availableItemCount");

    private String orderByCode;

    ProductOrderByEnum(String orderBy) {
        this.orderByCode = orderBy;
    }

    public String getOrderByCode() {
        return this.orderByCode;
    }
}
