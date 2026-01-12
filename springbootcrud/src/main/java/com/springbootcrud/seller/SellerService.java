package com.springbootcrud.seller;

import com.springbootcrud.repository.SellerRepository;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;

    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    // ✅ Create seller (USER → SELLER onboarding)
    public Seller createSeller(Long userId, Seller seller) {

        sellerRepository.findByUserId(userId).ifPresent(s -> {
            throw new RuntimeException("Seller already exists for this user");
        });

        seller.setUserId(userId);
        return sellerRepository.save(seller);
    }

    // ✅ Get seller by user
    public Seller getSellerByUserId(Long userId) {
        return sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }

    // ✅ Get seller by ID
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }
}
