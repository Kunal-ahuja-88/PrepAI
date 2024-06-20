

"use client"
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import React, { useEffect,useState } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/utils/db'
import { desc } from 'drizzle-orm'
import InterviewCardItem from './InterviewCardItem'


function InterviewList() {

    const {user} = useUser()
    const [interviewList,setInterviewList] = useState([])


    useEffect(()=> {
      user&&GetInterviewList()
    },[user])

    const GetInterviewList = async() => {
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))
         
        console.log(result)
        setInterviewList(result)
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
    <h2 className='font-bold text-2xl '>Previous Mock Interview</h2>
    <div>
        {interviewList && interviewList.map((interview,index)=>(
            <InterviewCardItem 
            interview={interview}
            key={index} />
        ))}
    </div>
    </div>
  )
}

export default InterviewList
