//判断是否登录
import qs from "qs"
export const verifyLogin = () => {
    let token = localStorage.getItem("token");
    let user =qs.parse(localStorage.getItem("user")) ;
    return { token, user };
}

//退出登录
export const loginOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}