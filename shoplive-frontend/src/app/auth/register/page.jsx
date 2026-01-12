"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShoppingBasket, UserCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'USER'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    full_name: formData.fullName,
                    role: formData.role
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Registration failed");
            }

            // --- CHANGES HERE ---
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.user_id); // Saving the MongoDB ID
            // --------------------

            if (data.role === 'SELLER') router.push('/seller/dashboard');
            else if (data.role === 'ADMIN') router.push('/admin/dashboard');
            else router.push('/user');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-[#171717]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Create your account</h2>
                <p className="mt-2 text-sm text-gray-600">Join our marketplace platform</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-2xl sm:px-10 border border-gray-100">

                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'USER' })}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.role === 'USER'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                }`}
                        >
                            <UserCircle2 className="mb-2" size={24} />
                            <span className="text-xs font-bold uppercase tracking-wider">Buyer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'SELLER' })}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.role === 'SELLER'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                }`}
                        >
                            <ShoppingBasket className="mb-2" size={24} />
                            <span className="text-xs font-bold uppercase tracking-wider">Seller</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="fullName"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all sm:text-sm"
                                    placeholder="John Doe"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all sm:text-sm"
                                    placeholder="you@example.com"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#111827] hover:bg-black transition-all disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Get Started as {formData.role.toLowerCase()} <ArrowRight size={16} />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
