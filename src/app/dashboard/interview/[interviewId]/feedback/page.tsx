'use client';

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Home, Star, Trophy, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Result {
    id: number;
    mockIdRef: string;
    question: string;
    correctAns: string;
    userAns: string;
    feedback: string;
    rating: string;
    userEmail: string;
    createdAt: string;
}

const Feedback: React.FC = () => {
    const params = useParams();
    const interviewId = params?.interviewId as string;
    const [feedbackList, setFeedbackList] = useState<Result[]>([]);

    useEffect(() => {
        GetFeedback();
    }); // Added dependency

    const GetFeedback = async () => {
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, interviewId))
                .orderBy(UserAnswer.id);
            setFeedbackList(result);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };


    if (feedbackList?.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-600">No Interview Feedback Record Found</h2>
                    <Link href="/dashboard">
                        <Button className="mt-6 flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto animate-fadeIn">
                {/* Header Section */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="w-8 h-8 text-green-500" />
                        <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
                    </div>
                    <p className="text-xl text-gray-600">Here is your comprehensive interview feedback</p>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-blue-600">
                                Overall Rating: <span className="text-2xl">7/10</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="space-y-4">
                    {feedbackList.map((item, index) => (
                        <Collapsible 
                            key={index} 
                            className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
                        >
                            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between gap-4 text-left">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 rounded-full p-2">
                                        <MessageCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="font-medium">Question {index + 1}</span>
                                </div>
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent className="px-4 pb-4">
                                <div className="space-y-4 pt-2">
                                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                        <h3 className="font-semibold mb-2">Question:</h3>
                                        <p>{item.question}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <XCircle className="w-4 h-4 text-red-500" />
                                                <h3 className="font-semibold text-red-700">Your Answer</h3>
                                            </div>
                                            <p className="text-red-900">{item.userAns}</p>
                                        </div>

                                        <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <h3 className="font-semibold text-green-700">Sample Answer</h3>
                                            </div>
                                            <p className="text-green-900">{item.correctAns}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                        <h3 className="font-semibold text-blue-700 mb-2">Feedback & Suggestions</h3>
                                        <p className="text-blue-900">{item.feedback}</p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                                        <h3 className="font-semibold text-purple-700 mb-2">Rating</h3>
                                        <p className="text-purple-900">{item.rating}</p>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/dashboard">
                        <Button className="px-8 py-3 text-lg flex items-center gap-2 transform hover:-translate-y-1 transition-transform duration-300">
                            <Home className="w-5 h-5" />
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Add required styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.7s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Feedback;