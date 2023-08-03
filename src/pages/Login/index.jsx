import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import imge from "../../assets/logo.png"
import { Image } from "antd";   
import Passwd from "./Passwd";
import Note from "./Note";
const Login = () => {
    const [loginStyle, setLoginStyle] = useState("passwd");
    const [styleDe, setStyleDe] = useState("login-form-wrap");
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"))

    useEffect(() => {
        if (token) {
            navigate("/user")
        }
    }, [navigate]);

    const onChangeState = (value) => {
        console.log(value)
        setLoginStyle(value)
    }

    return <div className={style[styleDe]}>
        <div className={style["logo"]}>
            <Image src={imge} height={100} preview={false} />
        </div>
        {loginStyle == "passwd" ? <Passwd getState={onChangeState} /> : <Note getState={onChangeState} />}
    </div >
}
export default Login;