import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const axiosSecure = axios.create({
    baseURL: 'https://market-place-server-site-one.vercel.app'
})

const useAxios = () => {
    const { user, sigOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        },
            (error) => {
                const statusCode = error.status;
                if (statusCode === 401 || statusCode === 403) {
                    sigOut()
                        .then(() => {
                            navigate('/login')
                        })
                }
                return Promise.reject(error);
            })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.request.eject(resInterceptor);
        }
    }, [user])
    return axiosSecure;
};

export default useAxios;