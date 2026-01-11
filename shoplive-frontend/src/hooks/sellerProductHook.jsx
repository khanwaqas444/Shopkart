"use client";

import { useState, useEffect } from 'react';

const API_BASE_URL = "http://localhost:8000";




export const useSellerData = (targetSellerId) => {
  // --- UI STATE ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- DATA STATE ---
  const [sellerProfile, setSellerProfile] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]); // All products for this seller
  const [displayedProducts, setDisplayedProducts] = useState([]); // Filtered products shown on screen
  const [isLoading, setIsLoading] = useState(true);

  // 1. INITIAL FETCH & SETUP
  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch in parallel
        const [productsRes, sellersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products`),
          fetch(`${API_BASE_URL}/sellerProfile`)
        ]);

        const allProductsData = await productsRes.json();
        const allSellersData = await sellersRes.json();

        // A. Filter Products for Target Seller
        const myProducts = allProductsData.filter(p => p.sellerId === targetSellerId);
        setSellerProducts(myProducts);

        // B. Find Target Seller Profile
        const myProfile = allSellersData.find(s =>
          s.id === targetSellerId ||
          s._id === targetSellerId ||
          s.sellerId === targetSellerId
        );
        setSellerProfile(myProfile);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (targetSellerId) {
      fetchData();
    }

    // Scroll Listener
    const handleScroll = () => setShowStickyHeader(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetSellerId]);

  // 2. AUTOMATIC FILTERING LOGIC
  // Whenever Search, Category, or Data changes, this updates displayedProducts automatically.
  useEffect(() => {
    let result = [...sellerProducts];

    // Category Filter
    if (activeCategory !== "All") {
      if (activeCategory === "Sale") {
        result = result.filter(p => p.sale === true);
      } else if (activeCategory === "New") {
        result = result.slice(0, 10);
      } else {
        result = result.filter(p => p.category === activeCategory);
      }
    }

    // Search Filter
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerTerm)
      );
    }

    setDisplayedProducts(result);
  }, [sellerProducts, activeCategory, searchTerm]);

  return {
    // Data
    sellerProfile,
    sellerProducts,
    displayedProducts,
    isLoading,
    mounted,

    // UI State
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    showStickyHeader
  };
};