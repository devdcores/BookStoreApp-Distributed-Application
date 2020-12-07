package com.devd.spring.bookstoreorderservice.service.impl;

import com.devd.spring.bookstorecommons.feign.BillingFeignClient;
import com.devd.spring.bookstorecommons.web.GetAddressResponse;
import com.devd.spring.bookstoreorderservice.repository.OrderBillingAddressRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderItemRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderShippingAddressRepository;
import com.devd.spring.bookstoreorderservice.repository.dao.Cart;
import com.devd.spring.bookstoreorderservice.repository.dao.Order;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderBillingAddress;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderItem;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderShippingAddress;
import com.devd.spring.bookstoreorderservice.service.CartService;
import com.devd.spring.bookstoreorderservice.service.OrderService;
import com.devd.spring.bookstoreorderservice.web.CreateOrderRequest;
import com.devd.spring.bookstoreorderservice.web.CreateOrderResponse;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderRequest;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    OrderBillingAddressRepository orderBillingAddressRepository;

    @Autowired
    OrderShippingAddressRepository orderShippingAddressRepository;

    @Autowired
    CartService cartService;

    @Autowired
    BillingFeignClient billingFeignClient;

    @Override
    public CreateOrderResponse createOrder(CreateOrderRequest createOrderRequest) {

        //TODO make transactional
        CreateOrderResponse createOrderResponse = new CreateOrderResponse();

        GetAddressResponse billingAddress = null;
        if (createOrderRequest.getBillingAddressId() != null && !createOrderRequest.getBillingAddressId().isEmpty()) {
            billingAddress = billingFeignClient.getAddressById(createOrderRequest.getBillingAddressId());
            createOrderResponse.setBillingAddress(billingAddress);
        }

        GetAddressResponse shippingAddress = null;
        if (createOrderRequest.getShippingAddressId() != null && !createOrderRequest.getShippingAddressId().isEmpty()) {
            shippingAddress = billingFeignClient.getAddressById(createOrderRequest.getShippingAddressId());
            billingAddress = shippingAddress;
            if (createOrderRequest.getBillingAddressId() == null) {
                createOrderResponse.setBillingAddress(shippingAddress);
            }
            createOrderResponse.setShippingAddress(shippingAddress);
        }

        Cart cart = cartService.getCart();

        if(cart.getCartItems().size()==0){
            throw new RuntimeException("Cart is Empty");
        }

        Order order = new Order();
        order.setUserName(cart.getUserName());

        cart.getCartItems()
                .forEach(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setOrderItemPrice(cartItem.getItemPrice());
                    orderItem.setOrderExtendedPrice(cartItem.getExtendedPrice());
                    orderItem.setProductId(cartItem.getProductId());
                    orderItem.setOrderItemPrice(cartItem.getItemPrice());
                    orderItem.setQuantity(cartItem.getQuantity());
                    order.getOrderItems().add(orderItem);
                    createOrderResponse.getOrderItems().add(orderItem);
                });

        //HarCode to 10%
        double itemsPrice = createOrderResponse.getOrderItems().stream().mapToDouble(OrderItem::getOrderExtendedPrice).sum();
        createOrderResponse.setItemsTotalPrice(itemsPrice);
        order.setTotalItemsPrice(itemsPrice);

        Double taxPrice = (itemsPrice * 10) / 100;
        createOrderResponse.setTaxPrice(taxPrice);
        order.setTaxPrice(taxPrice);

        //Hardcode to 10
        Double shippingPrice = 10D;
        createOrderResponse.setShippingPrice(shippingPrice);
        order.setShippingPrice(shippingPrice);

        double totalPrice = itemsPrice + taxPrice + shippingPrice;
        createOrderResponse.setTotalPrice(totalPrice);
        order.setTotalOrderPrice(totalPrice);
        
        Order save = orderRepository.save(order);

        if (billingAddress != null) {
            OrderBillingAddress orderBillingAddress = OrderBillingAddress.builder()
                    .addressLine1(billingAddress.getAddressLine1())
                    .addressLine2(billingAddress.getAddressLine2())
                    .orderId(save.getOrderId())
                    .city(billingAddress.getCity())
                    .country(billingAddress.getCountry())
                    .phone(billingAddress.getPhone())
                    .postalCode(billingAddress.getPostalCode())
                    .state(billingAddress.getState())
                    .build();
            orderBillingAddressRepository.save(orderBillingAddress);
        }

        if (shippingAddress != null) {
            OrderShippingAddress orderShippingAddress = OrderShippingAddress.builder()
                    .addressLine1(shippingAddress.getAddressLine1())
                    .addressLine2(shippingAddress.getAddressLine2())
                    .orderId(save.getOrderId())
                    .city(shippingAddress.getCity())
                    .country(shippingAddress.getCountry())
                    .phone(shippingAddress.getPhone())
                    .postalCode(shippingAddress.getPostalCode())
                    .state(shippingAddress.getState())
                    .build();
            orderShippingAddressRepository.save(orderShippingAddress);
        }

        createOrderResponse.setOrderId(save.getOrderId());

        return createOrderResponse;
    }

    @Override
    public PreviewOrderResponse previewOrder(PreviewOrderRequest previewOrderRequest) {

        PreviewOrderResponse previewOrderResponse = new PreviewOrderResponse();

        if(previewOrderRequest.getBillingAddressId() != null && !previewOrderRequest.getBillingAddressId().isEmpty()){
            GetAddressResponse billingAddress = billingFeignClient.getAddressById(previewOrderRequest.getBillingAddressId());
            previewOrderResponse.setBillingAddress(billingAddress);
        }

        if(previewOrderRequest.getShippingAddressId() != null && !previewOrderRequest.getShippingAddressId().isEmpty()){
            GetAddressResponse shippingAddress = billingFeignClient.getAddressById(previewOrderRequest.getShippingAddressId());
            if (previewOrderRequest.getBillingAddressId() == null) {
                previewOrderResponse.setBillingAddress(shippingAddress);
            }
            previewOrderResponse.setShippingAddress(shippingAddress);
        }

        Cart cart = cartService.getCart();

        cart.getCartItems()
                .forEach(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrderItemPrice(cartItem.getItemPrice());
                    orderItem.setOrderExtendedPrice(cartItem.getExtendedPrice());
                    orderItem.setProductId(cartItem.getProductId());
                    orderItem.setOrderItemPrice(cartItem.getItemPrice());
                    orderItem.setQuantity(cartItem.getQuantity());
                    previewOrderResponse.getOrderItems().add(orderItem);
                });

        //HarCode to 10%
        double itemsPrice = previewOrderResponse.getOrderItems().stream().mapToDouble(OrderItem::getOrderExtendedPrice).sum();
        previewOrderResponse.setItemsTotalPrice(itemsPrice);

        Double taxPrice = (itemsPrice * 10 ) / 100;
        previewOrderResponse.setTaxPrice(taxPrice);

        //Hardcode to 10
        Double shippingPrice = 10D;
        previewOrderResponse.setShippingPrice(shippingPrice);

        previewOrderResponse.setTotalPrice(itemsPrice + taxPrice + shippingPrice);

        return previewOrderResponse;
    }
}
