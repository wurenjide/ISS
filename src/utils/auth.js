//判断是否登录
export const verifyLogin = () => {
    let is_login = localStorage.getItem("is_login");
    let is_administrator = localStorage.getItem("is_administrator");
    return { is_login, is_administrator };
}

//退出登录
export const loginOut = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("is_administrator");
    localStorage.removeItem("is_login");
}