import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";

const AddJob = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            category,
            summary,
            coverImage,
            postedBy: user.displayName,
            userEmail: user.email,
        };

        try {
            await axios.post("http://localhost:3000/users", jobData);
            toast.success("Job Posted Successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => navigate("/alljobs")
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-[90vh]">
            <div className="hero bg-base-200 min-h-screen px-1">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className='text-4xl font-semibold text-center'>Add A Job</h1>
                        <form className="fieldset" onSubmit={handleSubmit}>
                            <label className="label">Job Title</label>
                            <input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                className="input"
                                placeholder="Job Title"
                                required
                            />
                            <label className="label">Select Category</label>
                            <select
                                className="input"
                                onChange={(e) => setCategory(e.target.value)}
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
                                onChange={(e) => setSummary(e.target.value)}
                                required
                            />
                            <label className="label">Photo-URL</label>
                            <input
                                type="url"
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="input"
                                placeholder="Photo-URL"
                            />
                            <button className="button mt-2 w-[95%]">Add Job</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddJob;
