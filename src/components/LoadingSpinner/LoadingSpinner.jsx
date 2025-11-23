import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <span className="loader"></span>
        </div>
    );
};

export default LoadingSpinner;