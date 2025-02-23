'use client'

import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from './ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnwer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

const RecordAnswerSection = ({ interviewQns, interviewAns, activeQnIdx }: { interviewQns: string[], interviewAns: string[], activeQnIdx: number }) => {
  const [isBrowserSupported, setIsBrowserSupported] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [userAns, setUserAns] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    setIsClient(true)
    setIsBrowserSupported(
      typeof window !== 'undefined' &&
      navigator.mediaDevices &&
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    )
  }, [])

  useEffect(() => {
    results.forEach((result) => {
      if (typeof result !== 'string' && 'transcript' in result) {
        setUserAns(prevAns => prevAns + result?.transcript);
      }
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAns.length > 10) {
      UpdateUserAns();
    }
    // if (userAns?.length < 10) {
    //   setLoading(false);
    //   toast('Error while saving your answer, Please record again');
    //   return;
    // }
  }, [userAns])


  if (!isClient) {
    return null
  }

  if (!isBrowserSupported) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">
          Your browser does not support the required features for recording.
          Please try using a modern browser like Chrome or Firefox.
        </p>
      </div>
    )
  }

  const StartStopRecord = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAns = async () => {
    console.log(userAns);
    setLoading(true);

    const feedbackPrompt = `Question: ${interviewQns[activeQnIdx]}, User Answer: ${userAns}, Depends on question and answer for given interview question, please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines in JSON format with rating field and feedback field`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const userEmail = user?.primaryEmailAddress?.emailAddress ?? '';
    if (!userEmail) {
      toast('Error: User email is missing.');
      return;
    }

    const resp = await db.insert(UserAnwer).values({
      question: interviewQns[activeQnIdx],
      corrctAns: interviewAns[activeQnIdx],
      userAns: userAns,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: userEmail,
      createdAt: moment().format('DD-MM-yyyy')
    });

    if (resp) {
      toast('User Answer Recorded Successfully');
    }
    setUserAns('');
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center flex-col my-4">
      <div className="flex flex-col justify-center items-center bg-primary rounded-lg my-10 p-10 relative">
        <div className="absolute z-0">
          <Image
            src="/webcam.png"
            alt="webcamera"
            height={200}
            width={200}
            priority
          />
        </div>
        <Webcam
          mirrored={true}
          className="z-10"
          style={{
            height: 300,
            width: '100%',
          }}
        />
      </div>

      <Button
        className={`w-[50%] p-5 border rounded-lg ${isRecording ? 'bg-red-500' : ''}`}
        onClick={StartStopRecord}
        disabled={loading}
      >
        {isRecording ?
          <h2 className='flex flex-row gap-2 p-2'>
            <StopCircle />
            Stop Recording
          </h2>
          :
          <h2 className='flex flex-row gap-2 p-2'>
            <Mic />
            Record Answer
          </h2>

        }
      </Button>

    </div>
  )
}

export default RecordAnswerSection