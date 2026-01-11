"use client";
import React from 'react';
import { ChevronLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutLeft({ product, sellerProfile, price, onlinePrice, paymentMethod }) {
  const router = useRouter();

  if (!product) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center p-8 lg:p-12 relative">
        
      

        {/* Product Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 w-full max-w-md mx-auto">
            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4 group">
                <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={product.name} 
                />
                
                {/* Carousel Dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm backdrop-blur-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm backdrop-blur-sm"></div>
                </div>
                
                {product.sale && <span className="absolute top-3 right-3 bg-[#E31837] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">SALE</span>}
            </div>
            
            <div>
                {sellerProfile?.name && <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{sellerProfile.name}</p>}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug line-clamp-2">{product.name}</h2>
                
                <div className="flex items-center gap-2 mt-3">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">{product.category}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" /> {product.rating}
                    </div>
                </div>
            </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-3 py-6 border-t border-gray-200 w-full max-w-md mx-auto">
            <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                    <span className="text-xs text-gray-500 block">INR</span>
                    <span className="text-2xl font-bold text-[#007AFF]">
                        ₹{paymentMethod === 'cod' ? price.toLocaleString() : onlinePrice.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 flex items-center justify-center gap-6 text-gray-400 text-xs font-medium w-full max-w-md mx-auto">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure Checkout</span>
            <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Fast Delivery</span>
        </div>
    </div>
  );
}