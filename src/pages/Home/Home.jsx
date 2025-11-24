import React from 'react';
import HeroSection from './HeroSection';
import JobData from '../../hooks/JobData';
import HomeJobs from './HomeJobs';
import StaticSections from './StaticSections';


const Home = () => {
    const { jobData } = JobData();
    const sixJobData = jobData.slice(-6);
    return (
        <div>
            <HeroSection></HeroSection>
            <div className='mx-auto px-3 my-5 max-sm:max-w-[430px] max-w-[1200px] gap-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 max-[960px]:grid-cols-2 grid-cols-3'>
                {
                    sixJobData.map(sixjobs => <HomeJobs key={sixjobs._id} sixjobs={sixjobs}></HomeJobs>)
                }
            </div>
            <StaticSections></StaticSections>
        </div>
    );
};

export default Home;