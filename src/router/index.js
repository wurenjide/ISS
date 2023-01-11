import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import UserHome from "../pages/User/Home";
import PageNotFound from "../pages/PageNotFound";
import Admin from "../pages/Admin";
import AttMan from "../pages/Admin/AttMan";
import AdminHome from "../pages/Admin/Home";
import Dept from "../pages/Admin/Dept";
import LeaveMan from "../pages/Admin/LeaveMan";
import PerMan from "../pages/Admin/PerMan";
import ProMan from "../pages/Admin/ProMan";
import Role from "../pages/Admin/Role";
import Salary from "../pages/Admin/Salary";
import Staff from "../pages/Admin/Staff";
import TripMan from "../pages/Admin/TripMan";

//路由文件
const routes = [
    {
        path: "/",
        element: <AuthRoute />,
    },
    {
        path: "/user",
        element: <AuthRoute>
            <UserHome />
        </AuthRoute>
    },
    {
        path: "/admin",
        element: <AuthRoute>
            <Admin />
        </AuthRoute>,
        children:[
            {
                path:"/admin/attman",
                element:<AttMan/>
            },
            {
                path:"/admin/dept",
                element:<Dept/>
            },
            {
                path:"/admin/home",
                element:<AdminHome/>
            },
            {
                path:"/admin/leaveman",
                element:<LeaveMan/>
            },
            {
                path:"/admin/perman",
                element:<PerMan/>
            },
            {
                path:"/admin/proman",
                element:<ProMan/>
            },
            {
                path:"/admin/role",
                element:<Role/>
            },
            {
                path:"/admin/salary",
                element:<Salary/>
            },
            {
                path:"/admin/staff",
                element:<Staff/>
            },
            {
                path:"/admin/tripMan",
                element:<TripMan/>
            }

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/Admin",
        element: <Admin />,
        children:[
            {
                path:"/Admin/AttMan",
                element:<AttMan/>
            },
            {
                path:"/Admin/Dept",
                element:<Dept/>
            },
            {
                path:"/Admin/Home",
                element:<AdminHome/>
            },
            {
                path:"/Admin/LeaveMan",
                element:<LeaveMan/>
            },
            {
                path:"/Admin/PerMan",
                element:<PerMan/>
            },
            {
                path:"/Admin/ProMan",
                element:<ProMan/>
            },
            {
                path:"/Admin/Role",
                element:<Role/>
            },
            {
                path:"/Admin/Salary",
                element:<Salary/>
            },
            {
                path:"/Admin/Staff",
                element:<Staff/>
            },
            {
                path:"/Admin/TripMan",
                element:<TripMan/>
            }

        ]
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]
export default routes;