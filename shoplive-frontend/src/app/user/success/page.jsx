"use client";

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';

export default function SuccessPage() {
    const router = useRouter();
    const containerRef = useRef(null);
    const checkRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Checkmark pop and bounce
            gsap.fromTo(checkRef.current,
                { scale: 0, rotate: -20 },
                { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
            );

            // 2. Content sliding up
            gsap.fromTo(".reveal",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
            );

            // 3. Floating animation for the receipt card
            gsap.to(".receipt-card", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Generate a random order number for UI purposes
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 font-sans text-[#171717]">

            {/* Success Icon */}
            <div ref={checkRef} className="mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} className="text-green-600" strokeWidth={2.5} />
                </div>
            </div>

            {/* Main Message */}
            <div className="text-center max-w-md mb-12">
                <h1 className="reveal text-4xl font-bold mb-4 tracking-tight">Order Confirmed!</h1>
                <p className="reveal text-gray-500 text-lg">
                    Thank you for your purchase. We've received your order and we're getting it ready for shipment.
                </p>
            </div>

            {/* Order Details Card */}
            <div className="reveal receipt-card w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-10">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-dashed border-gray-200">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Order Number</p>
                        <p className="font-mono font-bold text-lg">#ORD-{orderNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Date</p>
                        <p className="font-bold">{today}</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                            <Package size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Standard Shipping</p>
                            <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                        Processing
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="reveal flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={() => router.push('/')}
                    className="flex-1 bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Home size={18} />
                    Back to Home
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="flex-1 bg-white border border-gray-200 text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
                >
                    <ShoppingBag size={18} />
                    Continue Shopping
                </button>
            </div>

            {/* Decorative Text */}
            <p className="reveal mt-12 text-sm text-gray-400">
                A confirmation email has been sent to your inbox.
            </p>

        </div>
    );
}