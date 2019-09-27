package com.devd.spring.bookstoreorderservice.service;

import com.devd.spring.bookstoreorderservice.repository.dao.Cart;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
public interface CartService {

    Cart getCart();
    
    Cart getCartByCartId(String cartId);

    String createCart();

    Cart getCartByUserName(String userName);

}
