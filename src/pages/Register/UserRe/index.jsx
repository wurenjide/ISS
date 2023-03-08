import register from "../../../api/common/register";
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button, DatePicker, Checkbox, Radio, Space, Select, InputNumber, Col, Row, Steps, } from "antd";

const UserRe = () => {

    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const steps = [
        {
            title: '手机号',
            key: "手机号"
        },
        {
            title: '设置密码',
            key: "设置密码"
        },
        {
            title: '基本信息',
            key: "基本信息"
        },
    ];

    const next = () => {
        if (current < 3) {
            setCurrent(current + 1);
        } else {
            setCurrent(2)
        }
    };
    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        } else {
            setCurrent(0)
        }
    };
    const onFinish = async (values) => {

        console.log("day", dayjs('2015-06-06', 'YYYY-MM-DD'))

        values.birthday = dayjs(values.birthday.$d).format("YYYY-MM-DD")

        console.log(values)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const vePhone = (value) => {
        console.log(value)
        setPhone(value.phone)
        next()
    }
    const gPassword = (value) => {
        setPassword(value.password)
        next()
    }
    const goLogin = () => {
        navigate("/login")
    }
    return (
        <div>
            <Steps current={current} items={steps} />
            {current === 0 && (
                <div style={{ margin: "auto", maxWidth: 300, marginTop: 20 }}>
                    <Form
                        onFinish={vePhone}
                        labelCol={{ span: 6, offset: 1 }}>
                        <Form.Item initialValue={phone} label="手机号" name="phone">
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
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">下一步</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            )}
            {current === 1 && (
                <div style={{ margin: "auto", maxWidth: 300, marginTop: 20 }}>
                    <Form labelAlign="left"
                        labelCol={{ span: 6, offset: 1 }}
                        onFinish={gPassword}
                    >
                        <Form.Item initialValue={password} label="密码" name="password"
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item initialValue={password} label="确认密码" name="apassword"
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button onClick={() => prev()}>上一步</Button>
                                <Button type="primary" htmlType="submit">下一步</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            )}
            {current >= 2 && (
                <div style={{ textAlign: "left", margin: "auto", maxWidth: 300, marginTop: 20 }}>
                    <Form labelCol={{ span: 6 }}
                        labelAlign="left">
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
                        <Form.Item label="生日" name="birthday" initialValue={dayjs('2015-06-06', 'YYYY-MM-DD')}>
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
                        <Form.Item label="部门号" name="store_id">
                            <Input />
                        </Form.Item>
                        <div style={{ textAlign: "center", margin: "auto" }}>
                            <Form.Item>
                                <Space>
                                    <Button onClick={() => prev()}>上一步</Button>
                                    <Button type="primary" htmlType="submit">完成</Button>
                                </Space>
                            </Form.Item>
                        </div>

                    </Form>
                </div>
            )}

            {/* <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
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
                    <Form.Item label="生日" name="birthday" initialValue={dayjs('2015-06-06', 'YYYY-MM-DD')}>
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
                    <Form.Item label="所属部门号" name="store_id">
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
                <Form.Item>
                    <Space style={{ marginLeft: 100 }}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                        <a onClick={goLogin}>已有账号现在去登陆？</a>
                    </Space>
                </Form.Item>
            </Form> */}
        </div>
    );
}
export default UserRe