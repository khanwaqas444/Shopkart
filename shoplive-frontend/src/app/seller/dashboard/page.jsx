"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    ShoppingBag, Package, PlusCircle, TrendingUp,
    LogOut, Star, ShoppingCart, MessageSquare
} from 'lucide-react';

export default function SellerDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/auth/login');
    };

    const stats = [
        { label: 'Sales Today', value: '$1,240', icon: TrendingUp, color: 'text-green-600' },
        { label: 'Active Orders', value: '18', icon: ShoppingCart, color: 'text-blue-600' },
        { label: 'Store Rating', value: '4.8/5', icon: Star, color: 'text-yellow-500' },
        { label: 'Pending Chats', value: '4', icon: MessageSquare, color: 'text-purple-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold">SellerCenter</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl font-medium cursor-pointer">
                        <ShoppingBag size={20} /> Overview
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all cursor-pointer">
                        <Package size={20} /> My Products
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all cursor-pointer">
                        <PlusCircle size={20} /> Add New Product
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all cursor-pointer">
                        <Star size={20} /> Reviews
                    </div>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-medium">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Store Performance</h2>
                        <p className="text-gray-500">Here is what is happening with your shop today</p>
                    </div>
                    <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                        <PlusCircle size={18} /> New Product
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className={`p-3 rounded-lg w-fit mb-4 bg-gray-50 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Recent Orders</h3>
                        <button className="text-blue-600 text-sm font-bold">View All</button>
                    </div>
                    <div className="p-12 text-center text-gray-400">
                        <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No new orders in the last 24 hours.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}