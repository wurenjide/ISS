import React, { useState,useEffect } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';
import StoreA from './StoreA';
import StoreSA from './StoreSA';
import qs from "qs"
const Store = (props) => {
    
    useEffect(()=>{
        console.log("p",props);
    },[props.location])
    const [user,setUser]=useState(qs.parse(localStorage.getItem("user")))

    return <div>
        {user.career=="超级管理员"?<StoreSA/>:<StoreA/>}
    </div>

}
export default Store;
