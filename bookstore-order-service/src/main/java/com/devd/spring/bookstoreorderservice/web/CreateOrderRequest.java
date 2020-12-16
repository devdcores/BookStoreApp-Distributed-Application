package com.devd.spring.bookstoreorderservice.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author Devaraj Reddy, Date : 06-Dec-2020
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {
    private String billingAddressId;
    @NotBlank
    private String shippingAddressId;
    @NotBlank
    private String paymentMethodId;
}
