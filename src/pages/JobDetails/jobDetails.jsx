import React, { useContext } from 'react';
import { useParams } from 'react-router';
import JobData from '../../hooks/JobData';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const JobDetails = () => {
    const { _id } = useParams();
    const { jobData } = JobData();
    const jobDataByIn = jobData.find(j => j._id === _id)
    const { budget, category, currency, experienceLevel, jobType, postedBy, skillsRequired, status, summary, title, userEmail, coverImage } = jobDataByIn || {}
    const { user } = useContext(AuthContext);
    const handleAccept = async () => {
        const acceptedJob = { jobId: _id, title, summary, category, experienceLevel, jobType, postedBy, employerEmail: user.email, acceptedBy: user.email, acceptedAt: new Date() }
        try {
            const response = await axios.post("http://localhost:3000/accepted", acceptedJob);
            console.log(response.data);
            alert("Job Accepted Successfully!");
        } catch (error) {
            console.error(error);
            alert("Error accepting job");
        }
    }
    return (
        <div className='my-8 p-2.5'>
            <div className='w-full h-full p-4 border rounded-2xl max-w-[1300px] '>
                <img className='mx-auto mb-4 w-[400px] h-[200px] max-xl:w-[40vw] max-lg:h-[20vw] max-sm:w-[55vw] max-sm:h-[30vw]' src={coverImage} alt="" />
                <h1 className='text-center text-[#00eeffbe] text-4xl font-semibold max-sm:text-[5vw]'>{title}</h1>
                <h1 className='text-center text-4xl font-semibold max-lg:text-3xl max-sm:text-[4.2vw]'>{summary}</h1>
                <hr className='w-[95vw] max-lg:w-[90vw] max-sm:w-[80vw] mx-auto mt-2 text-gray-300' />
                <div>
                    <h1 className='text-2xl max-sm:text-[4.2vw] text-center underline font-semibold text-green-600'>Job Informations</h1>
                    <div className='text-xl flex justify-around max-lg:justify-between max-sm:flex-col max-sm:text-center'>
                        <div className='flex flex-col gap-2'>
                            <h2 className=' max-sm:text-[4.2vw]'>Category : <span>{category}</span></h2>
                            <h2 className=' max-sm:text-[4.2vw]'>JobType : <span> {jobType}</span></h2>
                            <h2 className=' max-sm:text-[4.2vw]'>Status : <p className={`font-bold inline ${status === "closed"
                                ? "text-red-600 bg-red-200 rounded-2xl px-1"
                                : status === "open"
                                    ? "text-green-600 bg-green-200 rounded-2xl px-1"
                                    : "text-white"
                                }`}
                            > {status} </p></h2>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className=' max-sm:text-[4.2vw]'>Budget : <span> {budget}</span></h2>
                            <h2 className=' max-sm:text-[4.2vw]'>Currency : <span> {currency}</span></h2>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl  max-sm:text-[4.2vw] text-center underline font-semibold max-sm:mb-2 text-green-600'>Requirements</h1>
                    <div className='text-xl items-center flex justify-around max-lg:justify-between max-sm:flex-col max-sm:text-center'>
                        <h2 className=' max-sm:text-[4.2vw]'>
                            SkillsRequired :
                            <div className="flex flex-col gap-2 flex-wrap">
                                {skillsRequired?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-200 text-black px-2 py-1 rounded-lg text-sm  max-sm:text-[4.2vw]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </h2>
                        <div className='flex flex-col gap-2'>
                            <h2 className=' max-sm:text-[4.2vw]'>ExperienceLevel : <span> {experienceLevel}</span></h2>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl  max-sm:text-[4.2vw] text-center underline font-semibold text-green-600'>Informations</h1>
                    <div className='text-xl flex justify-around max-lg:justify-between max-sm:flex-col max-sm:text-center'>
                        <h2 className=' max-sm:text-[4.2vw]'>postedBy : <span> {postedBy}</span></h2>
                        <h2 className=' max-sm:text-[4.2vw]'>Email : <span> {userEmail}</span></h2>
                    </div>
                </div>
                <button onClick={handleAccept} className='button mx-auto mt-5'>Accept</button>
            </div>
        </div>
    );
};

export default JobDetails;