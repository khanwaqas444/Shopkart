"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react'; // Import Plus icon
import QuickAddModal from './QuickAddModal';

export default function ProductCard({ product, sellerId }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // Navigate to Details
  const handleNavigateToDetails = (e) => {
    if (showModal) return; 
    router.push(`/user/shop/${sellerId}/orders/${product.id}`);
  };

  // Open Quick Add Modal
  const handleQuickAdd = (e) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  return (
    <>
        <div 
          onClick={handleNavigateToDetails} 
          className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100/50"
        >
            {/* Image Wrapper */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Sale Badge */}
                {product.sale && (
                    <span className="absolute top-3 left-3 bg-[#E31837] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        SALE
                    </span>
                )}

                {/* Wishlist Icon (Desktop & Mobile) */}
                {/* <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-y-2 lg:group-hover:translate-y-0 shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button> */}
                
                {/* 📱 MOBILE QUICK ADD (Visible on Mobile, Hidden on Desktop) */}
                <button 
                    onClick={handleQuickAdd}
                    className="lg:hidden absolute bottom-3 right-3 w-9 h-9 bg-white text-black rounded-full shadow-lg flex items-center justify-center border border-gray-100 active:scale-90 transition-transform z-20"
                >
                    <Plus size={18} strokeWidth={2.5} />
                </button>

                {/* 💻 DESKTOP QUICK ADD (Hidden on Mobile, Slide up on Hover) */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden lg:block z-20">
                    <button 
                        onClick={handleQuickAdd}
                        className="w-full bg-white/95 backdrop-blur-md text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-[#111827] hover:text-white transition-all text-xs tracking-wide uppercase flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 h-10 mb-2 group-hover:text-[#007AFF] transition-colors">
                    {product.name}
                </h3>
                
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>
                        {product.sale && product.originalPrice && (
                            <span className="text-[10px] font-bold text-green-600">
                                {Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}% OFF
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal Logic */}
        <QuickAddModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            product={product}
        />
    </>
  );
}