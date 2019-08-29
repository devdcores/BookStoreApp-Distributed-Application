package com.devd.spring.bookstorecatalogservice.controller;

import com.devd.spring.bookstorecatalogservice.model.Product;
import com.devd.spring.bookstorecatalogservice.model.ProductsPagedResponse;
import com.devd.spring.bookstorecatalogservice.service.ProductService;
import com.devd.spring.bookstorecatalogservice.web.CreateProductRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

/**
 * @author: Devaraj Reddy,
 * Date : 2019-06-06
 */
@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/product")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> createProduct(@RequestBody @Valid CreateProductRequest createProductRequest){

        String product = productService.createProduct(createProductRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{productId}")
                .buildAndExpand(product).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable("productId") String productId) {

        Product product = productService.getProduct(productId);

        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/product/{productId}")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> deleteProductCategory(@PathVariable("productId") String productId) {

        productService.deleteProduct(productId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/product")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> updateProductCategory(@RequestBody @Valid UpdateProductRequest updateProductRequest) {

        productService.updateProduct(updateProductRequest);

        return ResponseEntity.noContent().build();
    }


    @GetMapping(value = "/products", produces = "application/json")
    public ResponseEntity<?> getAllProducts(@RequestParam(value = "sort", required = false) String sort,
                                            @RequestParam(value = "page", required = false) Integer page,
                                            @RequestParam(value = "size", required = false) Integer size,
                                            PagedResourcesAssembler<Product> assembler) {
    
        Page<Product> list = productService.getAllProducts(sort, page, size);
    
        Link link = new Link(ServletUriComponentsBuilder.fromCurrentRequest().build()
                                                        .toUriString());
    
        PagedResources<Resource<Product>> resource = assembler.toResource(list, link);
    
        ProductsPagedResponse productsPagedResponse = new ProductsPagedResponse();
        productsPagedResponse.setPage(list);
    
        if (resource.hasLink("first")) {
            productsPagedResponse.get_links().put("first", resource.getLink("first").getHref());
        }
    
        if (resource.hasLink("prev")) {
            productsPagedResponse.get_links().put("prev", resource.getLink("prev").getHref());
        }
    
        if (resource.hasLink("self")) {
            productsPagedResponse.get_links().put("self", resource.getLink("self").getHref());
        }
    
        if (resource.hasLink("next")) {
            productsPagedResponse.get_links().put("next", resource.getLink("next").getHref());
        }
    
        if (resource.hasLink("last")) {
            productsPagedResponse.get_links().put("last", resource.getLink("last").getHref());
        }
    
        return ResponseEntity.ok(productsPagedResponse);

    }
}
