'use client'
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { Interview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const InterviewList = () => {
    const router = useRouter();
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(Interview)
            .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Interview.id));

        console.log(result);
        setInterviewList(result);
    };

    const onStart = (interviewId: number) => {
        router.push(`/dashboard/interview/${interviewId}`);
    };
    
    const onFeedback = (interviewId: number) => {
        router.push(`/dashboard/interview/${interviewId}/feedback`);
    };

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Interviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {interviewList.map((interview, index) => {
                    const interviewId = interview?.mockId;

                    return (
                        <div key={index} className='border shadow-sm rounded-lg p-3'>
                            <h2 className='font-bold text-primary'>{interview?.jsonPos}</h2>
                            <h2 className='text-md text-gray-800'>{interview?.jsonExp} Years of Experience</h2>
                            <h2 className='text-sm text-gray-500'>Created At: {interview?.createdAt}</h2>
                            <div className='flex justify-between mt-2 gap-5'>
                                <Button onClick={() => onFeedback(interviewId)} size='sm' variant='outline' className='w-full'>Feedback</Button>
                                <Button onClick={() => onStart(interviewId)} size='sm' className='w-full'>Start</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InterviewList;
