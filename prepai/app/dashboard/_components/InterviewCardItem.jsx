import React from 'react'
import { Button } from '@/components/ui/button'
function InterviewCardItem({interview}) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
    <h2 className='font-bold text-primary'>
    {interview.jobPositon}
    </h2>
    <h2 className='text-sm text-gray-600'>{interview.jobExperience} Years of Experience</h2>
    <h2 className='text-xs text-gray-400'>Created at : {interview.createdAt}</h2>
    <div className='flex justify-between my-3 gap-5'>
     <Button size="sm" variant="outline" className='w-full'>Feedback</Button>
     <Button size="sm" className='w-full'>Start</Button>
    </div>
    </div>
  )
}

export default InterviewCardItem