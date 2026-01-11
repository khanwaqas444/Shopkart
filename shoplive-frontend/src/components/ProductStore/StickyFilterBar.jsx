"use client";
import React from 'react';

export default function StickyFilterBar({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory, 
  categories 
}) {
  
  // NOTE: Filtering logic is now handled in the 'useSellerData' hook.
  // This component just handles the UI inputs.

  return (
    <div className="sticky top-0 md:top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Search */}
          <div className="md:hidden py-3 border-b border-gray-50">
              <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#007AFF] focus:bg-white outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>

          {/* Category Chips */}
          <div className="py-3 md:py-4">
              <div className="flex items-center justify-between">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:justify-center">
                      {categories.map((cat) => (
                          <button 
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap active:scale-95
                              ${cat === activeCategory 
                                  ? 'bg-[#111827] text-white shadow-md' 
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                              }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}