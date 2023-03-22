import login from "../../../api/common/login";
import { UserOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button, Checkbox, Radio, Space, Row, Col } from "antd";
import { set } from "mobx";
import { setCode } from "../../../api/common/code"
import { loginByNote } from "../../../api/common/login"



const Note = (props) => {
    const { getState } = props;
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
                console.log(state.count, state.liked)
            }
        }, 1000)
    }

    const onFinish = async (values) => {
        // let res=await loginByNote(values)
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

    const goRegister = () => {
        navigate("/register")
    }
    const setC = async () => {
        // let d={p}
        // let res=await setCode()
        console.log(form.getFieldValue("phone"))
        setState({ count: 60, liked: false })
    }

    const onChangeState = () => {
        getState("passwd")
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelAlign="left"
                autoComplete="off"
            >
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入用手机号',
                        },
                    ]}
                >
                    <Input placeholder="请输入手机号" size="large" prefix={<UserOutlined />} style={{borderRadius:40}} />
                </Form.Item>

                <Form.Item
                    name="note"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Space.Compact block={true} size="large">
                        <Input placeholder="验证码" style={{borderTopLeftRadius:40,borderBottomLeftRadius:40,textAlign:"center"}}/>
                        {state.liked ?
                            <Button onClick={setC} shape="round" style={{ width: "100%" }}>获取验证码</Button>
                            : (state.count > 0 ?
                                <Button style={{ width: "100%", backgroundColor: "#D3D3D3" }} disabled>{state.count}</Button> :
                                <Button onClick={setC} style={{ width: "100%" }}>重新获取验证码</Button>
                            )}
                    </Space.Compact>
                </Form.Item>
                {/* <Form.Item name="is_administrator"
                    rules={[
                        {
                            required: true,
                            message: '选择身份',
                        },
                    ]}
                    wrapperCol={{ sm: { span: 24, offset: 1 }, xs: { span: 24 } }}>
                    <Radio.Group>
                        <Radio value="0">员工</Radio>
                        <Radio value="1">管理员</Radio>
                    </Radio.Group>
                </Form.Item> */}
                <Form.Item
                    wrapperCol={{ sm: { span: 24 }, xs: { span: 24 } }}
                >
                    <Button htmlType="submit" size="large" shape="round" style={{ width: "100%", }}>
                        登陆
                    </Button>
                </Form.Item>
                <Form.Item >
                    <div style={{ display: "flex", justifyContent: "space-between" ,marginBottom: 40}}>
                        <a onClick={onChangeState} style={{ color: "white" }}>使用密码登陆</a>
                        <a onClick={goRegister} style={{ color: "white" }}>您还没有账号？</a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Note