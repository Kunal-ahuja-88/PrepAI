"use client"
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'

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
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's get Started</h2>
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
                        <Button onClick={() => setWebCamEnabled(true)}>Enable Microphone and WebCam</Button>
                    </>
                }
            </div>
            {interviewData ? (
                <div className='flex flex-col my-5'>
                    <h2 className='text-lg'><strong>Job Role/Job Position </strong>{interviewData.jobPositon}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack </strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of experience</strong>{interviewData.jobExperience}</h2>
                </div>
            ) : (
                <div>Loading interview data...</div>
            )}
        </div>
    )
}

export default Interview











/*
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null)
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails()
    }, [])

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

    return (
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's get Started</h2>
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
                        <Button onClick={() => setWebCamEnabled(true)}>Enable Microphone and WebCam</Button>
                    </>
                }
            </div>
            {interviewData ? (
                <div className='flex flex-col my-5'>
                    <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years of experience : </strong>{interviewData.jobExperience}</h2>
                </div>
            ) : (
                <div>Loading interview data...</div>
            )}
        </div>
    )
}

export default Interview

*/






/*
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'

function Interview({params}) {
    
    const [interviewData,setInterviewData]=useState()
    const [webCamEnabled,setWebCamEnabled]=useState()
    useEffect(()=> {
        console.log(params.interviewId)
        GetInterviewDetails()
    },[])

    const GetInterviewDetails = async() => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        console.log(result)

        setInterviewData(result[0])
    }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
    <h2 className='font-bold text-2xl'>Let's get Started</h2>
    <div>
    {webCamEnabled ? <Webcam 
         onUserMedia={()=>setWebCamEnabled(true)}
         onUserMediaError={()=>setWebCamEnabled(false)}
         mirrored={true}
        style={{
            height:300,
            width:300
        }}
    />
    :  
    <>
    <WebcamIcon className='h-72 w-full p-20 my-7 bg-secondary rounded-lg border' />
    <Button onClick={()=>setWebCamEnabled(true)} >Enable Microphone and WebCam</Button>
    </> 
  
    }
    </div>
    <div className='flex flex-col my-5'>
      <h2 className='text-lg'><strong>Job Role/Job Position </strong>{interviewData.jobPosition}</h2>
      <h2 className='text-lg'><strong>Job Description/Tech Stack </strong>{interviewData.jobDesc}</h2>
      <h2 className='text-lg'><strong>Years of experience</strong>{interviewData.jobExperience}</h2>
    </div>
    </div>
  )
}

export default Interview
*/