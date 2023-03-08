import register from "../../../api/common/register";
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { message, Form, Input, Button, DatePicker, Checkbox, Radio, Space, Select, InputNumber, Col, Row } from "antd";

const AdminRe = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values)
        // const res = await register(values);
        // navigate("/login");
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const goLogin=()=>{
        navigate("/login")
    }
    return (
        <div >
            <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{ textAlign: "left" }}>


                    <Form.Item label="姓名" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="性别" name="sex">
                        <Radio.Group>
                            <Radio value="0"> 男 </Radio>
                            <Radio value="1"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="生日" name="birthday">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone">
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="确认密码" name="apassword"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="部门名称" name="store_name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="部门地址" name="store_address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="部门面积" name="store_size">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="验证码"
                    >
                        <Row gutter={1}>
                            <Col span={12}>
                                <Form.Item
                                    name="note"
                                    noStyle
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </div>

                <Form.Item style={{marginLeft:100}}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                        <a onClick={goLogin}>已有账号现在去登陆？</a>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    );
}
export default AdminRe