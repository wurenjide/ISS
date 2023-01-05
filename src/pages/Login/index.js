import style from "./index.module.scss";
import login from "../../api/common/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const is_login = localStorage.getItem("is_login");
        const is_administrator = localStorage.getItem("is_administrator");
        if (is_login === "1") {
            is_administrator === "0" && navigate("/user");
            is_administrator === "1" && navigate("/admin");
        }
    }, [navigate]);
    const toLogin = async (event) => {
        let form = new FormData(event.target);
        event.preventDefault();
        const res = await login(form);
        let { code, data: { is_administrator, uid }, message: tips } = res;
        if (code === 0) {
            message.error(tips);
            return;
        }
        //将用户信息存入本地
        localStorage.setItem("is_login", 1);
        localStorage.setItem("uid", uid);
        localStorage.setItem("is_administrator", is_administrator);
        message.success("登录成功!")
        if (is_administrator === "0") {
            navigate("/user");
        } else {
            navigate("/admin");
        }
    }
    return <div className={style['login-form-wrap']}>
        <h1>Login In</h1>
        <form className={style['login-form']}
            method="POST"
            action="#"
            onSubmit={toLogin}
        >
            <label>
                <input type="text" name="Uid" required placeholder="Account" />
            </label>
            <label>
                <input type="password" name="Passwd" required placeholder="Password" />
            </label>
            <label className={style['login-form-radio']}>
                <input type="radio" name="is_administrator" defaultChecked />
                <input type="radio" name="is_administrator" />
            </label>
            <input type="submit" value="Login" />
        </form>
    </div>
}
export default Login;