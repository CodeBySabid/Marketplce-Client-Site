import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import '../../Button/button.css'

const Login = () => {
    const { sigIn, createUserUseGoogle } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleCreateUser = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!email && !password) {
            toast.error("Please fill in all field!");
            return;
        }
        if (!email) {
            toast.error("Please fill in the email field!");
            return;
        }
        if (!password) {
            toast.error("Please fill in the password field!");
            return;
        }
        sigIn(email, password)
            .then(() => {
                toast.success("Successfully LogIn!");
                navigate(location.state || '/')
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    toast.error('Email is incorrect!');
                }
                else if (error.code === "auth/wrong-password") {
                    toast.error("Password is incorrect!");
                }
                else if (error.code === "auth/invalid-email") {
                    toast.error("Email format is invalid!");
                }
                else if (error.code === "auth/invalid-credential") {
                    toast.error("Please check your password and email!");
                }
                else {
                    toast.error(error.message);
                }
            })


    }

    const handleGoogleLogin = () => {
        createUserUseGoogle()
            .then(() => {
                toast.success("Successfully Logged In with Google!");
                navigate(location.state || '/')
            })
            .catch(error => {
                if (error.code && error.code !== 'auth/popup-closed-by-user') {
                    toast.error("Google Login Failed!");
                }
                else {
                    toast.error(error.message);
                }
            })
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
                        <h3 className="link link-hover">Forgot password?</h3>
                        <button className="button w-[95%] mt-2">Login</button>
                    </form>
                    <h2 className='text-2xl font-semibold text-center py-1'>Or</h2>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
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