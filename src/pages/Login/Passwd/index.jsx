import login from "../../../api/common/login";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { message, Form, Input, Button, Checkbox, Radio, Space, Col, Row } from "antd";
import { loginByPassword } from "../../../api/common/login";
import qs from "qs"

const Passwd = (props) => {
    const { getState } = props
    const navigate = useNavigate();
    const uselocation = useLocation();
    const onFinish = async (values) => {
        // let res = await loginByPassword(values);
        // if (res.code == "success") {
        //     let us=qs.stringify(res.data)
        //     localStorage.setItem("user",us);
        //     localStorage.setItem("is_login", 1);
        //     localStorage.setItem("is_administrator", values.is_administrator);
        //     message.success("登录成功!")
        //     if (uselocation.pathname.slice(-6) == "/admin") {
        //         localStorage.setItem("is_administrator", 1); 
        //         navigate("/admin");
        //     } else {
        //         localStorage.setItem("is_administrator", 0); 
        //         navigate("/user");
        //     }
        // }else if(res.data == "fail"){
        //     message.error(res.message)
        // }
        console.log(values)
        localStorage.setItem("id", 1)
        localStorage.setItem("is_login", 1);
        if (uselocation.pathname.slice(-6) == "/admin") {
            localStorage.setItem("is_administrator", 1); 
            navigate("/admin");
        } else {
            localStorage.setItem("is_administrator", 0); 
            navigate("/user");
        }
        message.success("登录成功!")
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const goRegister = () => {
        navigate("/register")
    }
    const onChangeState = () => {
        getState("note")
    }
    return (
        <div>
            <Form
                name="basic"
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign="left"
            >
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input placeholder="请输入手机号" prefix={<UserOutlined />} size="large" style={{ borderRadius: 40 }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password placeholder="请数输入密码" prefix={<LockOutlined />} size="large" style={{ borderRadius: 40 }} />
                </Form.Item>
                {/* <Form.Item name="is_administrator"
                    rules={[
                        {
                            required: true,
                            message: '选择身份',
                        },
                    ]}
                    wrapperCol={{ sm: { span: 24, offset: 1 }, xs: { span: 24, offset: 1 } }}
                >
                    <Radio.Group>
                        <Radio value="0">员工</Radio>
                        <Radio value="1">管理员</Radio>
                    </Radio.Group>
                </Form.Item> */}
                <Form.Item
                    wrapperCol={{ sm: { span: 24 }, xs: { span: 24 } }}
                >
                    <Button htmlType="submit" size="large" shape="round" style={{ width: "100%" }}>
                        登陆
                    </Button>
                </Form.Item>
                <Form.Item >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
                        <a onClick={onChangeState} style={{ color: "white" }}>使用验证码登陆</a>
                        <a onClick={goRegister} style={{ color: "white" }}>您还没有账号？</a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Passwd