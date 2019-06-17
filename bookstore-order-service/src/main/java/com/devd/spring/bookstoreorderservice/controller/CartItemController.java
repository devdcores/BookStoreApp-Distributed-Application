package com.devd.spring.bookstoreorderservice.controller;

import com.devd.spring.bookstoreorderservice.model.Cart;
import com.devd.spring.bookstoreorderservice.model.CartItem;
import com.devd.spring.bookstoreorderservice.model.Customer;
import com.devd.spring.bookstoreorderservice.service.CartItemService;
import com.devd.spring.bookstoreorderservice.service.CartService;
import com.devd.spring.bookstoreorderservice.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@Controller

public class CartItemController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private CustomerService customerService;

    @RequestMapping("/cart/add/{productId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void addCartItem(@PathVariable(value = "productId") String productId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String emailId = user.getUsername();
        Customer customer = customerService.getCustomerByemailId(emailId);
        System.out.println("Customer : " + customer.getUsers().getEmailId());
        Cart cart = customer.getCart();
        System.out.println(cart);
        List<CartItem> cartItems = cart.getCartItem();
        Product product = productService.getProductById(productId);
        for (int i = 0; i < cartItems.size(); i++) {
            CartItem cartItem = cartItems.get(i);
            if (product.getProductId().equals(cartItem.getProduct().getProductId())) {
                cartItem.setQuality(cartItem.getQuality() + 1);
                cartItem.setPrice(cartItem.getQuality() * cartItem.getProduct().getProductPrice());
                cartItemService.addCartItem(cartItem);
                return;
            }
        }
        CartItem cartItem = new CartItem();
        cartItem.setQuality(1);
        cartItem.setProduct(product);
        cartItem.setPrice(product.getProductPrice() * 1);
        cartItem.setCart(cart);
        cartItemService.addCartItem(cartItem);
    }

    @RequestMapping("/cart/removeCartItem/{cartItemId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeCartItem(@PathVariable(value = "cartItemId") String cartItemId) {
        cartItemService.removeCartItem(cartItemId);
    }

    @RequestMapping("/cart/removeAllItems/{cartId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeAllCartItems(@PathVariable(value = "cartId") String cartId) {
        Cart cart = cartService.getCartByCartId(cartId);
        cartItemService.removeAllCartItems(cart);
    }

}