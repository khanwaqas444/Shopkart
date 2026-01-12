package com.springbootcrud.seller;

import com.springbootcrud.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    // 🧑 USER → Become SELLER
    @PostMapping("/user/{userId}")
    public ApiResponse<Seller> createSeller(
            @PathVariable Long userId,
            @RequestBody Seller seller
    ) {
        return ApiResponse.success(
                "Seller created successfully",
                sellerService.createSeller(userId, seller)
        );
    }

    // 🧑‍💼 SELLER Dashboard (by user)
    @GetMapping("/user/{userId}")
    public ApiResponse<Seller> getSellerByUser(
            @PathVariable Long userId
    ) {
        return ApiResponse.success(
                "Seller fetched",
                sellerService.getSellerByUserId(userId)
        );
    }

    // 🔍 Admin / internal
    @GetMapping("/{id}")
    public ApiResponse<Seller> getSellerById(@PathVariable Long id) {
        return ApiResponse.success(
                "Seller fetched",
                sellerService.getSellerById(id)
        );
    }
}
