
"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { Mic, StopCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';


function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState()

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

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, [userAnswer, isRecording]);

  console.log({
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  });

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

    }

    else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswerInDb = async () => {

    console.log(userAnswer)
    setLoading(true)
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and user answer for the given interview questions, please provide a rating and feedback in JSON format with a rating field and feedback field in just 3-5 lines.`;

    const result = await chatSession.sendMessage(feedbackPrompt);

    const rawResponse = await result.response.text();
    const mockJsonResponse = rawResponse.replace(/```json\n|\n```/g, '');
    console.log(mockJsonResponse);
    const jsonFeedbackResp = JSON.parse(mockJsonResponse);

    const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      })
    if (resp) {
      toast('User answer recorded successfully')
    }
    setUserAnswer('')
    setLoading(false)

  }
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
      <Button
        disabled={loading}
        variant="outline" className='my-10'
        onClick={startStopRecording}>

        {isRecording ?
          <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
            <StopCircle /> Stop Recording
          </h2>
          :
          <h2 className='text-primary animate-pulse flex gap-2 items-center'>
            <Mic /> Record Answer
          </h2>}

      </Button>
    </div>
  );
}

export default RecordAnsSection;










