package com.devd.spring.bookstoreorderservice.web;

import com.devd.spring.bookstoreorderservice.repository.dao.OrderBillingAddress;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderItem;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderShippingAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderResponse {
    private String orderId;
    private List<OrderItem> orderItems = new ArrayList<>();
    private OrderShippingAddress shippingAddress;
    private OrderBillingAddress billingAddress;
    private String paymentMethod;
    private Double itemsTotalPrice;
    private Double taxPrice;
    private Double shippingPrice;
    private Double totalPrice;
    boolean isPaid;
    boolean isDelivered;
    private Instant created_at;
}
