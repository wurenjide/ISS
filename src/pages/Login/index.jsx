import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message, Form, Input, Button, Checkbox, Radio, Space } from "antd";
import Passwd from "./Passwd";
import Note from "./Note";
const Login = () => {
    const [loginStyle,setLoginStyle]=useState("passwd");
    const navigate = useNavigate();
    useEffect(() => {
        const is_login = localStorage.getItem("is_login");
        const is_administrator = localStorage.getItem("is_administrator");
        if (is_login === "1") {
            is_administrator === "0" && navigate("/user");
            is_administrator === "1" && navigate("/admin");
        }
    }, [navigate]);
    const onChange=(value)=>{
        console.log(value.target.value)
        setLoginStyle(value.target.value)
    }

    return <div className={style['login-form-wrap']}>
        <h1>登录</h1>
        <Radio.Group onChange={onChange} defaultValue="passwd" style={{margin:"10px"}}>
            <Radio.Button value="passwd">密码登陆</Radio.Button>
            <Radio.Button value="note">短信登陆</Radio.Button>
        </Radio.Group>
        {React.createElement(loginStyle=="passwd"?Passwd:Note)}
    </div>
}
export default Login;