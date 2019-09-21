package com.devd.spring.bookstoreorderservice.service.impl;

import com.devd.spring.bookstoreorderservice.model.Cart;
import com.devd.spring.bookstoreorderservice.model.Order;
import com.devd.spring.bookstoreorderservice.model.OrderItem;
import com.devd.spring.bookstoreorderservice.repository.OrderItemRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderRepository;
import com.devd.spring.bookstoreorderservice.service.CartService;
import com.devd.spring.bookstoreorderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-09-20
 */
@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    OrderRepository orderRepository;
    
    @Autowired
    OrderItemRepository orderItemRepository;
    
    @Autowired
    CartService cartService;
    
    @Override
    public String createOrder() {
    
        Order order = new Order();
        Cart cart = cartService.getCart();
        order.setUserName(cart.getUserName());
    
        Order savedOrder = orderRepository.save(order);
        
        List<OrderItem> orderItems = cart.getCartItem()
                                         .stream()
                                         .map((cartItem -> {
                                             OrderItem orderItem = new OrderItem();
                                             orderItem.setOrder(savedOrder);
                                             orderItem.setOrderItemPrice(cartItem.getPrice());
                                             orderItem.setProductId(cartItem.getProductId());
                                             orderItem.setOrderItemPrice(cartItem.getPrice());
                                             orderItem.setQuantity(cartItem.getQuantity());
                                             return orderItemRepository.save(orderItem);
                                         }))
                                         .collect(Collectors.toList());
    
        savedOrder.setOrderItems(orderItems);
        savedOrder.setTotalOrderPrice(cart.getTotalPrice());
        orderRepository.save(savedOrder);
    
        return savedOrder.getOrderId();
    }
}
