"use client"
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null)
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails()
    }, [params.interviewId])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))

            console.log('Fetched interview data:', result)

            if (result.length > 0) {
                setInterviewData(result[0])
            } else {
                console.error('No interview data found for the given ID')
            }
        } catch (error) {
            console.error('Error fetching interview data:', error)
        }
    }

    useEffect(() => {
        if (interviewData) {
            console.log('Interview data set:', interviewData)
        }
    }, [interviewData])

    return (
        <div className='my-10 '>
            <h2 className='font-bold text-2xl'>Let's get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col gap-5'>
        {interviewData ? (
                <div className='flex flex-col p-5 rounded-lg border my-7 gap-5 '>
                    <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData.jobPositon}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of experience : </strong>{interviewData.jobExperience}</h2>
                </div>
            ) : (
                <div>Loading interview data...</div>
            )}
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 '>
                <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                <h2 className='mt-3 text-yellow-500'>Enable WebCam and Microphone to record to start your AI generated Mock Interview, It has 10 questions which you can answer and at last you will get the report on the basis of your answers. Note : We never record your video and respect your privacy </h2>
            </div>
        </div>
       
        <div>
                {webCamEnabled ? <Webcam
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    mirrored={true}
                    style={{
                        height: 300,
                        width: 300
                    }}
                />
                    :
                    <>
                        <WebcamIcon className='h-72 w-full p-20 my-7 bg-secondary rounded-lg border' />
                        <Button  onClick={() => setWebCamEnabled(true)}>Enable Microphone and WebCam</Button>
                    </>
                }
            </div>
        </div>
        <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
       
        </div>
        
        </div>
    )
}

export default Interview