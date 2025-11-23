import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MainLayout from "../layouts/MainLayout";
import AllJobs from "../pages/AllJobs/AllJobs";
import AcceptedTasks from "../pages/AcceptedTasks/AcceptedTasks";
import AddJob from "../pages/AddJob/AddJob";
import PrivateRouter from "./PrivateRouter";
import JobDetails from "../pages/JobDetails/jobDetails";

const routes = createBrowserRouter(
    [
        {
            path: "/",
            Component: MainLayout,
            children: [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: '/alljobs',
                    element: <PrivateRouter>
                        <AllJobs></AllJobs>
                    </PrivateRouter>
                },
                {
                    path: '/addjob',
                    element: <PrivateRouter>
                        <AddJob></AddJob>
                    </PrivateRouter>,
                },
                {
                    path: '/mytasks',
                    element: <PrivateRouter>
                        <AcceptedTasks></AcceptedTasks>
                    </PrivateRouter>,
                },
                {
                    path: '/jobdeteils/:_id',
                    element: <PrivateRouter>
                        <JobDetails></JobDetails>
                    </PrivateRouter>,
                },
                {
                    path: '/login',
                    Component: Login,
                },
                {
                    path: '/register',
                    Component: Register,
                },
            ]
        }
    ]
)

export default routes;