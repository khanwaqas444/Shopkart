"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar({ showStickyHeader, searchTerm, setSearchTerm, sellerProfile }) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return ""; 
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const displayName = sellerProfile?.name || "Loading...";
  const displayInitials = getInitials(sellerProfile?.name);

  // --- Logic to update Cart Count ---
  useEffect(() => {
    const updateCount = () => {
      // 1. Get cart from local storage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // 2. Sum up quantities
      const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(totalQty);
    };

    // Initial check
    updateCount();

    // Listen for custom event from QuickAddModal
    window.addEventListener("cart-updated", updateCount);
    
    // Also listen for storage event (if tab changes)
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b border-gray-100 ${
        showStickyHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                    {sellerProfile ? displayInitials : "..."}
                  </div>
                  
                  <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight text-gray-900">
                        {displayName}
                      </span>
                      {sellerProfile && (
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-wide flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                        </span>
                      )}
                  </div>
              </div>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-sm mx-8">
              <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] outline-none transition-all group-hover:bg-gray-100 focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
          </div>

          <div className="flex items-center gap-2">
              {/* Only Cart Button Remains */}
              <button 
                onClick={() => router.push('/user/cart')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 relative group"
              >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  {/* Dynamic Badge */}
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#E31837] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white transform transition-transform group-hover:scale-110">
                        {cartCount}
                    </span>
                  )}
              </button>
          </div>
      </div>
    </nav>
  );
}