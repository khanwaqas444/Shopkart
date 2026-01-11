"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import gsap from 'gsap';
import { ChevronLeft, Lock } from 'lucide-react';

import SuccessPage from '@/components/SuccessPage'; 
import CheckoutLeft from '@/components/OrderPage/CheckoutLeft';
import CheckoutRight from '@/components/OrderPage/CheckoutRight';

// HOOKS
import { useSellerData } from '@/hooks/sellerProductHook';
import { useCrud } from '@/hooks/useCrud'; 

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  
  const sellerId = params?.sellerId;
  const productId = params?.productId;

  // 1. DATA FETCHING
  const { sellerProducts, sellerProfile, isLoading: isDataLoading } = useSellerData(sellerId);
  
  // 2. DATA MUTATION
  const { createItem } = useCrud("orders"); 

  const product = sellerProducts.find(p => 
    String(p.id) === String(productId) || String(p._id) === String(productId)
  );

  // --- STATE ---
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: '',
    city: ''
  });
  const [errors, setErrors] = useState({});

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // --- ANIMATIONS ---
  useEffect(() => {
    setMounted(true);
    if (!isDataLoading && product) {
      const ctx = gsap.context(() => {
        // Desktop Animation
        if (window.innerWidth >= 1024) {
            gsap.fromTo(leftColRef.current, 
              { opacity: 0, x: -30 }, 
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
            );
            gsap.fromTo(rightColRef.current, 
              { opacity: 0, x: 30 }, 
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
            );
        } else {
            // Mobile Animation (Simple Fade Up)
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isDataLoading, product]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.fullName.trim()) { newErrors.fullName = true; isValid = false; }
    if (!formData.phone.match(/^[0-9]{10}$/)) { newErrors.phone = true; isValid = false; }
    if (!formData.address.trim()) { newErrors.address = true; isValid = false; }
    if (!formData.pincode.match(/^[0-9]{6}$/)) { newErrors.pincode = true; isValid = false; }
    if (!formData.city.trim()) { newErrors.city = true; isValid = false; }
    setErrors(newErrors);
    return { isValid, firstErrorId: Object.keys(newErrors)[0] };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, firstErrorId } = validateForm();

    if (!isValid) {
      // Shake animation on error
      const errorElement = document.getElementById(firstErrorId);
      if (errorElement) {
        gsap.to(errorElement, { x: [-5, 5, -5, 5, 0], duration: 0.4 });
        errorElement.focus();
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const price = product.price;
    const finalAmount = paymentMethod === 'cod' ? price : (price - 100);

    const orderPayload = {
      sellerId: sellerId,
      productId: product.id || product._id,
      productName: product.name, 
      productImage: product.image,
      customer: { ...formData },
      amount: finalAmount,
      paymentMethod: paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    try {
      const newOrder = await createItem(orderPayload);
      setConfirmedOrderId(newOrder.id || newOrder._id); 
      setShowSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return <div className="bg-white min-h-screen"></div>;

  if (showSuccess) {
    return (
      <SuccessPage 
        orderId={confirmedOrderId ? `OD-${confirmedOrderId}` : `OD-${Date.now()}`} 
        onContinueShopping={() => window.location.href = `/store/${sellerId}`} 
      />
    );
  }

  if (isDataLoading) {
    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-pulse">
            {/* Desktop Skeleton */}
            <div className="w-full lg:w-5/12 h-screen border-r border-gray-100 hidden lg:flex flex-col justify-center p-12 bg-gray-50">
                <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
                <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            </div>
            {/* Mobile Skeleton */}
            <div className="lg:hidden p-4 w-full">
                <div className="h-48 w-full bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
            </div>
            {/* Right Skeleton */}
            <div className="w-full lg:w-7/12 p-8 pt-20">
                <div className="space-y-4">
                    <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
                    <div className="h-24 w-full bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <button onClick={() => router.back()} className="px-6 py-3 bg-black text-white rounded-xl">Go Back</button>
        </div>
    );
  }

  const price = product.price;
  const onlinePrice = price - 100; 

  return (
    <div ref={containerRef} className="bg-white min-h-screen flex flex-col lg:flex-row font-sans text-[#171717]">
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shine { 100% { left: 125%; } }
        .animate-shine { animation: shine 2s infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-custom { animation: spin 1s linear infinite; }
      `}</style>

      {/* Mobile Header (Shows on top of scroll) */}
      <header className="lg:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-lg">Checkout</span>
         </div>
         <div className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Lock className="w-3 h-3 mr-1" /> Secure
         </div>
      </header>

      {/* 
        --- LEFT COLUMN: Product & Summary ---
        Mobile: Flex order-1 (Top), Relative (Scrolls with page)
        Desktop: Flex order-1 (Left), Sticky (Stays fixed), H-screen
      */}
      <div 
        ref={leftColRef} 
        className="w-full lg:w-5/12 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 order-1 lg:order-1 relative lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center p-4 lg:p-12"
      >
          <CheckoutLeft 
            product={product} 
            sellerProfile={sellerProfile} 
            price={price} 
            onlinePrice={onlinePrice} 
            paymentMethod={paymentMethod} 
          />
      </div>

      {/* --- RIGHT COLUMN: Form & Payment --- */}
      <div ref={rightColRef} className="w-full lg:w-7/12 bg-white order-2 lg:order-2 pb-24 lg:pb-0">
          <CheckoutRight 
            formData={formData} 
            handleInputChange={handleInputChange} 
            errors={errors} 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod} 
            price={price} 
            onlinePrice={onlinePrice} 
            handleSubmit={handleSubmit}
            // Removed productName/Image since CheckoutRight doesn't display them anymore
          />
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[60] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin-custom"></div>
            <h2 className="mt-6 text-xl font-bold text-gray-900 tracking-tight">Processing...</h2>
        </div>
      )}
    </div>
  );
}