"use client";
import React from 'react';
import { User, Phone, MapPin, CreditCard } from 'lucide-react';

export default function CheckoutRight({ 
  formData, 
  handleInputChange, 
  errors, 
  paymentMethod, 
  setPaymentMethod, 
  price, 
  onlinePrice,
  handleSubmit,
  // We no longer need productName/Image props here since we removed the duplicate view
}) {
  
  const PRICE_COD = price.toLocaleString();
  const PRICE_ONLINE = onlinePrice.toLocaleString();

  return (
    <div className="max-w-2xl mx-auto p-5 lg:p-12 lg:pt-16">
        <form onSubmit={handleSubmit}>
            
            {/* 
               ❌ REMOVED: The duplicate "Mobile-Only Product Summary" div 
               Now only the large image from CheckoutLeft will show on mobile.
            */}

            {/* Section 1: Contact */}
            <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm">1</div>
                    Contact Information
                </h3>
                
                <div className="space-y-4">
                    <div className="group relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} 
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-0 outline-none transition-all font-medium ${errors.fullName ? 'border-red-500' : 'border-transparent focus:border-black'}`} placeholder="Full Name" />
                    </div>

                    <div className="group relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} 
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-0 outline-none transition-all font-medium ${errors.phone ? 'border-red-500' : 'border-transparent focus:border-black'}`} placeholder="Phone Number" maxLength={10} />
                    </div>
                </div>
            </div>

            {/* Section 2: Address */}
            <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm">2</div>
                    Shipping Address
                </h3>
                
                <div className="space-y-4">
                    <div className="group relative">
                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <textarea id="address" rows="2" value={formData.address} onChange={handleInputChange} 
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-0 outline-none transition-all font-medium resize-none ${errors.address ? 'border-red-500' : 'border-transparent focus:border-black'}`} placeholder="Full Address" ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="tel" id="pincode" value={formData.pincode} onChange={handleInputChange} 
                            className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-0 outline-none transition-all font-medium ${errors.pincode ? 'border-red-500' : 'border-transparent focus:border-black'}`} placeholder="Pincode" maxLength={6} />
                        
                        <input type="text" id="city" value={formData.city} onChange={handleInputChange} 
                            className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:ring-0 outline-none transition-all font-medium ${errors.city ? 'border-red-500' : 'border-transparent focus:border-black'}`} placeholder="City" />
                    </div>
                </div>
            </div>

            {/* Section 3: Payment */}
            <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm">3</div>
                    Payment Method
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    {/* COD Option */}
                    <label 
                        onClick={() => setPaymentMethod('cod')} 
                        className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform active:scale-[0.99]
                        ${paymentMethod === 'cod' ? 'border-[#007AFF] bg-blue-50/30' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                    >
                        <div className={`mt-0.5 relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors
                            ${paymentMethod === 'cod' ? 'border-[#007AFF] bg-white' : 'border-gray-300'}`}>
                            {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#007AFF]"></div>}
                        </div>
                        <div className="flex-1">
                            <span className="font-bold text-gray-900 block">Cash on Delivery</span>
                            <span className="text-sm font-medium text-gray-900 block">₹{PRICE_COD}</span>
                        </div>
                    </label>

                    {/* Online Option */}
                    <label 
                        onClick={() => setPaymentMethod('online')} 
                        className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform active:scale-[0.99]
                        ${paymentMethod === 'online' ? 'border-green-500 bg-green-50/30 shadow-md' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                    >
                        <div className={`mt-0.5 relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors
                            ${paymentMethod === 'online' ? 'border-green-500 bg-white' : 'border-gray-300'}`}>
                            {paymentMethod === 'online' && <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">Pay Online</span>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Save ₹100</span>
                                </div>
                                <span className="font-bold text-green-600">₹{PRICE_ONLINE}</span>
                            </div>
                            
                            {/* Payment Icons */}
                            <div className={`flex items-center gap-3 mt-3 transition-opacity duration-300 ${paymentMethod === 'online' ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale'}`}>
                                <div className="h-6 w-10 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                                    <span className="text-[10px] font-extrabold text-gray-600">UPI</span>
                                </div>
                                <div className="h-6 w-10 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                                    <svg className="h-3 w-auto" viewBox="0 0 36 11" fill="none"><path d="M14.93 0.65C14.47 0.09 13.92 0 12.87 0H9.06C8.58 0 8.16 0.33 7.99 0.77L6.82 6.55L5.75 1.15C5.64 0.54 5.09 0.1 4.45 0.1H0.12C0.05 0.1 0 0.13 0 0.17C0 0.22 0 0.27 0.02 0.29C0.67 0.64 1.45 1.05 1.91 1.34C2.26 1.56 2.36 1.76 2.47 2.21L4.1 10.32C4.16 10.63 4.45 10.85 4.77 10.85H8.22C8.7 10.85 9.12 10.51 9.29 10.06L11.83 2.94L13.11 9.59C13.2 10.15 13.6 10.85 14.45 10.85H17.79L14.93 0.65Z" fill="#1A1F71"/><path d="M22.5 0.1H19.26C18.88 0.1 18.57 0.23 18.42 0.6L15.72 7.64L17.26 0.29C17.31 0.15 17.58 0.1 17.76 0.1H21.2C21.6 0.1 21.84 0.28 21.93 0.56L20.45 7.63L22.5 0.1Z" fill="#1A1F71"/><path d="M29.6 0.1H26.34C25.96 0.1 25.65 0.23 25.5 0.6L22.79 7.64L24.33 0.29C24.39 0.15 24.66 0.1 24.84 0.1H28.27C28.67 0.1 28.91 0.28 29 0.56L27.53 7.63L29.6 0.1Z" fill="#1A1F71"/></svg>
                                </div>
                                <div className="h-6 w-10 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                                    <svg className="h-3 w-auto" viewBox="0 0 24 15" fill="none"><circle cx="7" cy="7.5" r="7" fill="#EB001B"/><circle cx="17" cy="7.5" r="7" fill="#F79E1B"/><path d="M12 11.89C13.56 10.97 14.54 9.35 14.54 7.5C14.54 5.65 13.56 4.03 12 3.11C10.44 4.03 9.46 5.65 9.46 7.5C9.46 9.35 10.44 10.97 12 11.89Z" fill="#FF5F00"/></svg>
                                </div>
                            </div>
                        </div>
                        {/* Dotted border overlay when inactive */}
                        {paymentMethod !== 'online' && <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-transparent hover:border-green-300 pointer-events-none transition-colors"></div>}
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 lg:static lg:border-none lg:p-0 z-40">
                <button 
                    id="submitBtn"
                    type="submit" 
                    className="w-full bg-[#111827] text-white font-bold text-lg py-4 rounded-xl shadow-xl hover:bg-black transition-transform active:scale-[0.98] relative overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'} • ₹{paymentMethod === 'cod' ? PRICE_COD : PRICE_ONLINE}
                    </span>
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 hidden lg:block">By placing this order, you agree to our Terms of Service.</p>
            </div>
        </form>
    </div>
  );
}