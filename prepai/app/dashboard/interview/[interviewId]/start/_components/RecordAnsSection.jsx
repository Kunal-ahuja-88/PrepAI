"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex }) {
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
    crossBrowser: true,
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  console.log({
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  });

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText(); // Call the function
      if (userAnswer.length < 10) {
        toast('Error while recording your answer, please record again');
        return;
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and user answer for the given interview questions, please provide a rating and feedback in JSON format with a rating field and feedback field in just 3-5 lines.`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      const rawResponse = await result.response.text();
      const mockJsonResponse = rawResponse.replace(/```json\n|\n```/g, '');
      console.log(mockJsonResponse);
      const jsonFeedbackResp = JSON.parse(mockJsonResponse);
    } else {
      startSpeechToText(); // Call the function
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <img src={'/webcam.png'} width={200} height={200} className='absolute' alt="Webcam placeholder" />
        <Webcam
          mirrored={true}
          style={{
            width: '100%',
            height: 300,
            zIndex: 10,
          }}
        />
      </div>
      <Button className='my-10' onClick={saveUserAnswer}>
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










/*
"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isRSCRequestCheck } from 'next/dist/server/base-server';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';

function RecordAnsSection({mockInterviewQuestion, activeQuestionIndex}) {
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

  
  console.log({
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  });

  const SaveUserAnswer = async() => {
    if(isRecording) {
      stopSpeechToText
      if(userAnswer.length<10) {
        toast('Error while recording your answer , please record again')
        return ;
      }

      const feedbackPrompt = "Question :"+mockInterviewQuestion[activeQuestionIndex]?.question+",User Answer:"+userAnswer+
      ", Depends on question and user answer for given interview questions "+"please give u answer and feedback as an area of improvement if any "+
      "in jsut 3-5 lines to improve it in JSON format with rating field and feedback field ";
     
      const result = await chatSession.sendMessage(feedbackPrompt)

      const rawResponse = await result.response.text();
          
          const mockJsonResponse = rawResponse.replace(/```json\n|\n```/g, '');
          console.log(mockJsonResponse)
          const JsonFeedbackResp = JSON.parse(mockJsonResponse)
    }

  
    else {
      startSpeechToText
    }
  }

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
      <Button className='my-10' onClick={SaveUserAnswer}>
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
*/
