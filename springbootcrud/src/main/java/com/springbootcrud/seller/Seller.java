package com.springbootcrud.seller;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sellers")
@Data
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 User who owns this seller account
    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private String shopName;

    private String description;

    private String address;

    @Column(nullable = false)
    private Boolean active = true;
}
