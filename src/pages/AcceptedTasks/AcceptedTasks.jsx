import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const AcceptedTasks = () => {
    const { user } = useContext(AuthContext);
    const [acceptedJobs, setAcceptedJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/my-accepted?email=${user.email}`)
                .then(res => setAcceptedJobs(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/accepted/${id}`);
                setAcceptedJobs(acceptedJobs.filter(job => job._id !== id));
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your job has been deleted.",
                    icon: "success"
                });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete job.",
                    icon: "error"
                });
            }
        }
    };


    const handleDeleteDone = async (id) => {
        const result = await Swal.fire({
                    title: "Drag me!",
                    icon: "success",
                    draggable: true
                });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/accepted/${id}`);
                setAcceptedJobs(acceptedJobs.filter(job => job._id !== id));
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete job.",
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className='my-8 max-w-[1200px] mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {acceptedJobs.map(job => (
                <div key={job._id} className='border p-4 rounded-xl shadow-lg'>
                    <img src={job.coverImage} alt={job.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                    <h2 className='text-xl font-semibold'>{job.title}</h2>
                    <p>{job.summary}</p>
                    <p className='text-sm text-gray-500'>Category: {job.category}</p>
                    <p className='text-sm text-gray-500'>Accepted At: {new Date(job.acceptedAt).toLocaleString()}</p>
                    <div className='flex justify-between'>
                        <button onClick={() => handleDeleteDone(job._id)} className="btn-done">✅ DONE</button>
                        <button onClick={() => handleDelete(job._id)} className="btn-cancel">❌ CANCEL</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AcceptedTasks;
