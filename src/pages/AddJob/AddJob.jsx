import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";

const AddJob = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [coverImage, setCoverImage] = useState("");
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
            const res = await axios.post("http://localhost:3000/users", jobData);
            toast.success("Job Posted Successfully!")
        } catch (error) {
            toast.error(error)
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
                            <input type="text" onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Job Title" required />
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
                            <input type="url" onChange={(e) => setCoverImage(e.target.value)} className="input" placeholder="Photo-URL" />
                            <button className="button mt-2 w-[95%]">Add Job</button>
                        </form>
                        <h2 className='text-2xl font-semibold text-center py-1'>Or</h2>
                        <button className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p className='text-[14px] mt-2'>Already have an account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddJob;
