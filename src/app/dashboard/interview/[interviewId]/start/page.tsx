'use client';

import QuestionSection from '@/components/QuestionSection';
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

const RecordAnswerSection = dynamic(
    () => import('@/components/RecordAnswerSection'),
    { ssr: false }
);

interface QuestionData {
    answerExample: string;
    question: string;
}

interface InterviewData {
    mockId: string;
    jsonPos: string;
    jsonDes: string;
    jsonExp: string;
    jsonResp: string;
}

const StartInterview: React.FC = () => {
    const params = useParams();
    const interviewId = params?.interviewId as string;
    const [interviewQns, setInterviewQns] = useState<string[]>([]);
    const [interviewAns, setInterviewAns] = useState<string[]>([]);
    const [activeQnIdx, setActiveQnIdx] = useState(0);
    const [loading, setLoading] = useState(true);

    const GetInterviewDetails = useCallback(async () => {
        if (!interviewId) return;
        try {
            setLoading(true);
            const result = await db
                .select()
                .from(Interview)
                .where(eq(Interview.mockId, interviewId));

            if (result.length === 0) {
                console.warn("No interview data found.");
                return;
            }

            const interview = result[0] as InterviewData;

            if (interview.jsonResp) {
                try {
                    const parsedQuestions: QuestionData[] = JSON.parse(interview.jsonResp);

                    if (Array.isArray(parsedQuestions)) {
                        setInterviewQns(parsedQuestions.map(q => q.question));
                        setInterviewAns(parsedQuestions.map(a => a.answerExample));
                    } else {
                        console.error("jsonResp is not an array of objects:", parsedQuestions);
                    }
                } catch (parseError) {
                    console.error("Error parsing jsonResp:", parseError);
                }
            }
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8 animate-fadeIn">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Question {activeQnIdx + 1} of {interviewQns.length}</span>
                        <span className="text-sm text-gray-600">{Math.round(((activeQnIdx + 1) / interviewQns.length) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${((activeQnIdx + 1) / interviewQns.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
                    {/* Question Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <QuestionSection 
                            interviewQns={interviewQns} 
                            activeQnIdx={activeQnIdx} 
                        />
                    </div>

                    {/* Answer Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <RecordAnswerSection 
                                interviewQns={interviewQns}
                                interviewAns={interviewAns}
                                activeQnIdx={activeQnIdx}
                                interviewId={interviewId}
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center gap-4 pt-4">
                            <Button
                                onClick={() => setActiveQnIdx(activeQnIdx - 1)}
                                disabled={activeQnIdx === 0}
                                className="flex items-center gap-2 transition-transform duration-300 hover:-translate-x-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>

                            {activeQnIdx === interviewQns?.length - 1 ? (
                                <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                                    <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1">
                                        <Flag className="w-4 h-4" />
                                        End Interview
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    onClick={() => setActiveQnIdx(activeQnIdx + 1)}
                                    className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mx-auto" />
                        <p className="mt-4 text-gray-600">Loading interview...</p>
                    </div>
                </div>
            )}

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

export default StartInterview;