import React from 'react';
import { useParams } from 'react-router';

const JobDetails = () => {
    const {_id} = useParams();
    console.log(_id)
    return (
        <div>
            this is jobDetails
        </div>
    );
};

export default JobDetails;