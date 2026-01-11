"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, Tag } from 'lucide-react';

export default function OrderSummary({ cartItems, subtotal }) {
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle
  const shipping = 0; // Free shipping logic
  const total = subtotal + shipping;

  if (cartItems.length === 0) return null;

  return (
    <div className="w-full h-full bg-gray-50 border-l border-gray-200 lg:min-h-screen">
      
      {/* --- Mobile Toggle (Visible only on small screens) --- */}
      <div 
        className="lg:hidden flex items-center justify-between p-4 bg-gray-50 border-y border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-[#007AFF] font-medium">
          <ShoppingBag size={18} />
          <span>{isOpen ? 'Hide' : 'Show'} order summary</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
      </div>

      {/* --- Content (Always visible on Desktop, Toggled on Mobile) --- */}
      <div className={`px-6 py-8 lg:block ${isOpen ? 'block' : 'hidden'}`}>
        
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-lg border border-gray-200 bg-white p-1">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                 <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {item.qty}
                 </span>
              </div>
              <div className="flex-1">
                 <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.name}</h4>
                 <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <p className="text-sm font-bold text-gray-900">₹{(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Discount Code */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
             <input 
               type="text" 
               placeholder="Discount code" 
               className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none text-sm transition-shadow"
             />
          </div>
          <button className="bg-gray-200 text-gray-500 font-bold px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors disabled:opacity-50">
            Apply
          </button>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Totals */}
        <div className="space-y-3 text-sm text-gray-600">
           <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
           </div>
           <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
           </div>
        </div>

        <hr className="border-gray-200 my-6" />

        <div className="flex justify-between items-center">
           <span className="text-lg font-bold text-gray-900">Total</span>
           <div className="flex items-baseline gap-2">
              <span className="text-xs text-gray-500">INR</span>
              <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
           </div>
        </div>
      </div>
    </div>
  );
}