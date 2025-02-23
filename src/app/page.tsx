'use client';

import { useEffect } from 'react';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  useEffect(() => {
    return () => {
      document.getElementById('signOutButton')?.click();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Image src="/logo.svg" alt="logo" width={120} height={50} className="object-contain" />
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Sign In
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-6 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Your AI-Powered Mock Interviewer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get real-time feedback, AI-generated questions, and improve your interview skills effortlessly.
            </p>
            <div className="flex gap-6 justify-center mt-10">
              <Link href="/dashboard">
                <button className="group px-8 py-4 bg-primary text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1">
                  Get Started
                  <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Feedback",
                description: "Receive instant AI-generated feedback to refine your responses.",
                icon: "🤖"
              },
              {
                title: "Realistic Mock Interviews",
                description: "Practice with AI-driven interviewers in a stress-free environment.",
                icon: "🎯"
              },
              {
                title: "Personalized Questions",
                description: "Get tailored questions based on your job role and experience.",
                icon: "✨"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} AI Mock Interviewer. All Rights Reserved.
          </p>
        </div>
      </footer>
      
      {/* Hidden SignOutButton for auto sign-out */}
      <SignOutButton>
        <button id="signOutButton" className="hidden">Sign Out</button>
      </SignOutButton>

      {/* Add required styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;