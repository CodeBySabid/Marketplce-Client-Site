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

            <div className='mx-auto px-3 my-5 max-sm:max-w-[430px] max-w-[1200px] gap-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 max-[960px]:grid-cols-2 grid-cols-3'>
                {jobs.map(job => (
                    <div key={job._id} className="p-4 border rounded shadow">
                        <img src={job.coverImage} className="h-40 w-full object-cover" />
                        <h2 className="text-xl font-bold mt-2">{job.title}</h2>
                        <p>{job.category}</p>
                        <p>{job.summary}</p>

                        <div className="flex justify-between mt-3">
                            <Link
                                to={`/updatejob/${job._id}`}
                                className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group"
                            >
                                <span
                                    className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"
                                ></span>
                                <span className="absolute bottom-0 left-0 h-full -ml-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-auto h-full opacity-100 object-stretch"
                                        viewBox="0 0 487 487"
                                    >
                                        <path
                                            fillOpacity=".1"
                                            fillRule="nonzero"
                                            fill="#FFF"
                                            d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="object-cover w-full h-full"
                                        viewBox="0 0 487 487"
                                    >
                                        <path
                                            fillOpacity=".1"
                                            fillRule="nonzero"
                                            fill="#FFF"
                                            d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                                        ></path>
                                    </svg>
                                </span>
                                <span
                                    className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
                                ></span>
                                <span className="relative text-base font-semibold">UpdateJob</span>
                            </Link>
                            <button
                                onClick={() => handleDelete(job._id)}
                                className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                            >
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
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
