import React, { useState } from "react";

import { Button, Form, Input, Select, Col, Row, Table, Tag, Radio, DatePicker, Upload, message, Modal, Space, Drawer } from 'antd';
const Record = () => {

    const [open,setOpen]=useState(false)

    const columns = [
        {
            title: '员工姓名',
            dataIndex: 'username',
        },
        {
            title: '创建人员',
            dataIndex: 'user_id',
        },
        {
            title: '关怀时间',
            dataIndex: 'time',
        },
        {
            title: '关怀内容',
            dataIndex: 'content',
        },
        {
            title: '关怀类型',
            dataIndex: 'type',
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
    ]
    const showDrawer=()=>{
        setOpen(true)
    }
    const onClose=()=>{
        setOpen(false)
    }
    return <div>
        <Space style={{margin:10}}>
            <Button onClick={showDrawer}>添加记录</Button>
        </Space>
        <Table columns={columns} />
        <Drawer onClose={onClose} open={open}>
            <Form>
                <Form.Item name="username" label="员工姓名">
                    <Input/>
                </Form.Item>
                <Form.Item name="username" label="关怀类型">
                    <Select/>
                </Form.Item>
                <Form.Item name="username" label="关怀时间">
                    <DatePicker/>
                </Form.Item>
                <Form.Item name="username" label="备注">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button>
                        添加记录
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>
}

export default Record