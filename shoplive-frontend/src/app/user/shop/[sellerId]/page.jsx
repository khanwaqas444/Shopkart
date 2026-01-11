"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // 1. Import useParams

import Navbar from '@/components/ProductStore/Navbar';
import ProfileHeader from '@/components/ProductStore/ProfileHeader';
import StickyFilterBar from '@/components/ProductStore/StickyFilterBar';
import ProductGrid from '@/components/ProductStore/ProductGrid';
import Footer from '@/components/ProductStore/Footer';

// Import the custom hook
import { useSellerData } from '@/hooks/sellerProductHook';

const CATEGORIES = ["All", "New", "Sale", "Jewelry", "Fashion", "Gifts"];

export default function SellerStorePage() {
  // 2. Get the sellerId from the URL (folder name [sellerId])
  const params = useParams();
  // Ensure we have an ID before passing it (fallback to empty string to prevent errors)
  const sellerId = params?.sellerId || ""; 

  // 3. Pass the dynamic sellerId to your custom hook
  const {
    sellerProfile,
    displayedProducts,
    isLoading,
    mounted,
    showStickyHeader,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    sellerProducts 
  } = useSellerData(sellerId);

  // Prevent hydration mismatch
  if (!mounted) return <div className="bg-white min-h-screen"></div>;

  return (
    <div className="bg-white text-[#1A1A1A] font-sans antialiased min-h-screen">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar 
        showStickyHeader={showStickyHeader} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        sellerProfile={sellerProfile} 
      />

      <ProfileHeader profile={sellerProfile} />

      <StickyFilterBar 
        allProducts={sellerProducts} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        categories={CATEGORIES} 
      />

      <ProductGrid 
        products={displayedProducts} 
        isLoading={isLoading}
        sellerId={sellerId}
      />
      

      <Footer />
    </div>
  );
}