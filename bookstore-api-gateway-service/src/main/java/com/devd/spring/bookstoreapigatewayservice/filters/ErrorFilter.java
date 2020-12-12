package com.devd.spring.bookstoreapigatewayservice.filters;

import com.devd.spring.bookstoreapigatewayservice.exception.RunTimeExceptionPlaceHolder;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

/**
 * @author Devaraj Reddy, Date : 09-Dec-2020
 */
@Component
public class ErrorFilter extends ZuulFilter {
    private static final Logger LOG = LoggerFactory.getLogger(ErrorFilter.class);

    private static final String THROWABLE_KEY = "throwable";

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public String filterType() {
        return FilterConstants.ERROR_TYPE;
    }

    @Override
    public int filterOrder() {
        return -1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        final RequestContext context = RequestContext.getCurrentContext();
        final Object throwable = context.get(THROWABLE_KEY);

        if (throwable instanceof ZuulException) {
            final ZuulException zuulException = (ZuulException) throwable;
            LOG.error("Zuul failure detected: " + zuulException.getMessage());
            resolver.resolveException(context.getRequest(), context.getResponse(), null, new RunTimeExceptionPlaceHolder(zuulException.getCause().getMessage(), context.getResponseStatusCode()));
        }
        return null;
    }
}
