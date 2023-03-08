import login from "../../../api/common/login";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button, Checkbox, Radio, Space,Row,Col } from "antd";
import { set } from "mobx";



const Note = () => {
    const [state, setState] = useState({
        count: 60,
        liked: true,
    })
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values)
        // const res = await login(values);
        // let { code, data: { is_administrator, uid }, message: tips } = res;
        // if (code === 0) {
        //     message.error(tips);
        //     return;
        // }
        //将用户信息存入本地
        localStorage.setItem("is_login", 1);
        // localStorage.setItem("uid", uid);
        localStorage.setItem("is_administrator", values.is_administrator);
        message.success("登录成功!")
        if (values.is_administrator == "0") {
            navigate("/user");
        } else {
            navigate("/admin");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const getCode = (e) => {
        countDown()
    }
    const countDown = () => {
        let { count } = state;
        // let siv = setInterval(() => {
        //     setState({ count: (count--) }, () => {
        //         if (count <= -1) {
        //             clearInterval(siv);
        //             setState({ count: 59, liked: false })
        //         }
        //     }
        //     )
        // }, 1000
        // )
        let siv = setInterval(ll(), 1000)
        function ll() {
            if (count <= -1) {
                clearInterval(siv);
                setState({ count: 59, liked: false })
            } else {
                count--
                setState({ count: count, liked: true })
            }
        }
    }

    const goRegister = () => {
        navigate("/register")
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 13,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入用手机号',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="note"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
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
                <Form.Item name="is_administrator"
                    rules={[
                        {
                            required: true,
                            message: '选择身份',
                        },
                    ]}
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>
                    <Radio.Group>
                        <Radio value="0">员工</Radio>
                        <Radio value="1">管理员</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 10,
                    }}
                >
                    <Space>
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                        <Button onClick={goRegister}>
                            注册
                        </Button>
                    </Space>

                </Form.Item>
            </Form>
        </div>
    )
}
export default Note