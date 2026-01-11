"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function CartSummary({ subtotal, totalItems }) {
  const router = useRouter(); // 2. Initialize router
  
  const shipping = 0; // Free shipping logic
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg lg:sticky lg:top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-[#007AFF]">₹{total.toLocaleString()}</span>
        </div>
      </div>

      {/* 3. Checkout Button with Redirect */}
      <button 
        onClick={() => router.push('/user/checkout')}
        className="w-full py-4 bg-[#111827] text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mb-4"
      >
        Proceed to Checkout
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Trust Icons */}
      <div className="flex justify-center gap-4 text-xs text-gray-400 font-medium">
        <span className="flex items-center gap-1"><Lock size={12} /> Secure Payment</span>
        <span className="flex items-center gap-1"><ShieldCheck size={12} /> Buyer Protection</span>
      </div>
    </div>
  );
}