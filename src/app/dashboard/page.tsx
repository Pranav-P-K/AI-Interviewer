'use client'
import React from 'react';
import AddNewInterview from '@/components/AddNewInterview';
import InterviewList from '@/components/InterviewList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8 animate-fadeIn">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Create and start your AI Mockup Interview journey
          </p>
        </div>

        {/* Add New Interview Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 gap-4">
          <h3 className="text-xl font-semibold mb-6">Start New Interview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddNewInterview />
          </div>

        {/* Interview List Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">Your Interviews</h3>
            <InterviewList />
          </div>
        </div>
      </div>

      {/* Add required styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;