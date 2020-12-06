package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.web.PreviewOrderRequest;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderResponse;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
public interface OrderService {
    
    String createOrder();

    PreviewOrderResponse previewOrder(PreviewOrderRequest previewOrderRequest);
}
