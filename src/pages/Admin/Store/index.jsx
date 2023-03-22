import React, { useState,useEffect } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';
import StoreA from './StoreA';
import StoreSA from './StoreSA';

const Store = (props) => {
    
    useEffect(()=>{
        console.log("p",props);
    },[props.location])
    const [career,setCareer]=useState(0)
    useState(()=>{
        let res=localStorage.getItem("career")
        setCareer(res)
    })

    return <div>
        {career==1?<StoreA/>:<StoreSA/>}
    </div>

}
export default Store;
