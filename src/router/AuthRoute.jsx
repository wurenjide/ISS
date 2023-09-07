import {verifyLogin} from "../utils/auth";
import { Navigate, useLocation } from "react-router-dom";
//鉴权路由
const AuthRoute = (props) => {
    const location = useLocation();
    const login = verifyLogin();
    const {token,user } = login;
    console.log(token)
    user.career="超级管理员"
    if (!token) {
        return <Navigate to="/login" />
    }
    //如果已经登录
    if (location.pathname === "/*") {
        return <>{user.career == "管理员"||user.career=="超级管理员" ? <Navigate to="/admin" /> : <Navigate to="/user"/>}</>
    } else {
        return <>{props.children}</>
    }
}
export default AuthRoute;