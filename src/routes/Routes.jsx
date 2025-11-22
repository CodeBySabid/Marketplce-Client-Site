import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MainLayout from "../layouts/MainLayout";

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