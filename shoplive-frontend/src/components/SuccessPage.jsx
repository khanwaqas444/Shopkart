"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Check, Copy, MapPin, Truck, ShoppingBag, ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';

const API_BASE_URL = "http://localhost:8000";

export default function SuccessPage({ orderId, onContinueShopping }) {
  const containerRef = useRef(null);
  const checkRef = useRef(null);
  
  // State for fetched order data
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH ORDER DETAILS ---
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      // Strip "OD-" prefix if your DB ID doesn't have it, or handle accordingly
      // Assuming your DB ID is just the UUID part, e.g., "12345"
      // If you passed "OD-12345", clean it:
      const cleanId = orderId.startsWith("OD-") ? orderId.replace("OD-", "") : orderId;

      try {
        const res = await fetch(`${API_BASE_URL}/orders/${cleanId}`);
        
        // Handling json-server specific behavior where ID lookup might fail or return array
        if (res.ok) {
            const data = await res.json();
            setOrder(data);
        } else {
            // Fallback: If direct ID fetch fails, fetch all and find (not recommended for production)
            const allRes = await fetch(`${API_BASE_URL}/orders`);
            const allData = await allRes.json();
            const found = allData.find(o => o.id === cleanId || o._id === cleanId);
            setOrder(found);
        }
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // --- 2. ANIMATIONS ---
  useEffect(() => {
    if (!loading && containerRef.current) {
        const ctx = gsap.context(() => {
            gsap.fromTo(".success-icon", 
                { scale: 0, rotation: -45 },
                { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
            );
            gsap.fromTo(".animate-up",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(".right-panel",
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }
  }, [loading]);

  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderId);
    const btn = document.getElementById('copyBtn');
    if(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-green-600 font-bold">✓</span>`;
        setTimeout(() => btn.innerHTML = originalText, 2000);
    }
  };

  // Date Logic
  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );
  }

  // --- FALLBACK IF ORDER NOT FOUND ---
  // (We show the UI anyway with the ID passed from props, but data fields might be empty)
  const customer = order?.customer || {};
  const productInfo = {
      name: order?.productName || "Product Name Unavailable", // ⚠️ NEEDS UPDATE IN ORDER API
      image: order?.productImage || "https://placehold.co/100", // ⚠️ NEEDS UPDATE IN ORDER API
      price: order?.amount || 0
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans text-[#171717] flex flex-col lg:flex-row overflow-hidden">
      
      {/* --- LEFT SIDE: Celebration --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-20 relative order-1">
        <div className="left-content w-full max-w-md text-center">
            
            <div className="success-icon w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200">
                <Check className="w-10 h-10 text-white" strokeWidth={4} />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900 animate-up">Order Confirmed!</h1>
            <p className="text-gray-500 text-lg mb-10 animate-up">Thank you, {customer.fullName?.split(' ')[0] || 'Guest'}. We've received your order.</p>

            {/* Ticket */}
            <div 
                onClick={copyOrderRef}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-10 cursor-pointer hover:bg-gray-100 transition-all group flex items-center justify-between animate-up"
            >
                <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Order ID</p>
                    <p className="text-lg font-mono font-bold text-gray-800 tracking-wide">{orderId}</p>
                </div>
                <div id="copyBtn" className="bg-white border border-gray-200 p-2 rounded-lg text-gray-500 group-hover:text-black">
                    <Copy size={18} />
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 animate-up">
                <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-95 shadow-xl flex items-center justify-center gap-2">
                    <MapPin size={20} /> Track My Order
                </button>
                <button 
                    onClick={onContinueShopping}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl border-2 border-gray-100 hover:border-black transition-colors flex items-center justify-center gap-2"
                >
                    Continue Shopping <ArrowRight size={20} />
                </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-green-600 font-medium bg-green-50 py-2 px-4 rounded-full inline-block animate-up">
                <MessageCircle size={16} /> Updates sent to {customer.phone || 'your phone'}
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Receipt --- */}
      <div className="right-panel w-full lg:w-1/2 bg-gray-50 border-l border-gray-100 p-8 lg:p-20 flex flex-col justify-center order-2">
        <div className="w-full max-w-md mx-auto">
            
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ShoppingBag className="text-gray-400" /> Receipt
            </h2>

            {/* Product Item */}
            <div className="flex gap-5 mb-8">
                <div className="w-24 h-24 bg-white rounded-2xl border border-gray-200 p-1 shadow-sm flex-shrink-0">
                    <img 
                        src={productInfo.image} 
                        alt="Product" 
                        className="w-full h-full object-cover rounded-xl" 
                    />
                </div>
                <div className="flex-1 py-1">
                    <h3 className="font-bold text-gray-900 leading-snug line-clamp-2">{productInfo.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Qty: 1</p>
                    <p className="font-bold text-lg mt-2">₹{productInfo.price.toLocaleString()}</p>
                </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Details Grid */}
            <div className="space-y-6">
                
                {/* Delivery */}
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full border border-gray-200">
                        <Truck size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Estimated Delivery</p>
                        <p className="font-bold text-gray-900 text-lg">{getDeliveryDate()}</p>
                        <p className="text-sm text-green-600">Standard Shipping (Free)</p>
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full border border-gray-200">
                        <MapPin size={20} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Shipping To</p>
                        <p className="font-bold text-gray-900">{customer.fullName || 'Customer'}</p>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                            {customer.address ? `${customer.address}, ${customer.city} - ${customer.pincode}` : 'Address not provided'}
                        </p>
                    </div>
                </div>

                {/* Total */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-4">
                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                        <span>Subtotal</span>
                        <span>₹{productInfo.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4 text-gray-500">
                        <span>Tax</span>
                        <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t border-gray-100 pt-4">
                        <span>Total Paid</span>
                        <span>₹{productInfo.price.toLocaleString()}</span>
                    </div>
                </div>

            </div>
        </div>
      </div>

    </div>
  );
}