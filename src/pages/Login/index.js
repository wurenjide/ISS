import style from "./index.module.css";
const Login = () => {
    return <div className={style['login-form-wrap']}>
        <h1>Login In</h1>
        <form className={style['login-form']} action="POST" action="#">
            <label>
                <input type="text" name="account" required placeholder="Account" />
            </label>
            <label>
                <input type="password" name="password" required placeholder="Password" />
            </label>
            <input type="submit" value="Login" />
        </form>
    </div>
}
export default Login;