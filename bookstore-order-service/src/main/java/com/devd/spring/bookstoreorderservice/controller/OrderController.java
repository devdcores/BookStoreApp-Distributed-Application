package com.devd.spring.bookstoreorderservice.controller;

import com.devd.spring.bookstoreorderservice.model.Cart;
import com.devd.spring.bookstoreorderservice.model.Order;
import com.devd.spring.bookstoreorderservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-14
 */
@RestController
public class OrderController {
    
    @Autowired
    CartService cartService;
    
    @GetMapping("/order/{cartId}")
    public String createOrder(@PathVariable("cartId") String cartId) {
        
        Order customerOrder = new Order();
        
        Cart cart = cartService.getCartByCartId(cartId);
        // Update CartId for customerOrder - set CartId
        customerOrder.setCart(cart);
        
        String userName = cart.getUserName();
        
        customerOrder.setUserName(userName);
        // Set customerid
        // Set ShippingAddressId
//        customerOrder.setShippingAddress(customer.getShippingAddress());
//
//        customerOrder.setBillingAddress(customer.getBillingAddress());
//
//        customerOrderService.addCustomerOrder(customerOrder);
        
        return "redirect:/checkout?cartId=" + cartId;
    }
}
