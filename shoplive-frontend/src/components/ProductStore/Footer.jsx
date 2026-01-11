"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
              
              {/* Brand Column */}
              <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tighter text-gray-900">JP.</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                      Handcrafted with love for the modern woman. Bringing Indian tradition to your doorstep.
                  </p>
              </div>

              {/* Contact */}
              <div>
                  <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Contact</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                      <li><a href="#" className="hover:text-black transition flex items-center justify-center md:justify-start gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> +91 1800-123-4567</a></li>
                      <li><a href="#" className="hover:text-black transition flex items-center justify-center md:justify-start gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> Chat on WhatsApp</a></li>
                      <li><a href="#" className="hover:text-black transition flex items-center justify-center md:justify-start gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> support@seller.com</a></li>
                  </ul>
              </div>

              {/* Links */}
              <div>
                  <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Support</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                      <li><a href="#" className="hover:text-black transition">Shipping Policy</a></li>
                      <li><a href="#" className="hover:text-black transition">Returns & Refunds</a></li>
                      <li><a href="#" className="hover:text-black transition">Terms of Service</a></li>
                  </ul>
              </div>

              {/* Address */}
              <div>
                  <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Visit Store</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Shop No. 4, Fashion Street,<br />
                      Bandra West, Mumbai - 400050
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                      </a>
                  </div>
              </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-xs text-gray-400">
              <p>&copy; 2025 Jewelry by Priya. Powered by YourPlatform.</p>
          </div>
      </div>
    </footer>
  );
}