package com.devd.spring.bookstoreorderservice.service.impl;

import com.devd.spring.bookstoreorderservice.feign.AccountFeignClient;
import com.devd.spring.bookstoreorderservice.feign.CatalogFeignClient;
import com.devd.spring.bookstoreorderservice.model.Cart;
import com.devd.spring.bookstoreorderservice.model.CartItem;
import com.devd.spring.bookstoreorderservice.repository.CartItemRepository;
import com.devd.spring.bookstoreorderservice.service.CartItemService;
import com.devd.spring.bookstoreorderservice.service.CartService;
import com.devd.spring.bookstoreorderservice.web.CartItemRequest;
import com.devd.spring.bookstoreorderservice.web.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-07-13
 */
@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    CartService cartService;

    @Autowired
    CatalogFeignClient catalogFeignClient;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    AccountFeignClient accountFeignClient;

    @Override
    public void addCartItem(CartItemRequest cartItemRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = (String) authentication.getPrincipal();
        Cart cartByUserName = cartService.getCartByUserName(userName);

        if (cartByUserName == null) {
            //create cart for user if not exists.
            cartService.createCart();
            cartByUserName = cartService.getCartByUserName(userName);
        }
    
        Product product = catalogFeignClient.getProduct(cartItemRequest.getProductId());

        //If the product already exists in the cart, update its quantity and price.
    
        if (cartByUserName.getCartItem() != null) {
            for (CartItem ci : cartByUserName.getCartItem()) {
    
                if (product.getProductId().equals(ci.getProductId())) {
                    ci.setQuantity(ci.getQuantity() + 1);
                    ci.setPrice(ci.getQuantity() * product.getPrice());
                    cartItemRepository.save(ci);
                    return;
                }
            }
        }

        //If cart doesn't have any cartItems, then create cartItem.
        CartItem cartItem = CartItem.builder()
                                    .cart(cartByUserName)
                                    .price(product.getPrice())
                                    .quantity(1)
                                    .productId(product.getProductId())
                                    .build();

        cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(String cartItemId) {
        CartItem cartItem = this.getCartItem(cartItemId);
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem getCartItem(String cartItemId) {
        Optional<CartItem> byCartItemId = cartItemRepository.findByCartItemId(cartItemId);
        return byCartItemId.orElseThrow(()-> new RuntimeException("CartItem doesn't exist!!"));
    }

    @Override
    public void removeAllCartItems(String cartId) {

        Cart cart = cartService.getCartByCartId(cartId);
        List<CartItem> cartItems = cart.getCartItem();
        if (cartItems != null && !cartItems.isEmpty()) {
            cartItems.forEach((ci) -> {
                this.removeCartItem(ci.getCartItemId());
            });
        }
    }
}
