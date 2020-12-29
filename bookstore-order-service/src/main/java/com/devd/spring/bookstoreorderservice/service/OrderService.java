package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.web.CreateOrderRequest;
import com.devd.spring.bookstoreorderservice.web.CreateOrderResponse;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderRequest;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderResponse;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
public interface OrderService {

    CreateOrderResponse createOrder(CreateOrderRequest createOrderRequest);

    PreviewOrderResponse previewOrder(PreviewOrderRequest previewOrderRequest);

    CreateOrderResponse getOrderById(String orderId);

    List<CreateOrderResponse> getMyOrders();

    List<CreateOrderResponse> getAllOrders();
}
