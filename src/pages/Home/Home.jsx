import React from 'react';
import HeroSection from './HeroSection';
import JobData from '../../hooks/JobData';
import HomeJobs from './HomeJobs';


const Home = () => {
    const { jobData } = JobData();
    const sixJobData = jobData.slice(0, 6);
    console.log(jobData)
    return (
        <div>
            <HeroSection></HeroSection>
            {
                sixJobData.map(sixjobs => <HomeJobs key={sixjobs._id} sixjobs={sixjobs}></HomeJobs>)
            }
        </div>
    );
};

export default Home;