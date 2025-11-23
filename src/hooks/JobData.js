import axios from 'axios';
import React, { useEffect, useState } from 'react';

const JobData = () => {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, serError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios('http://localhost:3000/users')
        .then(data => setJobData(data.data))
        .catch(err => serError(err))
        .finally(() => setLoading(false))
    }, [])
    return {jobData, loading, error};
};

export default JobData;