package com.springbootcrud.product;

import com.springbootcrud.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // 🧑‍💼 SELLER → Add product
    @PostMapping("/seller/{sellerId}")
    public ApiResponse<Product> createProduct(
            @PathVariable Long sellerId,
            @RequestBody Product product
    ) {
        return ApiResponse.success(
                "Product created successfully",
                productService.createProduct(sellerId, product)
        );
    }

    // 👥 USER → View all products
    @GetMapping
    public ApiResponse<List<Product>> getAllProducts() {
        return ApiResponse.success(
                "Products fetched",
                productService.getAllProducts()
        );
    }

    // 🧑‍💼 SELLER → View own products
    @GetMapping("/seller/{sellerId}")
    public ApiResponse<List<Product>> getProductsBySeller(
            @PathVariable Long sellerId
    ) {
        return ApiResponse.success(
                "Seller products fetched",
                productService.getProductsBySeller(sellerId)
        );
    }

    // 👁 Single product
    @GetMapping("/{id}")
    public ApiResponse<Product> getProductById(@PathVariable Long id) {
        return ApiResponse.success(
                "Product fetched",
                productService.getProductById(id)
        );
    }
}
