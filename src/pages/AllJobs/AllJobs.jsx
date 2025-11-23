import JobData from '../../hooks/JobData';
import AlljobsData from './AlljobsData';

const AllJobs = () => {
    const { jobData } = JobData();
    return (
        <div>
            <h1>{jobData.length}</h1>
            <div className='mx-auto px-3 my-5 max-sm:max-w-[430px] max-w-[1200px] gap-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 max-[960px]:grid-cols-2 grid-cols-3'>
                {
                    jobData.map(JobData => <AlljobsData key={JobData._id} JobData={JobData}></AlljobsData>)
                }
            </div>
        </div>
    );
};

export default AllJobs;