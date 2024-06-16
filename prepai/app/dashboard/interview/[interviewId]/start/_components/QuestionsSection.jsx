import React from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg '>
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
    {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=> (
        <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? 'bg-primary text-white' : ''
              }`}
            >Question #{index+1}</h2>
    ))}
    </div>
    <h2 className='my-5'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
    </div>
  )
}

export default QuestionsSection