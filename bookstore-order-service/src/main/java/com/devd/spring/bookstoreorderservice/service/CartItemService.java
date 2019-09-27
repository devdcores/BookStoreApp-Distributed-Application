package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.repository.dao.CartItem;
import com.devd.spring.bookstoreorderservice.web.CartItemRequest;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
public interface CartItemService {

    void addCartItem(CartItemRequest cartItemRequest);
    void removeCartItem(String cartItemId);
    CartItem getCartItem(String cartItemId);
    void removeAllCartItems(String cartId);

}
