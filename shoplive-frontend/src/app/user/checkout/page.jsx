"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// import CheckoutForm from '/CheckoutForm';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

// Reuse your useCrud or create logic here if needed
// For now, we will simulate a success redirect

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load Cart
  useEffect(() => {
    setMounted(true);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    const total = storedCart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setSubtotal(total);

    // If empty, redirect back to cart
    if (storedCart.length === 0) {
       router.push('/user/cart');
    }
  }, [router]);

  // 2. Handle Order Placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
        // Clear Cart
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event("cart-updated"));
        
        // Redirect to a Generic Success Page or User Orders page
        // You can create a page at /checkout/success or just /success
        router.push('/user/success'); 
    }, 2000);
  };

  if (!mounted) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans text-[#171717]">
      
      {/* Left Column: Form (Main Content) */}
      <div className="w-full lg:w-3/5 order-2 lg:order-1">
         <CheckoutForm 
            handleSubmit={handlePlaceOrder}
            isSubmitting={isSubmitting}
         />
      </div>

      {/* Right Column: Summary (Sidebar) */}
      <div className="w-full lg:w-2/5 order-1 lg:order-2 bg-gray-50 border-b lg:border-b-0 lg:border-l border-gray-200">
         <OrderSummary 
            cartItems={cartItems}
            subtotal={subtotal}
         />
      </div>

    </div>
  );
}