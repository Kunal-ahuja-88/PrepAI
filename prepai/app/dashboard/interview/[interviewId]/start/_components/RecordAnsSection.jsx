"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';

function RecordAnsSection() {
  const [userAnswer, setUserAnswer] = useState('');

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    crossBrowser:true
  });

  useEffect(() => {
    results.forEach((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ));
  }, [results]);

  // Debug logging
  console.log({
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  });

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <img src={'/webcam.png'} width={200} height={200} className='absolute' alt="Webcam placeholder"/>
        <Webcam 
          mirrored={true}
          style={{
            width:'100%',
            height:300,
            zIndex:10,
          }}
        />
      </div>
      <Button className='my-10' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? (
          <h2 className='text-red-600 flex- gap-2'>
            <Mic /> Recording...
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
    </div>
  );
}

export default RecordAnsSection;
