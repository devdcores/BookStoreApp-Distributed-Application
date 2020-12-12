package com.devd.spring.bookstoreorderservice.repository.dao;

import com.devd.spring.bookstorecommons.util.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PreRemove;
import javax.persistence.Table;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */

@Entity
@Table(name = "CART_ITEM")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem extends DateAudit {
    
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "CART_ITEM_ID", updatable = false, nullable = false)
    private String cartItemId;

    @Column(name = "QUANTITY", nullable = false)
    private int quantity;

    @Column(name = "ITEM_PRICE", nullable = false)
    private double itemPrice;

    @Column(name = "EXTENDED_PRICE", nullable = false)
    private double extendedPrice;
    
    @Column(name = "PRODUCT_ID", nullable = false)
    private String productId;

    @Column(name = "PRODUCT_NAME", nullable = false)
    private String productName;
    
    @ManyToOne
    @JoinColumn(name = "CART_ID")
    @JsonIgnore
    private Cart cart;
    
    @PreRemove
    public void dismissParent() {
        this.cart.dismissChild(this); //SYNCHRONIZING THE OTHER SIDE OF RELATIONSHIP
        this.cart = null;
    }
    
    @Override
    public String toString() {
        return "CartItem{" +
                       "cartItemId='" + cartItemId + '\'' +
                       ", quantity=" + quantity +
                       ", itemPrice=" + itemPrice +
                       ", productId='" + productId + '\'' +
                       '}';
    }
}
