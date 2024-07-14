"use client"
import React, { useEffect, useState , useRef } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { UserAnswer } from '@/utils/schema'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Download } from 'lucide-react';
import html2canvas from "html2canvas"
import jsPDF from "jspdf"


function Feedback({ params }) {

    const pdfRef = useRef();
   

    const downloadPdf  = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imagData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p','mm','a4',true)
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight)
            const imgX = (pdfWidth-imgWidth*ratio)/2;
            const imgY = 30;
            pdf.addImage(imagData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio)
            pdf.save("feedback.pdf")
          
        })
    }
   


    const [feedbackList, setFeedbackList] = useState([])
    const [totalRating, setTotalRating] = useState(0)
    const totalQuestions = 10
    const router = useRouter()

    useEffect(() => {
        GetFeedback()
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)

        console.log(result)
        setFeedbackList(result)
      
    }
   

    return (
        <>
        <div className='p-10' ref={pdfRef}>
            {
                feedbackList.length == 0 ?
                    <h2 className='font-bold text-xl text-gray-500'>No interview record feedback found</h2>
                    :
                    <>
                        <h2 className='text-3xl font-bold text-green-500'>Congratulations !</h2>
                        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

                        <h2 className='text-sm text-gray-500'>Find below your answer, possible answers and feedback for improvement</h2>
                        {feedbackList && feedbackList.map((item, index) => (
                            <Collapsible key={index} className='mt-7'>
                                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-center my-2 text-left gap-10'>
                                    {item.question} <ChevronsUpDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : {item.rating}</strong></h2>
                                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : {item.userAns}</strong></h2>
                                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Possible Answer : {item.correctAns}</strong></h2>
                                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback : {item.feedback}</strong></h2>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </>
            }
           
        </div>

          <div className="flex items-center space-x-4">
                    <Button className="text-primary bg-white border border-primary hover:bg-primary hover:text-white px-4 py-2 my-3" onClick={() => router.replace('/dashboard')}>Go Home</Button>
                    <Button onClick={downloadPdf} className="text-red-500 bg-white border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2">
                        <Download /> Download 
                    </Button>
                </div>
                </>
           
    )
}

export default Feedback









/*
"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { UserAnswer } from '@/utils/schema'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({ params }) {

    const [feedbackList, setFeedbackList] = useState([])
    const router = useRouter()

    useEffect(() => {
        GetFeedback()
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)

        console.log(result)
        setFeedbackList(result)

    }
    return (
        <div className='p-10'>
           

            {
                feedbackList?.length==0 ? 
            <h2 className='font-bold text-xl text-gray-500'>No interview record feedback found</h2>
            :
            <>
            <h2 className='text-3xl font-bold text-green-500'>Congratulations !</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
            <h2 className='text-primary text-lg my-3'>Your overall rating : <strong>7/10</strong></h2>

            <h2 className='text-sm text-gray-500'>Find below your answers and possible answers , your answer and feedback for improvement</h2>
            {feedbackList && feedbackList.map((item, index) => (
                <Collapsible key={index} className='mt-7'>
                    <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-center my-2 text-left gap-10'>
                        {item.question} <ChevronsUpDown />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : {item.rating}</strong></h2>
                            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : {item.userAns}</strong></h2>
                            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Possible Answer : {item.correctAns}</strong></h2>
                            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback :  {item.feedback}</strong></h2>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

            ))}
            
            </>
          
            }

            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback
*/