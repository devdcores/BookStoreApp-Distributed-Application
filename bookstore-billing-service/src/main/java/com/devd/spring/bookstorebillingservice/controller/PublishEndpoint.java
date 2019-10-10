//package com.devd.spring.bookstorebillingservice.controller;
//
//import com.devd.spring.bookstorebillingservice.config.MyCustomRemoteEvent;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
///**
// * @author: Devaraj Reddy, Date : 2019-10-10
// */
//@RestController
//public class PublishEndpoint {
//
//  private ApplicationContext context;
//
//  @Autowired
//  public PublishEndpoint(ApplicationContext context) {
//    this.context = context;
//  }
//
//  @RequestMapping(value="/publish",method= RequestMethod.POST)
//  public String publish() {
//    // each service instance must have a unique context ID
//
//    final String myUniqueId = context.getId();
//
//    final MyCustomRemoteEvent event =
//        new MyCustomRemoteEvent(this, myUniqueId, "hello world");
//
//    context.publishEvent(event);
//
//    return "event published";
//  }
//}
