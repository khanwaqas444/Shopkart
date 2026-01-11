"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Users, LayoutDashboard, Settings, ShieldAlert,
    DollarSign, Package, LogOut, TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/auth/login');
    };

    const stats = [
        { label: 'Total Users', value: '12,842', icon: Users, color: 'text-blue-600' },
        { label: 'Total Revenue', value: '$45,210', icon: DollarSign, color: 'text-green-600' },
        { label: 'Active Sellers', value: '452', icon: ShieldAlert, color: 'text-purple-600' },
        { label: 'Total Products', value: '2,405', icon: Package, color: 'text-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-900">AdminPanel</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl font-medium cursor-pointer">
                        <LayoutDashboard size={20} /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Users size={20} /> Manage Users
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <TrendingUp size={20} /> Analytics
                    </div>
                    <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Settings size={20} /> Settings
                    </div>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
                        <p className="text-gray-500">Welcome back, Super Admin</p>
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                        Admin Role Verified
                    </div>
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

                {/* Table Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-4">Recent User Registrations</h3>
                    <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 text-gray-400">
                        Table content will load here...
                    </div>
                </div>
            </main>
        </div>
    );
}