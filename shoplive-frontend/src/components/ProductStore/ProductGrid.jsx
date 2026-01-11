"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 15;

export default function ProductGrid({ products, isLoading, sellerId }) { // Added sellerId prop
  const gridRef = useRef(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Reset pagination when list changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [products]);

  // Handle Slicing & Animation
  useEffect(() => {
    const visibleSlice = products.slice(0, visibleCount);
    setDisplayedProducts(visibleSlice);

    if (gridRef.current && visibleSlice.length > 0) {
        gsap.set(gridRef.current.children, { clearProps: "all" });
        gsap.fromTo(gridRef.current.children, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }
  }, [products, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const hasMore = visibleCount < products.length;

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {displayedProducts.length === 0 ? (
              <div className="py-32 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                  <p className="text-gray-500 mt-2">Try changing filters or search terms</p>
              </div>
          ) : (
              <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                  {displayedProducts.map((product) => (
                      <ProductCard 
                        key={product.id || product._id} 
                        product={product} 
                        sellerId={sellerId} // Pass sellerId down
                      />
                  ))}
              </div>
          )}

          {hasMore && (
              <div className="mt-16 text-center">
                  <button 
                      onClick={handleLoadMore}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:border-black hover:bg-gray-50 transition-all duration-300 min-w-[240px] shadow-sm active:scale-95"
                  >
                      Load More Products
                  </button>
              </div>
          )}
      </div>
    </main>
  );
}