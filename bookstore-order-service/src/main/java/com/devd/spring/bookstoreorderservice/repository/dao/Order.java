package com.devd.spring.bookstoreorderservice.repository.dao;

import com.devd.spring.bookstorecommons.util.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
public class Order extends DateAudit {
    
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "ORDER_ID", updatable = false, nullable = false)
    private String orderId;
    
    @Column(name = "USER_NAME", nullable = false)
    private String userName;

    @Column(name = "USER_ID", nullable = false)
    private String userId;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "TOTAL_ITEMS_PRICE", nullable = false)
    private double totalItemsPrice;

    @Column(name = "TOTAL_ORDER_PRICE", nullable = false)
    private double totalOrderPrice;

    @Column(name = "PAYMENT_METHOD_ID", nullable = false)
    private String paymentMethodId;

    @Column(name = "TAX_PRICE", nullable = false)
    private double taxPrice;

    @Column(name = "SHIPPING_PRICE", nullable = false)
    private double shippingPrice;

    @Column(name = "IS_PAID")
    private boolean isPaid;

    @Column(name = "PAYMENT_ID")
    private String paymentId;

    @Column(name = "PAYMENT_DATE")
    private LocalDateTime paymentDate;

    @Column(name = "PAYMENT_RECEIPT_URL")
    private String paymentReceiptUrl;

    @Column(name = "DELIVERED_DATE")
    private LocalDateTime deliveredDate;

    @Column(name = "IS_DELIVERED")
    private boolean isDelivered;

}
