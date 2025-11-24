import React from 'react';
import './homejobs.css'
import { Link } from 'react-router';
import '../../ButtonAndCard/buttonandcard.css'

const HomeJobs = ({ sixjobs }) => {
    const { _id } = sixjobs
    return (
        <div data-aos="flip-down" className="cards">
            <div className="w-full h-full cards2">
                <img className='rounded-t-[20px] w-full h-[200px]' src={sixjobs.coverImage} alt="" />
                <div className='p-3 flex flex-col gap-2'>
                    <h1 className='text-[15px] text-sky-600'><span className='text-blue-600'>Requirements:</span> {sixjobs.title}</h1>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>ExperienceLeve</h1>
                        <h1 className='text-yellow-500'>{sixjobs.experienceLevel}</h1>
                    </div>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>PostedBy</h1>
                        <h1 className='text-green-600'> {sixjobs.postedBy}</h1>
                    </div>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>UserEmail</h1>
                        <h1 className='text-green-600'> {sixjobs.userEmail}</h1>
                    </div>
                </div>
                <Link to={`/jobdeteils/${_id}`} className='button mx-auto my-4 w-[200px] h-[50px]'>View Details</Link>
            </div>
        </div>
    );
};

export default HomeJobs;