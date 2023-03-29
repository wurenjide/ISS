import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { message, Form, Input, Button, Checkbox, Radio, Space } from "antd";
import Passwd from "./Passwd";
import Note from "./Note";
const Login = () => {
    const [loginStyle, setLoginStyle] = useState("passwd");
    const [styleDe, setStyleDe] = useState();
    const navigate = useNavigate();
    const [userOradmin,setuserOradmin]=useState();
    const uselocation=useLocation();

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
        {loginStyle == "passwd" ? <Passwd getState={onChangeState} /> : <Note getState={onChangeState}/>}
    </div >
}
export default Login;