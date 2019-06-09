package com.devd.spring.bookstorecatalogservice.model;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-09
 */
public enum  ProductCategoryOrderByEnum {

    PRODUCTCATEGORYNAME("productCategoryName");

    private String orderByCode;

    ProductCategoryOrderByEnum(String orderBy) {
        this.orderByCode = orderBy;
    }

    public String getOrderByCode() {
        return this.orderByCode;
    }

}
