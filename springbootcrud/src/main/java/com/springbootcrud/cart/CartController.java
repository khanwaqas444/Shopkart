package com.springbootcrud.cart;

import com.springbootcrud.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ➕ Add to Cart
    @PostMapping("/add")
    public ApiResponse<Cart> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity
    ) {
        return ApiResponse.success(
                "Item added to cart",
                cartService.addToCart(userId, productId, quantity)
        );
    }

    // 📦 View Cart
    @GetMapping("/{userId}")
    public ApiResponse<Cart> getCart(@PathVariable Long userId) {
        return ApiResponse.success(
                "Cart fetched",
                cartService.getCartByUser(userId)
        );
    }

    // ❌ Remove Item
    @DeleteMapping("/item/{itemId}")
    public ApiResponse<?> removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
        return ApiResponse.success("Item removed", null);
    }

    // 🧹 Clear Cart
    @DeleteMapping("/clear/{userId}")
    public ApiResponse<?> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ApiResponse.success("Cart cleared", null);
    }
}
