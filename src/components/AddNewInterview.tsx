'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { Interview } from '@/utils/schema';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPos, setJobPos] = useState('')
    const [jobDes, setJobDes] = useState('')
    const [jobExp, setJobExp] = useState('')
    const [loading, setLoading] = useState(false)
    //const [jsonResponse, setJsonResponse] = useState<object[]>([])
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault()
        console.log(jobPos, jobDes, jobExp)

        const InputPrompt = "Job Position:" + jobPos + "; Job Description:" + jobDes + "; Job Experience:" + jobExp + ". Depending on this information give me 5 interview questions with answer in json format"
        const resp = await chatSession.sendMessage(InputPrompt)
        const result = (resp.response.text()).replace('```json','').replace('```','');
        const jsonResult = JSON.parse(result);
        console.log(jsonResult);
        //setJsonResponse(jsonResult);
        setLoading(false)
        if (result) {
            const dbVal = await db.insert(Interview).values({
                mockId: uuidv4(),
                jsonResp: JSON.stringify(jsonResult),
                jsonPos: jobPos,
                jsonDes: jobDes,
                jsonExp: jobExp,
                createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
                createdAt: moment().format('DD-MM-yyyy'),
            }).returning({ mockId: Interview.mockId });
            console.log("Inserted ID: ", dbVal);
            
            if (dbVal) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + dbVal[0]?.mockId)
            }
        } else {
            console.log('Error Inserting Data');
        }
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl'>Tell us more about your Job Interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2 className='text-grey-500'>Add Details about your Job</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job Role/Position</label>
                                        <Input placeholder='Ex. Full Stack Developer' required
                                            onChange={(event) => setJobPos(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description / Tech Stack (in short)</label>
                                        <Textarea placeholder='Ex. NextJS, NodeJS, PostgreSQL, etc.,.' required
                                            onChange={(event) => setJobDes(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of Experience</label>
                                        <Input placeholder='Ex. 5' type='number' max={75} required
                                            onChange={(event) => setJobExp(event.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating...
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview