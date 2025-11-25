import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AcceptedTasks = () => {
    const { user } = useContext(AuthContext);
    const [acceptedJobs, setAcceptedJobs] = useState([]);

    useEffect(() => {
        if (!user?.email) return;
        axios.get(`http://localhost:3000/my-accepted?email=${user.email}`)
            .then(res => setAcceptedJobs(res.data))
            .catch(err => console.log(err))
    }, [user?.email]);
    if (acceptedJobs.length === 0)
        return <p className="text-center mt-10">You have not accepted any jobs yet.</p>;
console.log(acceptedJobs)
    return (
        <div className='my-8 max-w-[1200px] mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {acceptedJobs.map(job => (
                <div key={job._id} className='border p-4 rounded-xl shadow-lg'>
                    <img src={job.coverImage} alt={job.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                    <h2 className='text-xl font-semibold'>{job.title}</h2>
                    <p>{job.summary}</p>
                    <p className='text-sm text-gray-500'>Category: {job.category}</p>
                    <p className='text-sm text-gray-500'>Accepted At: {new Date(job.acceptedAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default AcceptedTasks;
