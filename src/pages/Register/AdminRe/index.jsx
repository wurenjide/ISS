import register from "../../../api/common/register";
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { message, Form, Input, Button, DatePicker, Checkbox, Radio, Space, Select, InputNumber, Col, Row } from "antd";
import { setCode } from "../../../api/common/code";
import dayjs from "dayjs";
import { render } from "@testing-library/react";
const AdminRe = () => {


    const [messageApi, contextHolder] = message.useMessage();
    const [state, setState] = useState({
        count: 60,
        liked: true,
    })
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.liked) {
            downCount()
        }
    }, [state.count, state.liked])

    const downCount = () => {
        let siv = setTimeout(() => {
            if (state.count - 1 >= 0) {
                setState({ count: state.count - 1, liked: state.liked })
            }
        }, 1000)
    }

    const onFinish = async (values) => {
        values.birthday = dayjs(values.birthday).format("YYYY-MM-DD")
        console.log(values)
        try {
            let res = await register(values);
            if (res.code == "success") {
                message.success(res.message)
                console.log(values)
                navigate("/login")
            } else {
                message.error("注册失败")
            }
        } catch (error) {
            console.log("error", error)
            messageApi.open({
                type: 'error',
                content: '请求失败',
            })
            return;
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const goLogin = () => {
        navigate("/login")
    }

    const setC = async () => {
        let d = { phone: form.getFieldValue("phone") }
        if (form.getFieldValue("phone") == "" || form.getFieldValue("phone") == undefined || form.getFieldValue("phone") == null) {
            messageApi.open({
                type: 'error',
                content: '手机号为空',
            })
            return;
        }
        try {
            let res = await setCode(d)
        } catch (error) {
            console.log("error", error)
            messageApi.open({
                type: 'error',
                content: '请求失败',
            })
            return;
        }
        setState({ count: 60, liked: false })
    }

    return (
        <div style={{ textAlign: "left" }}>
            {contextHolder}
            <Form
                form={form}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign="left"
                labelCol={{ sm: { span: 4, offset: 3 }, xs: { span: 4, offset: 3 } }}
                wrapperCol={{ sm: { span: 14 }, xs: { span: 14 } }}
            >
                <Form.Item label="姓名" name="name"
                    rules={[{
                        required: true,
                        message: '姓名不能为空!',
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="年龄" name="age"
                    rules={[{
                        required: true,
                        message: '年龄不能为空!',
                    }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="性别" name="sex"
                    rules={[{
                        required: true,
                        message: '性别不能为空!',
                    }]}>
                    <Radio.Group>
                        <Radio value="男"> 男 </Radio>
                        <Radio value="女"> 女 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="生日" name="birthday"

                    rules={[{
                        required: true,
                        message: '生日不能为空!',
                    }]}>
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="手机号" name="phone"
                    rules={[{
                        required: true,
                        message: '手机号不能为空!',
                    }, {
                        pattern: '^[1][3,4,5,7,8][0-9]{9}$',
                        message: "请输入正确的手机号"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" extra={<>
                    <span>1.密码必须由字母、数字、特殊符号组成，区分大小写<br /></span>
                    <span>2.特殊符号包含（. _ ~ ! @ # $ ^ & *）<br /></span>
                    <span>3.密码长度为8-20位"</span>
                </>}
                    // "1.密码必须由字母、数字、特殊符号组成，区分大小写
                    //     2.特殊符号包含（. _ ~ ! @ # $ ^ & *）
                    //     3.密码长度为8-20位"
                    rules={[{
                        required: true,
                        message: '密码不能为空!',
                    }, {
                        pattern: "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{8,20}$",
                        message: "密码格式有误！"
                    }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="确认密码" name="apassword"
                    rules={[{
                        required: true,
                        message: '确认密码不能为空!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('密码不一致!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="邮箱" name="email"
                    rules={[{

                        required: true,
                        message: '邮箱不能为空!',
                    }, {
                        type: "email",
                        message: "邮箱格式错误!"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="身份字段" name="career"
                    rules={[{

                        required: true,
                        message: '身份字段还未选择!',
                    }]}
                >
                    <Select options={[
                        {
                            label: "管理员",
                            value: "管理员",
                        },
                        {
                            label: "普通店员",
                            value: "普通店员",
                        }
                    ]} />
                </Form.Item>
                <Form.Item label="门店id" name="storeId"
                    rules={[{

                        required: true,
                        message: '门店id不能为空!',
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="验证码"
                    name="note"
                    rules={[{
                        required: true,
                        message: '验证码不能为空!',
                    }]}
                >
                    <Space.Compact block={true}>
                        <Input />
                        {state.liked ?
                            <Button onClick={setC} style={{ width: "100%" }}>获取验证码</Button>
                            : (state.count > 0 ?
                                <Button style={{ width: "100%" }} disabled>{state.count}</Button> :
                                <Button onClick={setC} style={{ width: "100%" }}>重新获取验证码</Button>
                            )}
                    </Space.Compact>
                </Form.Item>
                <Form.Item wrapperCol={{ sm: { span: 24 }, xs: { span: 24 } }} style={{ textAlign: "center" }}>
                    <Button htmlType="submit" size="large" shape="round" style={{ width: "70%", }}>
                        注册
                    </Button>
                </Form.Item>
                <div style={{textAlign:"center"}}>
                <a onClick={goLogin} style={{ color: "white" }}>已有账号现在去登陆？</a>
                </div>
            </Form>
        </div>
    );
}
export default AdminRe