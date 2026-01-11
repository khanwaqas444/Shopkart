"use client";

import React, { useState } from 'react';
import { useCrud } from '@/hooks/useCrud';
import {
    Store, MapPin, Globe, Info,
    CheckCircle, Truck, Save, Loader2, Star
} from 'lucide-react';

export default function SellerProfilePage() {
    const { createItem, loading, error } = useCrud("sellerProfile");
    const [success, setSuccess] = useState(false);

    // Initial state matching your MongoDB Schema
    const [formData, setFormData] = useState({
        name: "",
        handle: "@",
        description: "",
        avatarUrl: "",
        location: "",
        overallRating: 5.0, // Default for new sellers
        reviewCount: 0,
        freeShipping: false,
        verified: false,
        onlineStatus: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        try {
            // Using the hook to send POST request to http://localhost:8000/sellerProfile/
            await createItem(formData);
            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Failed to save profile:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Setup Your Shop</h1>
                    <p className="text-gray-500 mt-2">Fill in your business details to start selling.</p>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3">
                        <CheckCircle size={20} />
                        <span className="font-bold">Profile created successfully! Your shop is now live.</span>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: THE FORM */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 space-y-6">

                                {/* Shop Basics */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Shop Name</label>
                                        <input
                                            name="name" required
                                            value={formData.name} onChange={handleChange}
                                            placeholder="e.g. Diamond Dreams"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Handle</label>
                                        <input
                                            name="handle" required
                                            value={formData.handle} onChange={handleChange}
                                            placeholder="@yourshop"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Avatar URL */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Avatar / Logo URL</label>
                                    <input
                                        name="avatarUrl"
                                        value={formData.avatarUrl} onChange={handleChange}
                                        placeholder="https://images.com/your-logo.png"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Shop Description</label>
                                    <textarea
                                        name="description" rows="3"
                                        value={formData.description} onChange={handleChange}
                                        placeholder="Tell customers what you sell..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    ></textarea>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            name="location"
                                            value={formData.location} onChange={handleChange}
                                            placeholder="City, Country"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Settings */}
                                <div className="flex flex-wrap gap-6 pt-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox" name="freeShipping"
                                            checked={formData.freeShipping} onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Offer Free Shipping</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox" name="onlineStatus"
                                            checked={formData.onlineStatus} onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Show as Online</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-8 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit" disabled={loading}
                                    className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: LIVE PREVIEW */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h3>

                            {/* Reusing your Marketplace Card Design */}
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="p-6 pb-0 flex items-start justify-between">
                                    <div className="relative">
                                        <img
                                            src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.name || 'Shop'}`}
                                            className="w-16 h-16 rounded-2xl object-cover bg-gray-100"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${formData.onlineStatus ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    </div>
                                    {formData.freeShipping && (
                                        <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                            <Truck size={12} /> Free Ship
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h3 className="font-bold text-lg truncate">{formData.name || "Your Shop Name"}</h3>
                                        <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />
                                    </div>
                                    <p className="text-blue-500 text-xs font-medium mb-3">{formData.handle}</p>
                                    <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-4">{formData.description || "Describe your shop..."}</p>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50 text-gray-400 text-xs">
                                        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 5.0</div>
                                        <div className="flex items-center gap-1"><MapPin size={14} /> {formData.location || "Location"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-2xl flex gap-3">
                                <Info className="text-blue-500 shrink-0" size={20} />
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    <strong>Note:</strong> Your verification status and review counts are managed by the administrator to ensure platform trust.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}