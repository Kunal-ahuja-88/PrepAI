"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading,setLoading]=useState(false)
    const [jsonResponse,setJsonResponse]=useState([]);
     
    const router=useRouter()

    const {user} = useUser();


    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, please provide 10 interview questions with answers in JSON format. Each item should have a "question" and an "answer" field.`;

          const result = await chatSession.sendMessage(InputPrompt);
          const rawResponse = await result.response.text();
          
          const mockJsonResponse = rawResponse.replace(/```json\n|\n```/g, '');
          console.log(mockJsonResponse)

          setJsonResponse(mockJsonResponse)
          
          if(mockJsonResponse) {
            const resp = await db.insert(MockInterview)
            .values({
            mockId:uuidv4(),
            jsonMockResponse:mockJsonResponse,
            jobPositon:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId})
  
            console.log("Inserted ID",resp)
            if(resp) {
                setOpenDialog(false)
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
          }

          else {
            console.log("ERROR")
          }
          
          setLoading(false);
  }


    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-100 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about the job you are interviewing for</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about the job position/role, job description, and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job Role/Job Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            value={jobPosition}
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='mt-7 my-3'>
                                        <label>Job Description</label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, Springboot"
                                            required
                                            value={jobDesc}
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Experience (in years)</label>
                                        <Input
                                            placeholder="Ex. 3"
                                            type="number"
                                            max="50"
                                            required
                                            value={jobExperience}
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-6 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                    {loading?
                                    <>
                                    <LoaderCircle className='animate-spin' />Generating your response
                                    </> : 'Start Interview'
                                    }
                                   </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
