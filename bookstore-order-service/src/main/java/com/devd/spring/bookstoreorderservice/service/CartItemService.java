package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.model.CartItem;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
public interface CartItemService {

    void addCartItem(String productId);
    void removeCartItem(String cartItemId);
    CartItem getCartItem(String cartItemId);
    void removeAllCartItems(String cartId);

}
