package com.devd.spring.bookstoreapigatewayservice.filters;

import com.netflix.zuul.ZuulFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

/**
 * @author: Devaraj Reddy, Date : 2019-10-02
 */
@Slf4j
public class RouteFilter extends ZuulFilter {

  @Override
  public String filterType() {
    return FilterConstants.ROUTE_TYPE;
  }

  @Override
  public int filterOrder() {
    return 1;
  }

  @Override
  public boolean shouldFilter() {
    return true;
  }

  @Override
  public Object run() {
    System.out.println("Inside Route Filter");
    return null;
  }
}
