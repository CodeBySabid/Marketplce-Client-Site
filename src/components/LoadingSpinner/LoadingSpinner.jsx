import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <span class="loader"></span>
        </div>
    );
};

export default LoadingSpinner;