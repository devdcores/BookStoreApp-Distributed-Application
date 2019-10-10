//package com.devd.spring.bookstorebillingservice.config;
//
//import org.springframework.cloud.bus.event.RemoteApplicationEvent;
//
///**
// * @author: Devaraj Reddy, Date : 2019-10-10
// */
//public class MyCustomRemoteEvent extends RemoteApplicationEvent {
//  private String message;
//
//  // Must supply a default constructor and getters/setters for deserialization
//
//  public MyCustomRemoteEvent() {
//  }
//
//  public MyCustomRemoteEvent(Object source, String originService, String message) {
//    // source is the object that is publishing the event
//
//    // originService is the unique context ID of the publisher
//
//    super(source, originService);
//    this.message = message;
//  }
//
//  public String getMessage() {
//    return message;
//  }
//
//  public MyCustomRemoteEvent setMessage(String message) {
//    this.message = message;
//    return this;
//  }
//
//
//}
