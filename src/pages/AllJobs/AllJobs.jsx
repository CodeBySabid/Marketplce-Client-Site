import JobData from '../../hooks/JobData';
import HomeJobs from '../Home/HomeJobs';

const AllJobs = () => {
    const {jobData} = JobData()
    console.log(jobData)
    return (
        <div>
            {
                // jobData.map(JobData => <HomeJobs key={JobData._id} JobData={JobData}></HomeJobs>)
            }
        </div>
    );
};

export default AllJobs;