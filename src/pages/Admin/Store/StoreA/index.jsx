import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';
import { getStoreById, updateStore } from "../../../../api/Admin/Store"
import qs from "qs"
const StoreA = () => {

    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [form] = Form.useForm();

    const getData = async () => {
        console.log(user)
        let res = await getStoreById({ storeId: user.storeId });
        form.setFieldsValue(res.data)
    }
    useState(() => {
        getData()
    })
    const onFinish = async (value) => {
        let res = await updateStore(value);
    }

    return <div style={{ textAlign: "center", margin: "auto", maxWidth: "400px", marginTop: "10%" }}>

        <Form form={form} onFinish={onFinish}>
            <Form.Item label="门店id" name="storeId" hidden>
                <Input />
            </Form.Item>
            <Form.Item label="名称" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="地址" name="address">
                <Input />
            </Form.Item>
            <Form.Item label="面积" name="size">
                <Input />
            </Form.Item>
            <Form.Item label="人数" name="employeeNum">
                <Input disabled />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
            </Form.Item>
        </Form>
    </div>
}
export default StoreA;