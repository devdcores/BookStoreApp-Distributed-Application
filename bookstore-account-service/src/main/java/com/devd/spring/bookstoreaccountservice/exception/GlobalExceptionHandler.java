package com.devd.spring.bookstoreaccountservice.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import java.net.URI;
import java.util.Collections;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * @author: Devaraj Reddy, Date : 2019-04-12 12:00
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  @ExceptionHandler(RunTimeExceptionPlaceHolder.class)
  public ResponseEntity<ErrorResponse> handleCustomException(RunTimeExceptionPlaceHolder ex) {

    ErrorResponse errorResponse = populateErrorResponse("400", ex.getMessage());
    log.error("Something went wrong, Exception : " + ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);

  }

  @ExceptionHandler(SuccessCodeWithErrorResponse.class)
  public ResponseEntity<ErrorResponse> handleCustomException(SuccessCodeWithErrorResponse ex) {
    if (ex.getId() != null) {
      URI location = ServletUriComponentsBuilder
          .fromCurrentRequest().path("/{userId}")
          .buildAndExpand(ex.getId()).toUri();

      ErrorResponse errorResponse = ex.getErrorResponse();
      return ResponseEntity.created(location).body(errorResponse);
    } else {
      ErrorResponse errorResponse = ex.getErrorResponse();
      return ResponseEntity.ok().body(errorResponse);
    }
  }

  @ExceptionHandler(InvalidFormatException.class)
  public ResponseEntity<ErrorResponse> handleCustomException(InvalidFormatException ex) {

    ErrorResponse errorResponse = populateErrorResponse("400", ex.getMessage());
    log.error("Something went wrong, Exception : " + ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);

  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleCustomException(Exception ex) {

    ErrorResponse errorResponse = populateErrorResponse("500",
        "Something went wring, Internal Server Error, " +
            "Exception : " + ex.getMessage());
    log.error("Something went wrong, Exception : " + ex.getMessage());
    ex.printStackTrace();
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

  }

  private ErrorResponse populateErrorResponse(String code, String message) {
    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setUuid(UUID.randomUUID());

    Error error = new Error();
    error.setCode(code);
    error.setMessage(message);

    errorResponse.setErrors(Collections.singletonList(error));

    return errorResponse;
  }
}
