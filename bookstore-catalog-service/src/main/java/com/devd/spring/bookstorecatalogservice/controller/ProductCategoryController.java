package com.devd.spring.bookstorecatalogservice.controller;

import com.devd.spring.bookstorecatalogservice.model.ProductCategoriesPagedResponse;
import com.devd.spring.bookstorecatalogservice.model.ProductCategory;
import com.devd.spring.bookstorecatalogservice.service.ProductCategoryService;
import com.devd.spring.bookstorecatalogservice.web.CreateProductCategoryRequest;
import com.devd.spring.bookstorecatalogservice.web.UpdateProductCategoryRequest;
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
public class ProductCategoryController {

    @Autowired
    ProductCategoryService productCategoryService;

    @PostMapping("/productCategory")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> createProductCategory(@RequestBody @Valid CreateProductCategoryRequest createProductCategoryRequest) {

        String productCategory = productCategoryService.createProductCategory(createProductCategoryRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{productCategoryId}")
                .buildAndExpand(productCategory).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/productCategory/{productCategoryId}")
    public ResponseEntity<ProductCategory> getProductCategory(@PathVariable("productCategoryId") String productCategoryId) {

        ProductCategory productCategory = productCategoryService.getProductCategory(productCategoryId);

        return ResponseEntity.ok(productCategory);
    }

    @DeleteMapping("/productCategory/{productCategoryId}")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> deleteProductCategory(@PathVariable("productCategoryId") String productCategoryId) {

        productCategoryService.deleteProductCategory(productCategoryId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/productCategory")
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public ResponseEntity<?> updateProductCategory(@RequestBody @Valid UpdateProductCategoryRequest updateProductCategoryRequest) {

        productCategoryService.updateProductCategory(updateProductCategoryRequest);

        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/productCategories", produces = "application/json")
    public ResponseEntity<?> getAllProductCategories(@RequestParam(value = "sort", required = false) String sort,
                                                     @RequestParam(value = "page", required = false) Integer page,
                                                     @RequestParam(value = "size", required = false) Integer size,
                                                     PagedResourcesAssembler<ProductCategory> assembler) {
    
        Page<ProductCategory> list = productCategoryService.getAllProductCategories(sort, page, size);
    
        Link link = new Link(ServletUriComponentsBuilder.fromCurrentRequest()
                                                        .build()
                                                        .toUriString());
    
        PagedResources<Resource<ProductCategory>> resource = assembler.toResource(list, link);
    
        ProductCategoriesPagedResponse productCategoriesPagedResponse = new ProductCategoriesPagedResponse();
        productCategoriesPagedResponse.setPage(list);
    
        if (resource.hasLink("first")) {
            productCategoriesPagedResponse.get_links().put("first", resource.getLink("first").getHref());
        }
    
        if (resource.hasLink("prev")) {
            productCategoriesPagedResponse.get_links().put("prev", resource.getLink("prev").getHref());
        }
    
        if (resource.hasLink("self")) {
            productCategoriesPagedResponse.get_links().put("self", resource.getLink("self").getHref());
        }
    
        if (resource.hasLink("next")) {
            productCategoriesPagedResponse.get_links().put("next", resource.getLink("next").getHref());
        }
    
        if (resource.hasLink("last")) {
            productCategoriesPagedResponse.get_links().put("last", resource.getLink("last").getHref());
        }
    
        return ResponseEntity.ok(productCategoriesPagedResponse);

    }
}
