"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import gsap from 'gsap';

export default function QuickAddModal({ product, isOpen, onClose }) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false); // State for feedback animation
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setIsAdded(false);
    }
  }, [isOpen, product]);

  // Animation Logic
  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          gsap.fromTo(modalRef.current, { y: "100%" }, { y: "0%", duration: 0.4, ease: "power3.out" });
        } else {
          gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        }
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    // 1. Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // 2. Check if item exists
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].qty += qty;
    } else {
      existingCart.push({ ...product, qty });
    }

    // 3. Save back
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // 4. Trigger Navbar Update (Dispatch Event)
    window.dispatchEvent(new Event("cart-updated"));

    // 5. Show Success Feedback & Close
    setIsAdded(true);
    setTimeout(() => {
      onClose();
      setIsAdded(false);
    }, 1000);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
      
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div 
        ref={modalRef}
        className="bg-white w-full md:max-w-md md:rounded-3xl rounded-t-3xl shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Add to Cart</h3>
            <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
            {/* Product Details */}
            <div className="flex gap-5 mb-8">
                <div className="w-28 h-28 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-[#007AFF] bg-blue-50 px-2 py-1 rounded-md w-fit mb-2 uppercase tracking-wide">
                        {product.category || "Product"}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2">{product.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Quantity</label>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${qty === 1 ? 'text-gray-300 bg-transparent cursor-not-allowed' : 'bg-white shadow-sm text-black hover:scale-105'}`}
                        disabled={qty === 1}
                    >
                        <Minus size={18} />
                    </button>
                    <span className="text-xl font-bold text-gray-900 w-12 text-center">{qty}</span>
                    <button 
                        onClick={() => setQty(q => q + 1)}
                        className="w-12 h-12 rounded-xl bg-white shadow-sm text-black flex items-center justify-center hover:scale-105 transition-all"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Total Calculation */}
            <div className="mt-6 flex justify-between items-center py-4 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-[#007AFF]">₹{(product.price * qty).toLocaleString()}</span>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0">
            <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2
                ${isAdded ? 'bg-green-600 text-white' : 'bg-[#111827] text-white hover:bg-black'}`}
            >
                {isAdded ? (
                    <>
                        <Check size={20} /> Added!
                    </>
                ) : (
                    <>
                        <ShoppingBag size={20} /> Add to Cart
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}