import React, { useState } from 'react'
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Menu, DatePicker, Upload, message } from 'antd';
import style from "./index.module.scss"
import PersonIn from './PersonIn';
import Rule from './Rule';


const Personal = () => {

    const [menu, setMune] = useState("1");

    const items = [
        {
            label: "个人信息",
            key: "1",
        },
        {
            label: "排班偏好",
            key: "2",
        },
    ]

    const onSelect = (key) => {
        setMune(key.key)
    }

    return <>
        <div>
            <Row>
                <Col span={3} style={{background:"rgb(0,0,0,0)"}}>
                    <Menu mode="vertical"  style={{background:"rgb(0,0,0,0)"}} items={items} defaultSelectedKeys={[menu]} onSelect={onSelect} />
                </Col>
                <Col span={21}  style={{background:"rgb(0,0,0,0)"}}>
                    {menu == "1" ? <PersonIn /> : <Rule/>}
                </Col>
            </Row>
        </div>
    </>
}
export default Personal