import login from "../../../api/common/login";
import { useNavigate } from "react-router-dom";
import { message, Form, Input, Button, Checkbox, Radio, Space } from "antd";

const Passwd = () => {
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
    const goRegister = () => {
        navigate("/register")
    }
    return (
        <div>
            <Form
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
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password />
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
export default Passwd