"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Star, CheckCircle,
  Truck, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { useCrud } from '@/hooks/useCrud';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sellers, loading, error } = useCrud("sellerProfile");

  // 1. IMPROVED FILTER: Added a check to ensure the seller has an ID before trying to render it
  const filteredSellers = sellers?.filter(s => {
    const hasId = s._id || s.id;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return hasId && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Fetching sellers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Connection Error</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-black text-white rounded-full font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A]">

      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-black tracking-tight">MARKETPLACE</h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or handle..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Jewellery Sellers</h2>
          <p className="text-gray-500">Discover premium handcrafted collections from verified stores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller, index) => {
            
            /** 
             * FIX: ROBUST ID HANDLING
             * We check for _id (MongoDB), then .id (Standard), then fallback to index.
             * We use .toString() because MongoDB IDs are sometimes objects.
             */
            const sellerId = seller._id?.toString() || seller.id || index;

            return (
              <Link
                key={sellerId} 
                href={`/user/shop/${sellerId}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                {/* Card Top: Avatar & Status */}
                <div className="p-6 pb-0 flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={seller.avatarUrl}
                      alt={seller.name}
                      className="w-16 h-16 rounded-2xl object-cover bg-gray-100 border border-gray-100"
                      onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=" + seller.name}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${seller.onlineStatus ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>

                  {seller.freeShipping && (
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      <Truck size={12} />
                      Free Ship
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors truncate">
                      {seller.name}
                    </h3>
                    {seller.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />
                    )}
                  </div>
                  <p className="text-blue-500 text-xs font-medium mb-3">{seller.handle}</p>

                  <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-4">
                    {seller.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold">{seller.overallRating}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {seller.reviewCount?.toLocaleString()} reviews
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin size={14} />
                      {seller.location}
                    </div>
                    <div className="bg-gray-50 group-hover:bg-blue-600 group-hover:text-white p-2 rounded-lg transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredSellers.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No shops found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  );
}