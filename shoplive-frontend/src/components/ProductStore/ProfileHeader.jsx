"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProfileHeader({ profile }) {
  const headerRef = useRef(null);

  useEffect(() => {
    // Only animate if profile data exists
    if (profile && headerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".animate-header",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
        );
      }, headerRef);
      return () => ctx.revert();
    }
  }, [profile]);

  // Loading State (Skeleton)
  if (!profile) {
    return (
      <header className="w-full bg-white border-b border-gray-100 pt-8 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
             <div className="w-24 h-24 rounded-full bg-gray-200"></div>
             <div className="flex-1 space-y-3">
                <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
             </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header ref={headerRef} className="w-full bg-white border-b border-gray-100 pt-8 pb-8 md:pt-16 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              
              {/* Profile Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1 animate-header">
                  <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                          <img 
                            src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.name}&background=fff&color=000&size=160`} 
                            alt={profile.name} 
                            className="w-full h-full rounded-full border-4 border-white object-cover group-hover:opacity-90 transition"
                          />
                      </div>
                      
                      {profile.onlineStatus && (
                        <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                           <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                  </div>
                  
                  <div className="space-y-3 max-w-lg">
                      <div>
                          <div className="flex items-center justify-center md:justify-start gap-2">
                              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h1>
                              {profile.verified && (
                                <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                              )}
                          </div>
                          <a href="#" className="text-gray-500 hover:text-[#007AFF] font-medium transition text-sm">{profile.handle}</a>
                      </div>
                      <p className="text-[#4A4A4A] text-base leading-relaxed">
                          {profile.description}
                      </p>
                      
                      {/* Trust Badges */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                           {profile.location && (
                             <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                <span className="text-xs font-semibold text-gray-700">{profile.location}</span>
                             </div>
                           )}
                           <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                              <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                              <span className="text-xs font-semibold text-gray-700">{profile.overallRating} ({profile.reviewCount})</span>
                           </div>
                           {profile.freeShipping && (
                             <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3z" /></svg>
                                <span className="text-xs font-semibold text-green-700">Free Ship</span>
                             </div>
                           )}
                      </div>
                  </div>
              </div>

              {/* CTA Actions */}
              <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px] animate-header">
                  {profile.socialLinks && profile.socialLinks[0] && (
                    <a 
                      href={profile.socialLinks[0].url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block w-full py-3.5 px-8 text-white text-center font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-r from-[#F09433] via-[#DC2743] to-[#BC1888]"
                    >
                        <div className="flex items-center justify-center gap-2">
                             <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                           Follow
                      </div>
                    </a>
                  )}
                  
                  {/* Contact Button */}
                  {profile.contact?.email && (
                    <a 
                        href={`mailto:${profile.contact.email}`}
                        className="block w-full py-3.5 px-8 bg-white border border-gray-200 text-gray-700 text-center font-bold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition shadow-sm"
                    >
                        Contact Seller
                    </a>
                  )}
              </div>
          </div>
      </div>
    </header>
  );
}