import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => setJob(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/job/${id}`, job);

            toast.success("Job Add Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => navigate("/myjobs")
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-[90vh]">
            <div className="hero bg-base-200 min-h-screen px-1">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className='text-4xl font-semibold text-center'>Update Job</h1>
                        <form onSubmit={handleUpdate}>
                            <label className="label">Job Title</label>
                            <input
                                type="text"
                                className="input mb-2"
                                value={job.title || ""}
                                onChange={(e) => setJob({ ...job, title: e.target.value })}
                                placeholder="Job Title"
                            />
                            <label className="label">Select Category</label>
                            <select
                                type="text"
                                className="input"
                                value={job.category || ""}
                                onChange={(e) => setJob({ ...job, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                            <label className="label">Summary</label>
                            <textarea
                                placeholder="Summary"
                                className="input resize-y"
                                value={job.summary || ""}
                                onChange={(e) => setJob({ ...job, summary: e.target.value })}
                            />
                            <label className="label">Photo-URL</label>
                            <input
                                type="url"
                                value={job.coverImage || ""}
                                onChange={(e) => setJob({ ...job, coverImage: e.target.value })}
                                className="input"
                                placeholder="Photo-URL"
                            />
                            <button className="btn bg-blue-600 text-white w-full mt-2">Update Job</button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateJob;
