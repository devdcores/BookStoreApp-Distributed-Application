package com.devd.spring.bookstoreapigatewayservice.config;

import brave.Span;
import brave.Tracer;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.cloud.sleuth.instrument.web.TraceWebServletAutoConfiguration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

/**
 * @author: Devaraj Reddy, Date : 2019-10-05
 */
@Component
@Order(TraceWebServletAutoConfiguration.TRACING_FILTER_ORDER + 1)
public class AddTraceIdToHttpResponseConfig extends GenericFilterBean {

  private final Tracer tracer;

  AddTraceIdToHttpResponseConfig(Tracer tracer) {
    this.tracer = tracer;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response,
      FilterChain chain) throws IOException, ServletException {
    Span currentSpan = this.tracer.currentSpan();
    if (currentSpan == null) {
      chain.doFilter(request, response);
      return;
    }
    // for readability we're returning trace id in a hex form
    ((HttpServletResponse) response).addHeader("ZIPKIN-TRACE-ID",
        currentSpan.context().traceIdString());
    // we can also add some custom tags
    currentSpan.tag("custom", "tag");
    chain.doFilter(request, response);
  }
}
