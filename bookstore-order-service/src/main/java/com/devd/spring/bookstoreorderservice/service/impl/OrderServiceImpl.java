package com.devd.spring.bookstoreorderservice.service.impl;

import com.devd.spring.bookstorecommons.exception.RunTimeExceptionPlaceHolder;
import com.devd.spring.bookstorecommons.feign.BillingFeignClient;
import com.devd.spring.bookstorecommons.feign.PaymentFeignClient;
import com.devd.spring.bookstorecommons.util.CommonUtilityMethods;
import com.devd.spring.bookstorecommons.web.CreatePaymentRequest;
import com.devd.spring.bookstorecommons.web.CreatePaymentResponse;
import com.devd.spring.bookstorecommons.web.GetAddressResponse;
import com.devd.spring.bookstorecommons.web.GetPaymentMethodResponse;
import com.devd.spring.bookstoreorderservice.repository.OrderBillingAddressRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderItemRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderRepository;
import com.devd.spring.bookstoreorderservice.repository.OrderShippingAddressRepository;
import com.devd.spring.bookstoreorderservice.repository.dao.Cart;
import com.devd.spring.bookstoreorderservice.repository.dao.Order;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderBillingAddress;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderItem;
import com.devd.spring.bookstoreorderservice.repository.dao.OrderShippingAddress;
import com.devd.spring.bookstoreorderservice.service.CartItemService;
import com.devd.spring.bookstoreorderservice.service.CartService;
import com.devd.spring.bookstoreorderservice.service.OrderService;
import com.devd.spring.bookstoreorderservice.web.Card;
import com.devd.spring.bookstoreorderservice.web.CreateOrderRequest;
import com.devd.spring.bookstoreorderservice.web.CreateOrderResponse;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderRequest;
import com.devd.spring.bookstoreorderservice.web.PreviewOrderResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    CartItemService cartItemService;

    @Autowired
    BillingFeignClient billingFeignClient;

    @Autowired
    PaymentFeignClient paymentFeignClient;

    @Override
    public CreateOrderResponse createOrder(CreateOrderRequest createOrderRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = CommonUtilityMethods.getUserIdFromToken(authentication);

        //TODO make transactional
        CreateOrderResponse createOrderResponse = new CreateOrderResponse();

        //Get Billing Address
        GetAddressResponse billingAddress = null;
        if (createOrderRequest.getBillingAddressId() != null && !createOrderRequest.getBillingAddressId().isEmpty()) {
            billingAddress = billingFeignClient.getAddressById(createOrderRequest.getBillingAddressId());
            OrderBillingAddress orderBillingAddress = new OrderBillingAddress();
            BeanUtils.copyProperties(billingAddress, orderBillingAddress);
            createOrderResponse.setBillingAddress(orderBillingAddress);
        }

        //Get Shipping Address
        GetAddressResponse shippingAddress = null;
        if (createOrderRequest.getShippingAddressId() != null && !createOrderRequest.getShippingAddressId().isEmpty()) {
            shippingAddress = billingFeignClient.getAddressById(createOrderRequest.getShippingAddressId());
            billingAddress = shippingAddress;

            if (createOrderRequest.getBillingAddressId() == null) {
                OrderBillingAddress orderBillingAddress = new OrderBillingAddress();
                BeanUtils.copyProperties(billingAddress, orderBillingAddress);
                createOrderResponse.setBillingAddress(orderBillingAddress);
            }
            OrderShippingAddress orderShippingAddress = new OrderShippingAddress();
            BeanUtils.copyProperties(shippingAddress, orderShippingAddress);
            createOrderResponse.setShippingAddress(orderShippingAddress);
        }

        //Get Cart
        Cart cart = cartService.getCart();

        if(cart.getCartItems().size()==0){
            throw new RuntimeException("Cart is Empty");
        }

        Order order = new Order();
        order.setUserName(cart.getUserName());
        order.setUserId(userIdFromToken);

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

        //Do Payment
        CreatePaymentRequest createPaymentRequest = new CreatePaymentRequest();
        createPaymentRequest.setAmount((int)totalPrice*100);
        createPaymentRequest.setCurrency("USD");
        createPaymentRequest.setPaymentMethodId(createOrderRequest.getPaymentMethodId());

        CreatePaymentResponse createPaymentResponse = paymentFeignClient.doPayment(createPaymentRequest);

        order.setPaid(createPaymentResponse.isCaptured());
        order.setPaymentDate(createPaymentResponse.getPaymentDate());
        order.setPaymentId(createPaymentResponse.getPaymentId());
        order.setPaymentReceiptUrl(createPaymentResponse.getReceipt_url());
        order.setPaymentMethodId(createOrderRequest.getPaymentMethodId());
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
        createOrderResponse.setCreated_at(save.getCreatedAt());

        //set Payment info
        createOrderResponse.setPaid(createPaymentResponse.isCaptured());
        createOrderResponse.setPaymentDate(createPaymentResponse.getPaymentDate());
        createOrderResponse.setPaymentReceiptUrl(createPaymentResponse.getReceipt_url());

        //Clear cart
        cartItemService.removeAllCartItems(cart.getCartId());
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

        try{
            GetPaymentMethodResponse myPaymentMethodById = paymentFeignClient.getMyPaymentMethodById(previewOrderRequest.getPaymentMethodId());
            Card card = new Card();
            card.setLast4Digits(myPaymentMethodById.getCardLast4Digits());
            card.setCardBrand(myPaymentMethodById.getCardType());
            card.setPaymentMethodId(myPaymentMethodById.getPaymentMethodId());
            previewOrderResponse.setCard(card);
        }catch (Exception e){
            e.printStackTrace();
            throw new RunTimeExceptionPlaceHolder("Not a valid Payment Method");
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

        //HardCode to 10%
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

    @Override
    public CreateOrderResponse getOrderById(String orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = CommonUtilityMethods.getUserIdFromToken(authentication);

        Order order = orderRepository.findByOrderId(orderId);
        if (order == null) {
            throw new RuntimeException("Order No Found");
        }

        if(!userIdFromToken.equals(order.getUserId())){
            throw new RuntimeException("Order doesn't belong to this User! UnAuthorized!");
        }
        Card card = new Card();
        try{
            GetPaymentMethodResponse myPaymentMethodById = paymentFeignClient.getMyPaymentMethodById(order.getPaymentMethodId());
            card.setLast4Digits(myPaymentMethodById.getCardLast4Digits());
            card.setCardBrand(myPaymentMethodById.getCardType());
            card.setPaymentMethodId(myPaymentMethodById.getPaymentMethodId());
        }catch (Exception e){
            e.printStackTrace();
            throw new RunTimeExceptionPlaceHolder("Not a valid Payment Method");
        }


        OrderBillingAddress billingAddress = orderBillingAddressRepository.findByOrderId(orderId);
        OrderShippingAddress shippingAddress = orderShippingAddressRepository.findByOrderId(orderId);

        CreateOrderResponse createOrderResponse = CreateOrderResponse.builder()
                .orderId(orderId)
                .orderItems(order.getOrderItems())
                .billingAddress(billingAddress)
                .shippingAddress(shippingAddress)
                .shippingPrice(order.getShippingPrice())
                .card(card)
                .isDelivered(order.isDelivered())
                .isPaid(order.isPaid())
                .itemsTotalPrice(order.getTotalItemsPrice())
                .paymentDate(order.getPaymentDate())
                .paymentReceiptUrl(order.getPaymentReceiptUrl())
                .taxPrice(order.getTaxPrice())
                .totalPrice(order.getTotalOrderPrice())
                .build();

        return createOrderResponse;
    }

    @Override
    public List<CreateOrderResponse> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdFromToken = CommonUtilityMethods.getUserIdFromToken(authentication);
        List<Order> order = orderRepository.findByUserId(userIdFromToken);

        return getCreateOrderResponses(order);
    }

    @Override
    public List<CreateOrderResponse> getAllOrders() {
        Iterable<Order> order = orderRepository.findAll();

        return getCreateOrderResponses(order);
    }

    private List<CreateOrderResponse> getCreateOrderResponses(Iterable<Order> order) {
        List<CreateOrderResponse> createOrderResponseList = new ArrayList<>();
        order.forEach(o->{
            String orderId = o.getOrderId();
            OrderBillingAddress billingAddress = orderBillingAddressRepository.findByOrderId(orderId);
            OrderShippingAddress shippingAddress = orderShippingAddressRepository.findByOrderId(orderId);

            Card card = new Card();
            try{
                GetPaymentMethodResponse myPaymentMethodById = paymentFeignClient.getMyPaymentMethodById(o.getPaymentMethodId());
                card.setLast4Digits(myPaymentMethodById.getCardLast4Digits());
                card.setCardBrand(myPaymentMethodById.getCardType());
                card.setPaymentMethodId(myPaymentMethodById.getPaymentMethodId());
            }catch (Exception e){
                e.printStackTrace();
                throw new RunTimeExceptionPlaceHolder("Not a valid Payment Method");
            }

            CreateOrderResponse createOrderResponse = CreateOrderResponse.builder()
                    .orderId(orderId)
                    .orderItems(o.getOrderItems())
                    .billingAddress(billingAddress)
                    .shippingAddress(shippingAddress)
                    .shippingPrice(o.getShippingPrice())
                    .card(card)
                    .isDelivered(o.isDelivered())
                    .isPaid(o.isPaid())
                    .itemsTotalPrice(o.getTotalItemsPrice())
                    .paymentDate(o.getPaymentDate())
                    .paymentReceiptUrl(o.getPaymentReceiptUrl())
                    .taxPrice(o.getTaxPrice())
                    .totalPrice(o.getTotalOrderPrice())
                    .created_at(o.getCreatedAt())
                    .build();
            createOrderResponseList.add(createOrderResponse);
        });

        return createOrderResponseList;
    }
}
