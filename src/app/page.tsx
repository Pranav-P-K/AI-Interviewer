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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <Image src="/logo.svg" alt="logo" width={120} height={50} />
        <div className="flex gap-4">
          <Link href={'/dashboard'}>
            <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition">Sign In</button>
          </Link>
          <Link href={'/dashboard'}>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition">Sign Up</button>
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold leading-tight max-w-3xl">Your AI-Powered Mock Interviewer</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Get real-time feedback, AI-generated questions, and improve your interview skills effortlessly.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href={'/dashboard'}>
            <button className="px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition">Get Started</button>
          </Link>
          <Link href={'/dashboard'}>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition">Login</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold">AI-Powered Feedback</h3>
            <p className="mt-2 text-gray-600">Receive instant AI-generated feedback to refine your responses.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold">Realistic Mock Interviews</h3>
            <p className="mt-2 text-gray-600">Practice with AI-driven interviewers in a stress-free environment.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold">Personalized Questions</h3>
            <p className="mt-2 text-gray-600">Get tailored questions based on your job role and experience.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p>&copy; {new Date().getFullYear()} AI Mock Interviewer. All Rights Reserved.</p>
      </footer>
      
      {/* Hidden SignOutButton for auto sign-out */}
      <SignOutButton>
        <button id="signOutButton" className="hidden">Sign Out</button>
      </SignOutButton>
    </div>
  );
};

export default Home;
