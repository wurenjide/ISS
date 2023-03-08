import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message, Form, Input, Button, Checkbox, Radio, Space } from "antd";
import UserRe from "./UserRe";
import AdminRe from "./AdminRe";

const Register = () => {
    const [registerStyle,setRegisterStyle]=useState("passwd");
    const onChange=(value)=>{
        console.log(value.target.value)
        setRegisterStyle(value.target.value)
    }
    return <div className={style["register-layout"]}>
        <h1>注册</h1>
        <Radio.Group onChange={onChange} defaultValue="passwd" style={{margin:"10px"}}>
            <Radio.Button value="passwd">员工注册</Radio.Button>
            <Radio.Button value="note">管理员注册</Radio.Button>
        </Radio.Group>
        {registerStyle=="passwd"?<UserRe/>:<AdminRe/>}
        {/* {React.createElement(registerStyle=="passwd"?UserRe:AdminRe)} */}
    </div>
}

export default Register