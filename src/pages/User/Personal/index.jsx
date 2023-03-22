import React, { useState } from 'react'
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Menu, DatePicker, Upload, message } from 'antd';
import style from "./index.module.scss"
import PersonIn from './PersonIn';
import History from './HistoryIn';


const Personal = () => {

    const [menu, setMune] = useState("1");

    const items = [
        {
            label: "个人信息",
            key: "1",
        },
        {
            label: "历史消息记录",
            key: "2",
        },
    ]

    const onSelect = (key) => {
        setMune(key.key)
    }

    return <>
        <div>
            <Row>
                <Col span={3}>
                    <Menu mode="vertical" style={{ backgroundColor: "none", }} items={items} defaultSelectedKeys={[menu]} onSelect={onSelect} />
                </Col>
                <Col span={21}>
                    {menu == "1" ? <PersonIn /> : <History />}
                </Col>
            </Row>
        </div>
    </>
}
export default Personal