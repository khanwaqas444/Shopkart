"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ChevronLeft, ShoppingBag } from 'lucide-react';

// COMPONENTS
import CartItem from '@/components/Cart/CartItem';
import CartSummary from '@/components/Cart/CartSummary';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // --- 1. LOAD CART ---
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  // --- 2. UPDATE CART ---
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated")); // Update Navbar badge
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // --- 3. ANIMATION ---
  useEffect(() => {
    if (!loading && cartItems.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".cart-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(".cart-summary",
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }


  // // Prevent hydration mismatch
  // if (!mounted) return <div className="bg-white min-h-screen"></div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] font-sans text-[#171717]">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-bold text-lg">Your Cart ({totalItems})</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {cartItems.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() =>
                // router.push(`/shop/${sellerId}`)
                router.back()
              }
              className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          // --- CART CONTENT ---
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Items List */}
            <div className="w-full lg:w-2/3">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <CartItem
                      item={item}
                      updateQty={updateQty}
                      removeItem={removeItem}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-full lg:w-1/3 cart-summary">
              <CartSummary subtotal={subtotal} totalItems={totalItems} />
            </div>

          </div>
        )}
      </main>

    </div>
  );
}