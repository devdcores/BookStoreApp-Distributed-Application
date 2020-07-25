package com.devd.spring.bookstorepaymentservice.repository;

import com.devd.spring.bookstorepaymentservice.repository.dao.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Devaraj Reddy, Date : 25-Jul-2020
 */
public interface CreditCardRepository extends JpaRepository<CreditCard, String> {

}
