package com.devd.spring.bookstorecatalogservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * @author: Daniel Chungara,
 * Date : 2021-09-16
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFiltersRequest {

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private BigDecimal minRating;

    private BigDecimal maxRating;

    private Boolean availability;

}
