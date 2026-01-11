import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {/* Logo / Branding */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4">
          <ShoppingBag className="text-white w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          MARKETPLACE
        </h1>
        <p className="text-gray-500 mt-2 max-w-xs">
          Discover and shop the finest handcrafted jewellery collections.
        </p>
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link 
          href="/auth/login"
          className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          Sign In
        </Link>
        
        <Link 
          href="/auth/register"
          className="w-full bg-white text-black border-2 border-gray-200 py-4 rounded-2xl font-bold text-lg hover:border-black transition-all"
        >
          Create Account
        </Link>
      </div>

      {/* Guest Access */}
      <div className="mt-12">
        <Link 
          href="/user" 
          className="text-gray-400 font-medium flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          Browse as Guest <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}