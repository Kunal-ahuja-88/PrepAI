"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam';

function RecordAnsSection() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

 

  return (
    <div className='flex flex-col justify-between items-center'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <img src={'/webcam.png'} width={200} height={200} className='absolute' alt="Webcam placeholder"/>
        <Webcam
          mirrored={true}
        
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button className='my-10'>Record Answer</Button>
    </div>
  )
}

export default RecordAnsSection
