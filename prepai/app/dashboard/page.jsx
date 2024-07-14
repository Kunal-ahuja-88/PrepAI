"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React , {useEffect,useState} from 'react'
import AddNewInterview from '../dashboard/_components/AddNewInterview'
import InterviewList from '../dashboard/_components/InterviewList'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { desc } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import { Progress } from '@/components/ui/progress'



function Dashboard() {

  const {user} = useUser();
  const [credit,setCredit] = useState();
  const [percentage,setPercentage]=useState(0);

  useEffect(()=> {
      user && GetInterviewList()
  },[user])
   

    const GetInterviewList = async() => {
      const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id))
       
      
      setCredit(result)
      console.log(result)
      const perc = (result.length/50)*100;
      setPercentage(perc)
  }
  
  
  return (
    <div className='p-10'>


   
    <div className='flex justify-between items-center'>
    <h2 className='font-bold text-3xl text-primary'>Dashboard</h2>
   
     <div className='flex flex-col justify-between items center'>
   <h2 className='text-red-600 font-semibold text-0.5xl my-2'>Credits used : {credit?.length} / 50 </h2>
    <Progress value={percentage}
          className="relative w-full h-2 bg-gray-200"
            />
    </div>

    </div>
 
    <h2 className='text-gray-500'>Create your AI Mock Interview </h2>

  <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
   <AddNewInterview />
  </div>

  {/*Previous Interview List*/ }
  <InterviewList/>
  </div>
 

    
  )
}

export default Dashboard
