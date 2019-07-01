package com.devd.spring.bookstorecatalogservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-04
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "PRODUCT")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product extends DateAudit {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "PRODUCT_ID", updatable = false, nullable = false)
    private String productID;

    @Column(name = "PRODUCT_NAME", nullable = false)
    private String productName;

    @Column(name = "PRODUCT_DESCRIPTION")
    private String description;
    private double price;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_CATEGORY_ID")
    private ProductCategory productCategory;

    @Column(name = "available_item_count")
    private int availableItemCount;

    public String getProductCategory() {
        return productCategory.getProductCategoryId();
    }
}
