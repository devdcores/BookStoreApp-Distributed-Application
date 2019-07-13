package com.devd.spring.bookstoreorderservice.controller;

import com.devd.spring.bookstoreorderservice.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@RestController
public class CartItemController {

    @Autowired
    CartItemService cartItemService;


    @PostMapping("/cart/add/{productId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void addCartItem(@PathVariable(value = "productId") String productId) {
        cartItemService.addCartItem(productId);
    }

    @DeleteMapping("/cart/removeCartItem/{cartItemId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeCartItem(@PathVariable(value = "cartItemId") String cartItemId) {
        cartItemService.removeCartItem(cartItemId);
    }

    @DeleteMapping("/cart/removeAllItems/{cartId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeAllCartItems(@PathVariable(value = "cartId") String cartId) {
        cartItemService.removeAllCartItems(cartId);
    }

}