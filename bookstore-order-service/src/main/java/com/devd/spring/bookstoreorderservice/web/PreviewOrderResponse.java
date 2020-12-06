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
 * @author Devaraj Reddy, Date : 06-Dec-2020
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviewOrderResponse {
    List<OrderItem> orderItems = new ArrayList<>();
    GetAddressResponse shippingAddress;
    GetAddressResponse billingAddress;
    String paymentMethod;
    Double itemsPrice;
    Double taxPrice;
    Double shippingPrice;
    Double totalPrice;
}
