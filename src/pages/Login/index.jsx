import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message, Form, Input, Button, Checkbox, Radio, Space } from "antd";
import Passwd from "./Passwd";
import Note from "./Note";
const Login = () => {
    const [loginStyle, setLoginStyle] = useState("passwd");
    const [styleDe, setStyleDe] = useState();
    const navigate = useNavigate();

    useState(() => {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            setStyleDe("login-form-wrap-phone")
        } else {
            setStyleDe("login-form-wrap")
        }
    })
    useEffect(() => {
        const is_login = localStorage.getItem("is_login");
        const is_administrator = localStorage.getItem("is_administrator");
        if (is_login === "1") {
            is_administrator === "0" && navigate("/user");
            is_administrator === "1" && navigate("/admin");
        }
    }, [navigate]);

    const onChangeState = (value) => {
        console.log(value)
        setLoginStyle(value)
    }

    return <div className={style[styleDe]}>
        <h1 style={{color:"white"}}>LOGO</h1>
        {loginStyle == "passwd" ? <Passwd getState={onChangeState}/> : <Note getState={onChangeState}/>}
        {/* <a style={{color:"white",fontSize: "14px"}}>使用验证码登陆</a> */}
        {/* <Radio.Group onChange={onChange} defaultValue="passwd" style={{ margin: "10px" }}>
            <Radio.Button value="passwd">密码登陆</Radio.Button>
            <Radio.Button value="note">短信登陆</Radio.Button>
        </Radio.Group> */}
    </div >
}
export default Login;