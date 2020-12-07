package com.devd.spring.bookstoreorderservice.web;

import com.devd.spring.bookstorecommons.web.GetAddressResponse;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    List<OrderItem> orderItems = new ArrayList<>();
    GetAddressResponse shippingAddress;
    GetAddressResponse billingAddress;
    String paymentMethod;
    Double itemsTotalPrice;
    Double taxPrice;
    Double shippingPrice;
    Double totalPrice;
    boolean isPaid;
    boolean isDelivered;
}
