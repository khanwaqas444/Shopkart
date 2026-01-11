"use client";
import React from 'react';
import { User, Mail, MapPin, Phone, CreditCard, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutForm({ formData, handleInputChange, handleSubmit, isSubmitting }) {
  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 lg:px-0 lg:py-16">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
         <Link href="/user/cart" className="text-[#007AFF] text-sm hover:underline font-medium">
            Return to Cart
         </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Contact Section */}
        <section>
           <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
           <div className="space-y-4">
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                 </div>
                 <input 
                   type="email" 
                   name="email"
                   placeholder="Email address"
                   className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] outline-none transition-all"
                   required
                 />
              </div>
           </div>
        </section>

        {/* Shipping Section */}
        <section>
           <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
           <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <input type="text" placeholder="First name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
                 </div>
                 <div className="relative">
                    <input type="text" placeholder="Last name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
                 </div>
              </div>
              
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-gray-400" /></div>
                 <input type="text" placeholder="Address" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
              </div>

              <div className="relative">
                 <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
                 <input type="text" placeholder="PIN Code" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                 <input type="tel" placeholder="Phone" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007AFF] outline-none" required />
              </div>
           </div>
        </section>

        {/* Payment Section */}
        <section>
           <h2 className="text-lg font-bold text-gray-900 mb-4">Payment</h2>
           <div className="border border-gray-200 rounded-xl overflow-hidden">
              
              {/* Option 1: COD */}
              <div className="flex items-center p-4 border-b border-gray-200 bg-blue-50/30">
                 <input id="cod" type="radio" name="payment" defaultChecked className="h-4 w-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" />
                 <label htmlFor="cod" className="ml-3 flex flex-1 flex-col cursor-pointer">
                    <span className="block text-sm font-bold text-gray-900">Cash on Delivery (COD)</span>
                    <span className="block text-xs text-gray-500">Pay when you receive your order</span>
                 </label>
              </div>

              {/* Option 2: Online */}
              <div className="flex items-center p-4 bg-white opacity-60">
                 <input id="online" type="radio" name="payment" disabled className="h-4 w-4 text-gray-300 border-gray-300" />
                 <label htmlFor="online" className="ml-3 flex flex-1 justify-between items-center cursor-not-allowed">
                    <span className="block text-sm font-medium text-gray-500">Credit / Debit Card / UPI</span>
                    <div className="flex gap-2">
                       {/* Icons */}
                       <div className="w-8 h-5 bg-gray-100 rounded border"></div>
                       <div className="w-8 h-5 bg-gray-100 rounded border"></div>
                    </div>
                 </label>
              </div>
           </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
           <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
              <ChevronLeft size={16} /> Return to Cart
           </Link>
           
           <button 
             type="submit"
             disabled={isSubmitting}
             className="w-full lg:w-auto bg-[#111827] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-black transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isSubmitting ? 'Processing...' : 'Complete Order'}
           </button>
        </div>
      </form>
    </div>
  );
}