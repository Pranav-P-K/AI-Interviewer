/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import { useParams } from 'next/navigation';
import { Lightbulb, WebcamIcon, Briefcase, Code, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface InterviewData {
  mockId: string;
  jsonPos: string;
  jsonDes: string;
  jsonExp: string;
  jsonResp: string;
}

const InterviewPage: React.FC = () => {
  const params = useParams();
  const interviewId = params?.interviewId as string;
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [webcamEnable, setWebcamEnable] = useState(false);
  const [loading, setLoading] = useState(true);

  const GetInterviewDetails = useCallback(async () => {
    if (!interviewId) return;
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockId, interviewId));
      setInterviewData(result[0] as InterviewData || null);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  }, [interviewId]);

  useEffect(() => {
    GetInterviewDetails();
  }, [GetInterviewDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Let&apos;s Get Started
          </h2>
          <p className="text-gray-600 mt-2">Prepare yourself for your AI-powered mock interview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
          {/* Interview Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-primary" />
                  <h3 className="font-semibold">Job Role / Position</h3>
                </div>
                <p className="text-gray-700 ml-9">{interviewData?.jsonPos || 'Loading...'}</p>

                <div className="flex items-center gap-3">
                  <Code className="text-primary" />
                  <h3 className="font-semibold">Tech Stack / Description</h3>
                </div>
                <p className="text-gray-700 ml-9">{interviewData?.jsonDes || 'Loading...'}</p>

                <div className="flex items-center gap-3">
                  <Clock className="text-primary" />
                  <h3 className="font-semibold">Experience Required</h3>
                </div>
                <p className="text-gray-700 ml-9">{interviewData?.jsonExp || 'Loading...'} years</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-amber-500" />
                <h3 className="font-semibold text-amber-700">Important Information</h3>
              </div>
              <div className="space-y-3 text-amber-700">
                <p>Enable video <strong>Web Cam</strong> and <strong>Microphone</strong> to start your AI Generated Mock Interview.</p>
                <p>The interview consists of 5 questions, and you all receive a detailed report based on your answers.</p>
                <div className="flex items-start gap-2 mt-4 p-3 bg-amber-100 rounded-lg">
                  <AlertCircle className="text-amber-500 h-5 w-5 mt-1" />
                  <p className="text-sm">We prioritize your privacy and never record your video. You can disable webcam access at any time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Webcam Section */}
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              {webcamEnable ? (
                <div className="rounded-lg overflow-hidden shadow-inner bg-gray-900">
                  <Webcam
                    onUserMedia={() => setWebcamEnable(true)}
                    onUserMediaError={() => setWebcamEnable(false)}
                    mirrored={true}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <WebcamIcon className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Enable your webcam to begin</p>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <Button 
                  onClick={() => setWebcamEnable(!webcamEnable)} 
                  className="w-full py-3 text-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  {webcamEnable ? 'Disable' : 'Enable'} WebCam and Microphone
                </Button>

                <Link href={`/dashboard/interview/${interviewId}/start`} className="block">
                  <Button 
                    className="w-full py-3 text-lg font-medium bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1"
                    disabled={!webcamEnable}
                  >
                    Start Interview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add required styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InterviewPage;