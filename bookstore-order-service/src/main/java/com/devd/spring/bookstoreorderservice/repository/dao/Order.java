package com.devd.spring.bookstoreorderservice.repository.dao;

import lombok.AllArgsConstructor;
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
import javax.persistence.Table;
import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@Entity
@Table(name = "ORDER_TABLE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "ORDER_ID", updatable = false, nullable = false)
    private String orderId;
    
    @Column(name = "USER_NAME", nullable = false)
    private String userName;

//    @OneToOne
//    @JoinColumn(name = "SHIPPING_ADDRESS_ID")
//    private ShippingAddress shippingAddress;
//
//    @OneToOne
//    @JoinColumn(name = "BILLING_ADDRESS_ID")
//    private BillingAddress billingAddress;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
    
    @Column(name = "TOTAL_ORDER_PRICE", nullable = false)
    private double totalOrderPrice;

}
