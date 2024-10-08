"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StopWatch from './_components/stopWatch';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)

    useEffect(() => {
        console.log('useEffect triggered');
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        console.log('GetInterviewDetails function called');
        if (!params || !params.interviewId) {
            console.error('params or params.interviewId is missing');
            return;
        }

        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            console.log('Fetched interview data:', result);

            if (result && result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResponse);
                console.log('Parsed JSON mock response:', jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            } else {
                console.log('No interview data found.');
            }
        } catch (error) {
            console.error('Error fetching interview data:', error);
        }
    };

    return (
        <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/*Questions */}
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
         
           {/* Stopwatch */}
           {/*Video , audio recording */}
                <div className='flex flex-col md:col-span-1'>
                <StopWatch  />
                  
         <RecordAnsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
         />
                </div>       
        </div>
        <div className='flex justify-end gap-6'> 
         {activeQuestionIndex>0 &&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
         {activeQuestionIndex!=mockInterviewQuestion?.length-1 
         && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

     {activeQuestionIndex === mockInterviewQuestion?.length - 1 && 
  <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
    <Button>End Interview</Button>
  </Link>}
  </div>
  </div>

    );
}

export default StartInterview;