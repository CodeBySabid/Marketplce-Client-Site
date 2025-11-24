import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/my-jobs?email=${user.email}`)
                .then(res => setJobs(res.data))
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
                await axios.delete(`http://localhost:3000/job/${id}`);
                setJobs(jobs.filter(job => job._id !== id));
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

    return (
        <div className="mt-4">
            <h1 className="text-3xl text-center">My Posted Jobs ({jobs.length})</h1>

            <div className="grid grid-cols-3 gap-5 p-4">
                {jobs.map(job => (
                    <div key={job._id} className="p-4 border rounded shadow">
                        <img src={job.coverImage} className="h-40 w-full object-cover" />
                        <h2 className="text-xl font-bold mt-2">{job.title}</h2>
                        <p>{job.category}</p>
                        <p>{job.summary}</p>

                        <div className="flex justify-between mt-3">
                            <Link
                                className="btn btn-sm bg-blue-500 text-white"
                            >
                                Edit Job
                            </Link>
                            <button
                                onClick={() => handleDelete(job._id)}
                                class="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="h-5 w-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>

                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyJobs;
