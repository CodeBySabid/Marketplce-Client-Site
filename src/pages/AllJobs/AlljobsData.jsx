import React from 'react';
import '../../ButtonAndCard/buttonandcard.css'
import { Link } from 'react-router';

const AlljobsData = ({ JobData }) => {
    const { _id } = JobData
    console.log(_id)
    return (
        <div data-aos="flip-down" className="cards">
            <div className="w-full h-full cards2">
                <img className='rounded-t-[20px] w-full h-[200px]' src={JobData.coverImage} alt="" />
                <div className='p-3 flex flex-col gap-2'>
                    <h1 className='text-[15px] text-sky-600'><span className='text-blue-600'>Requirements:</span> {JobData.title}</h1>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>ExperienceLeve</h1>
                        <h1 className='text-yellow-500'>{JobData.experienceLevel}</h1>
                    </div>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>PostedBy</h1>
                        <h1 className='text-green-600'> {JobData.postedBy}</h1>
                    </div>
                    <div className='flex justify-between text-[15px] text-gray-300'>
                        <h1 className='text-blue-600'>UserEmail</h1>
                        <h1 className='text-green-600'> {JobData.userEmail}</h1>
                    </div>
                </div>
                <Link to={`/jobdeteils/${_id}`} className='button mx-auto my-4 w-[200px] h-[50px]'>View Details</Link>
            </div>
        </div>
    );
};

export default AlljobsData;