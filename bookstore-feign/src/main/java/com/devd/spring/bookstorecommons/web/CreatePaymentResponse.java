package com.devd.spring.bookstorecommons.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author Devaraj Reddy - 17-Dec-2020
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePaymentResponse {
    private String paymentId;
    private LocalDateTime paymentDate;
    private boolean captured;
    private String receipt_url;
}
