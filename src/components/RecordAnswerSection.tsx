'use client'

import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from './ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'

const RecordAnswerSection = () => {
  const [isBrowserSupported, setIsBrowserSupported] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [userAns, setUserAns] = useState('');
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
    // Check if browser supports required APIs
    setIsBrowserSupported(
      typeof window !== 'undefined' &&
      navigator.mediaDevices &&
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    )
  }, [])

  useEffect(() => {
    results.map((result) => (
      setUserAns(prevAns => prevAns + result.transcript)
    ))
  }, [results])

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

  return (
    <div className="flex items-center justify-center flex-col">
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

      <Button className={`w-[50%] p-5 ${isRecording ? 'bg-red-500' : ''}`} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          { isRecording ? 
          <h2 className='flex flex-row justify-center items-center gap-2'>
            <Mic />
            <p>Stop Recording</p>
          </h2>
          : 
          'Record Answer'

          }
      </Button>

    </div>
  )
}

export default RecordAnswerSection