import style from "./index.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { message, Form, Input, Button, Checkbox, Radio, Image } from "antd";
import UserRe from "./UserRe";
import imge from "../../assets/logo.png"
import AdminRe from "./AdminRe";

const Register = () => {
    const [styleDe,setStyleDe]=useState();
    const [registerStyle,setRegisterStyle]=useState("passwd");
    const onChange=(value)=>{
        console.log(value.target.value)
        setRegisterStyle(value.target.value)
    }


    useState(() => {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            setStyleDe("register-layout-phone")
        } else {
            setStyleDe("register-layout")
        }
    })

    return <div className={style[styleDe]}>
        <div className={style["logo"]}>
            <Image src={imge} height={100} preview={false} />
        </div>
        {/* <Radio.Group onChange={onChange} defaultValue="passwd" style={{margin:"10px"}}>
            <Radio.Button value="passwd">注册草稿1</Radio.Button>
            <Radio.Button value="note">注册草稿2</Radio.Button>
        </Radio.Group>
        {registerStyle=="passwd"?<UserRe/>:<AdminRe/>} */}
        <AdminRe/>
        {/* {React.createElement(registerStyle=="passwd"?UserRe:AdminRe)} */}
    </div>
}

export default Register