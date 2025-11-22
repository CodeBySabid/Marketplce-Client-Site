import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { createUser, createUserUseGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleCreateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.photoURL.value;
        const password = event.target.password.value;
        if (!name) {
            toast.error("Please fill in the name field!");
            return;
        }
        if (!email) {
            toast.error("Please fill in the email field!");
            return;
        }
        if (!photoURL) {
            toast.error("Please fill in the photoURL field!");
            return;
        }
        if (!password) {
            toast.error("Please fill in the password field!");
            return;
        }
        const Uppercase = /[A-Z]/;
        const Lowercase = /[a-z]/;
        if (!Uppercase.test(password)) {
            return toast.error("Password must have at least one uppercase letter!");
        }
        if (!Lowercase.test(password)) {
            return toast.error("Password must have at least one lowercase letter!");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long!");
        }
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        toast.success("Successfully Register");
                        navigate(location.state || '/')
                    })
                    .catch((error) => {
                        toast.error(error.massage)
                    })
            })
            .catch(error => {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("This email is already registered. Please login!");
                } else {
                    toast.error(error.message);
                }
            });
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
                    <h1 className='text-4xl font-semibold text-center'>Register</h1>
                    <form onSubmit={handleCreateUser} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" />
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Photo-URL</label>
                        <input type="url" name='photoURL' className="input" placeholder="Photo-URL" />
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input pr-10"
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
                        <button className="btn btn-neutral mt-4">Register</button>
                    </form>
                    <h2 className='text-2xl font-semibold text-center py-1'>Or</h2>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='text-[14px] mt-2'>Already have an account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;