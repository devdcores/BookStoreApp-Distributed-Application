package com.devd.spring.bookstoreorderservice.controller;

import com.devd.spring.bookstoreorderservice.feign.AccountFeignClient;
import com.devd.spring.bookstoreorderservice.feign.CatalogFeignClient;
import com.devd.spring.bookstoreorderservice.model.CartItem;
import com.devd.spring.bookstoreorderservice.model.User;
import com.devd.spring.bookstoreorderservice.web.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-17
 */
@RestController
public class CartItemController {

//    @Autowired
//    private CartService cartService;
//
//    @Autowired
//    private CartItemService cartItemService;
//
//    @Autowired
//    private CustomerService customerService;
//

    @Autowired
    AccountFeignClient accountFeignClient;

    @Autowired
    CatalogFeignClient catalogFeignClient;

    @PostMapping("/cart/add/{productId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void addCartItem(@PathVariable(value = "productId") String productId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userName = (String) authentication.getPrincipal();
//        String emailId = user.getUsername();
//        Customer customer = customerService.getCustomerByemailId(emailId);
//        System.out.println("Customer : " + customer.getUsers().getEmailId());
//        Cart cart = customer.getCart();
//        System.out.println(cart);
//        List<CartItem> cartItems = cart.getCartItem();

        User user = accountFeignClient.getUser(userName);
        System.out.println("USER : "+user.toString());
        
        Product product = catalogFeignClient.getProduct(productId);
        System.out.println(product.toString());

//
//        for (int i = 0; i < cartItems.size(); i++) {
//            CartItem cartItem = cartItems.get(i);
//            if (product.getProductId().equals(cartItem.getProduct().getProductId())) {
//                cartItem.setQuality(cartItem.getQuality() + 1);
//                cartItem.setPrice(cartItem.getQuality() * cartItem.getProduct().getProductPrice());
//                cartItemService.addCartItem(cartItem);
//                return;
//            }
//        }
//        CartItem cartItem = new CartItem();
//        cartItem.setQuality(1);
//        cartItem.setProduct(product);
//        cartItem.setPrice(product.getProductPrice() * 1);
//        cartItem.setCart(cart);
//        cartItemService.addCartItem(cartItem);
    }
//
//    @RequestMapping("/cart/removeCartItem/{cartItemId}")
//    @ResponseStatus(value = HttpStatus.NO_CONTENT)
//    public void removeCartItem(@PathVariable(value = "cartItemId") String cartItemId) {
//        cartItemService.removeCartItem(cartItemId);
//    }
//
//    @RequestMapping("/cart/removeAllItems/{cartId}")
//    @ResponseStatus(value = HttpStatus.NO_CONTENT)
//    public void removeAllCartItems(@PathVariable(value = "cartId") String cartId) {
//        Cart cart = cartService.getCartByCartId(cartId);
//        cartItemService.removeAllCartItems(cart);
//    }

    @GetMapping("/cart")
    @PreAuthorize("hasAuthority('ROLE_COMMERCE_CART_READ')")
    public String getRes() {
        return "Result from CartItem";
    }

}