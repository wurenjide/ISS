import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import UserHome from "../pages/User/Home";
import AdminHome from "../pages/Admin/Home";
import PageNotFound from "../pages/PageNotFound";
import System from "../pages/System";
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
            <AdminHome />
        </AuthRoute>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/System",
        element: <System />
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]
export default routes;