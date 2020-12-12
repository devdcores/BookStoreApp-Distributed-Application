package com.devd.spring.bookstorecatalogservice.repository.dao;

import com.devd.spring.bookstorecommons.util.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-04
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_CATEGORY")
@Builder
public class ProductCategory extends DateAudit {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "PRODUCT_CATEGORY_ID", updatable = false, nullable = false)
    private String productCategoryId;

    @Column(name = "PRODUCT_CATEGORY_NAME", nullable = false)
    private String productCategoryName;

    @OneToMany(
            mappedBy = "productCategory",
            cascade = CascadeType.ALL
    )
    private List<Product> products;
    private String description;
}
