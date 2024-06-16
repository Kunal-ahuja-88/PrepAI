"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionsSection from './_components/QuestionsSection';

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
        <div className='grid grid-cols-1 md:grid-cols-2'>
        {/*Questions */}
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />


        {/*Video , audio recording */}

        </div>
        </div>
    );
}

export default StartInterview;
