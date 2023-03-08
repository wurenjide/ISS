import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import UserHome from "../pages/User/Home";
import PageNotFound from "../pages/PageNotFound";
import Admin from "../pages/Admin";
import AttMan from "../pages/Admin/AttMan";
import AdminHome from "../pages/Admin/Home";
import Store from "../pages/Admin/Store";
import LeaveMan from "../pages/Admin/LeaveMan";
import Raudit from "../pages/Admin/Raudit";
import ScheduleMan from "../pages/Admin/ScheduleMan";
import Staff from "../pages/Admin/Staff";
import Leave from "../pages/User/Leave";
import User from "../pages/User";
import Personal from "../pages/User/Personal";
import Schedule from "../pages/User/Schedule";
import ScheduleRule from "../pages/Admin/ScheduleRule";
import Rule from "../pages/User/Rule";
import Register from "../pages/Register";
import PersonAd from "../pages/Admin/PersonAd";
import Suggest from "../pages/User/Suggest";

//路由文件
const routes = [
    {
        path: "/",
        element: <AuthRoute />,
    },
    {
        path: "/user",
        element: <AuthRoute>
            <User />
        </AuthRoute>,
        children:[
            {
                path:"/user/home",
                element:<UserHome/>,
            },
            {
                path:"/user/leave",
                element:<Leave/>,
            },
            {
                path:"/user/personal",
                element:<Personal/>,
            },
            {
                path:"/user/schedule",
                element:<Schedule/>,
            },
            {
                path:"/user/rule",
                element:<Rule/>
            },
            {
                path:"/user/suggest",
                element:<Suggest/>,
            },
        ],
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
                path:"/admin/store",
                element:<Store/>
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
                path:"/admin/raudit",
                element:<Raudit/>
            },
            {
                path:"/admin/scheduleman",
                element:<ScheduleMan/>
            },
            {
                path:"/admin/staff",
                element:<Staff/>,
            },
            {
                path:"/admin/schedulerule",
                element:<ScheduleRule/>,
            },
            {
                path:"/admin/personad",
                element:<PersonAd/>
            }

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]
export default routes;