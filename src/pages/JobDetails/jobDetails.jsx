import React from 'react';
import { useParams } from 'react-router';
import JobData from '../../hooks/JobData';
import Threads from '../JobDetails/Backgroundanimation/GhostCursor';

const JobDetails = () => {
    const { _id } = useParams();
    const { jobData } = JobData();
    const jobDataByIn = jobData.find(j => j._id === _id)
    const { budget, category, currency, experienceLevel, jobType, postedBy, skillsRequired, status, summary, title, userEmail } = jobDataByIn || {}
    console.log(jobDataByIn);
    return (
        <div className='my-8 p-2.5'>
            <div style={{ width: '100%', height: '70vh', position: 'relative' }}>
                <Threads
                    amplitude={1}
                    distance={0}
                    enableMouseInteraction={true}
                />
                <div className='absolute z-20 w-full h-full top-0'>
                    <h1 className='text-center text-[#00eeffbe] text-4xl font-semibold'>{title}</h1>
                    <h1 className='text-center text-4xl font-semibold'>{summary}</h1>
                    <hr className='w-[95vw] mx-auto mt-2 text-gray-300' />
                    <div>
                        <h1 className='text-2xl text-center underline font-semibold text-green-600'>Job Informations</h1>
                        <div className='text-xl flex justify-around'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-[#fde508]'>Category : <span className='text-blue-500'>{category}</span></h2>
                                <h2 className='text-[#fde508]'>JobType : <span className='text-blue-500'> {jobType}</span></h2>
                                <h2 className='text-[#fde508]'>Status : <p className={`font-bold inline ${status === "closed"
                                    ? "text-red-600 bg-red-200 rounded-2xl px-1"
                                    : status === "open"
                                        ? "text-green-600 bg-green-200 rounded-2xl px-1"
                                        : "text-white"
                                    }`}
                                > {status} </p></h2>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-[#fde508]'>Budget : <span className='text-blue-500'> {budget}</span></h2>
                                <h2 className='text-[#fde508]'>Currency : <span className='text-blue-500'> {currency}</span></h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl text-center underline font-semibold text-green-600'>Requirements</h1>
                        <div className='text-xl items-center flex justify-around'>
                            <h2 className='text-[#fde508]'>
                                SkillsRequired :
                                <div className="flex flex-col gap-2 flex-wrap">
                                    {skillsRequired?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </h2>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-[#fde508]'>ExperienceLevel : <span className='text-blue-500'> {experienceLevel}</span></h2>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>

        </div>
    );
};

export default JobDetails;