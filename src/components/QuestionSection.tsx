import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

const QuestionSection = ({ interviewQns, activeQnIdx }: { interviewQns: string[], activeQnIdx: number }) => {
  const textToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech.')
    }
  }

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {interviewQns.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300 
            ${activeQnIdx === index ? 'bg-black text-white' : 'bg-secondary text-secondary-foreground'}`}
          >
            Question #{index + 1}
          </h2>


        ))}
      </div>
      <h2 className='mt-12 mb-4 text-md md:text-lg'>{interviewQns[activeQnIdx]}</h2>
      <Volume2 className='cursor-pointer' onClick={() => textToSpeech(interviewQns[activeQnIdx])} />
      <div className='mt-16 border rounded-lg p-5 bg-yellow-100 border-yellow-300'>
        <h2 className='flex gap-2 items-center'>
          <Lightbulb />
          <strong>NOTE: </strong>
        </h2>
        <h2 className='text-md text-primary my-5'>Click on Record Answer when you want to answer the question. At the end of the interview we will give you the feedback along with correct answer for each question and your answer to compare it.</h2>
      </div>
    </div>
  );
};

export default QuestionSection;
