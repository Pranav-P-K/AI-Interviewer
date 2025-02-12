'use client';

import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import { useParams } from 'next/navigation';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InterviewData {
  jsonPos: string,
  jsonDes: string,
  jsonExp: string,
  jsonResp: string
}

const InterviewPage: React.FC = () => {
  const params = useParams();
  const interviewId = params?.interviewId as string;
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [webcamEnable, setWebcamEnable] = useState(false);

  const GetInterviewDetails = useCallback(async () => {
    if (!interviewId) return;
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockId, interviewId));
      console.log(result[0])
      setInterviewData(result[0] as InterviewData || null);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  }, [interviewId]);

  useEffect(() => {
    GetInterviewDetails();
  }, [GetInterviewDetails]);

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let&apos;s Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
            <h2 className='text-lg'><strong>Job Role / Job Position: </strong>{interviewData?.jsonPos}</h2>
            <h2 className='text-lg'><strong>Job Description / Teck Stack: </strong>{interviewData?.jsonDes}</h2>
            <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jsonExp}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-2'>
              Enable video <strong>Web Cam</strong> and <strong>Microphone</strong> to start your AI Generated Mock Interview. It has 5 questions which you can answer and at last you will get the report on the basis of the answer.<br />
              <strong>NOTE: </strong>We never record your video, web cam access you can disable at any time if you want.
            </h2>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          {webcamEnable ? ( 
            <Webcam 
              onUserMedia={() => setWebcamEnable(true)}
              onUserMediaError={() => setWebcamEnable(false)}
              mirrored={true}
              style={{height:300, width:300}}
            /> 
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' /> 
              <div className='flex justify-center flex-row gap-5'>
                <Button onClick={() => setWebcamEnable(true)} className='w-[60%]'>Enable WebCam and Microphone</Button>
                <Button className='w-[40%]'>Start Interview</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
