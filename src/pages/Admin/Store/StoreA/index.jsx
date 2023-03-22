import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';
import { getStore, updateStore } from "../../../../api/Admin/Store"

const StoreA = () => {

    const [form] = Form.useForm();

    const getData = async () => {
        let res = await getStore();
    }
    const onFinish = async (value) => {
        let res = await updateStore(value);
    }

    return <div style={{ textAlign: "center", margin: "auto", maxWidth: "400px", marginTop: "10%" }}>

        <Form form={form} onFinish={onFinish}>
            <Form.Item label="名称">
                <Input />
            </Form.Item>
            <Form.Item label="地址">
                <Input />
            </Form.Item>
            <Form.Item label="面积">
                <Input />
            </Form.Item>
            <Form.Item label="人数">
                20
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
            </Form.Item>
        </Form>
    </div>
}
export default StoreA;