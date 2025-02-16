'use client';

import QuestionSection from '@/components/QuestionSection';
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

const RecordAnswerSection = dynamic(
  () => import('@/components/RecordAnswerSection'),
  { ssr: false }
)

interface QuestionData {
    question: string;
    answer: string;
}

interface InterviewData {
    jsonPos: string;
    jsonDes: string;
    jsonExp: string;
    jsonResp: string;
}

const StartInterview: React.FC = () => {
    const params = useParams();
    const interviewId = params?.interviewId as string;
    const [interviewQns, setInterviewQns] = useState<string[]>([]);
    const [activeQnIdx, setActiveQnIdx] = useState(0); 

    const GetInterviewDetails = useCallback(async () => {
        if (!interviewId) return;
        try {
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
                    } else {
                        console.error("jsonResp is not an array of objects:", parsedQuestions);
                    }
                } catch (parseError) {
                    console.error("Error parsing jsonResp:", parseError);
                }
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    }, [interviewId]);

    useEffect(() => {
        GetInterviewDetails();
    }, [GetInterviewDetails]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <QuestionSection interviewQns={interviewQns} activeQnIdx={activeQnIdx}/>
                <RecordAnswerSection />
            </div>
        </div>
    );
};

export default StartInterview;
