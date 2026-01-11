"use client";
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div className="flex gap-4 p-4 mb-4 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:shadow-md">
      
      {/* Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
            <button 
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 font-medium">{item.category}</p>
        </div>

        <div className="flex justify-between items-end mt-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Price</span>
            <span className="font-bold text-lg text-gray-900">₹{item.price.toLocaleString()}</span>
          </div>

          {/* Qty Control */}
          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-9">
            <button 
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50"
              disabled={item.qty <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
            <button 
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}