package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.model.Cart;
import com.devd.spring.bookstoreorderservice.model.CartItem;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
public interface CartItemService {

    void addCartItem(CartItem cartItem);
    void removeCartItem(String CartItemId);
    void removeAllCartItems(Cart cart);

}
