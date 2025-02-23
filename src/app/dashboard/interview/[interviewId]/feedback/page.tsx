'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Feedback: React.FC = () => {
    const params = useParams();
    const interviewId = params?.interviewId as string;
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        GetFeedback();
    })

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interviewId))
            .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    }

    return (
        <div className='p-10'>
            {feedbackList?.length === 0
                ? <h2 className='font-bold txt-xl text-grey-500'>No Interview Feedback Record Found</h2>
                : <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-blue-600 text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>
                    <h2 className='text-md text-gray-500'>Find below your interview details and feedback</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='flex flex-col mt-4'>
                            <CollapsibleTrigger className='flex justify-between gap-2 p-2 bg-secondary rounded-lg my-2 w-full'>
                                {item.question}
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-3'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                    <Link href={'/dashboard'}><Button className='my-4'>Go Home</Button></Link>
                </>
            }
        </div>
    )
}

export default Feedback