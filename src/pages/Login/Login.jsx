import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const {user, createUserUseGoogle} = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleCreateUser = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserUseGoogle(email, password)
        
    }

    return (
         <div className="hero bg-base-200 min-h-screen px-1">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className='text-center text-4xl font-semibold'>Login</h1>
                    <form onSubmit={handleCreateUser} className="fieldset">
                        <label className="label">Email</label>
                        <input
                            name='email'
                            type="email"
                            className="input"
                            placeholder="Email"
                            />
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input pr-0"
                                placeholder="Password"
                            />
                            <span
                                className="absolute z-10 right-7 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={20} />
                                ) : (
                                    <FaEye size={20} />
                                )}
                            </span>
                        </div>
                        <Link to={`/Forgot?email=${encodeURIComponent(
                            document.querySelector("input[name='email']")?.value || ""
                        )}`}
                            className="link link-hover">
                            Forgot password?
                        </Link>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                    <h2 className='text-2xl font-semibold text-center py-1'>Or</h2>
                    <button className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='text-[14px] mt-2'>Dont’t Have An Account ?<Link className='text-red-600' to={'/register'}> Sign Up</Link></p>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;