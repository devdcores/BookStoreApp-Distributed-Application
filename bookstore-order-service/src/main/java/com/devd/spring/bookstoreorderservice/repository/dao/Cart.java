package com.devd.spring.bookstoreorderservice.repository.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PreRemove;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@Entity
@Table(name = "CART")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "CART_ID", updatable = false, nullable = false)
    private String cartId;

    @NotEmpty
    @NotNull
    @Column(name = "USER_NAME", nullable = false)
    private String userName;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItem;
    
    @Column(name = "TOTAL_PRICE", nullable = false)
    private double totalPrice;

    public void dismissChild(CartItem cartItem) {
        this.cartItem.remove(cartItem);
    }

    @PreRemove
    public void dismissChild() {
        this.cartItem.forEach(CartItem::dismissParent); // SYNCHRONIZING THE OTHER SIDE OF RELATIONSHIP
        this.cartItem.clear();
    }
}
