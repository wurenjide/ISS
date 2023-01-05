import {verifyLogin} from "../utils/auth";
import { Navigate, useLocation } from "react-router-dom";
//鉴权路由
const AuthRoute = (props) => {
    const location = useLocation();
    const login = verifyLogin();
    const {is_administrator,is_login } = login;
    if (is_login!=="1") {
        return <Navigate to="/login" />
    }
    //如果已经登录
    if (location.pathname === "/") {
        return <>{is_administrator === "1" ? <Navigate to="/admin" /> : <Navigate to="/user"/>}</>
    } else {
        return <>{props.children}</>
    }
}
export default AuthRoute;