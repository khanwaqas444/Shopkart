"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
        const formDetails = new URLSearchParams();
        formDetails.append('username', formData.email); // Python backend sub
        formDetails.append('password', formData.password);

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDetails,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Invalid email or password");
            }

            // Save session
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userid', data.user_id);

            // Redirect based on role from backend
            if (data.role === 'ADMIN') router.push('/admin/dashboard');
            else if (data.role === 'SELLER') router.push('/seller/dashboard');
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
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-600">Sign in to manage your account</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-2xl sm:px-10 border border-gray-100">

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
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
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#111827] hover:bg-black transition-all disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <span className="flex items-center gap-2">Sign in <ArrowRight size={16} /></span>}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/auth/register" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            New to our platform? Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
