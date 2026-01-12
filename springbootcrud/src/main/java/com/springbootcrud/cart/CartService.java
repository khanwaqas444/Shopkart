package com.springbootcrud.cart;

import com.springbootcrud.product.Product;
import com.springbootcrud.repository.CartItemRepository;
import com.springbootcrud.repository.CartRepository;
import com.springbootcrud.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    // ➕ Add to Cart
    public Cart addToCart(Long userId, Long productId, Integer quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if product already in cart
        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                return cartRepository.save(cart);
            }
        }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        cart.getItems().add(cartItem);
        return cartRepository.save(cart);
    }

    // 📦 Get Cart
    public Cart getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    // ❌ Remove item
    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }

    // 🧹 Clear cart
    public void clearCart(Long userId) {
        Cart cart = getCartByUser(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
