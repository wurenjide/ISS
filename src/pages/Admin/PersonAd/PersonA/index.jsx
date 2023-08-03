import React, { useState } from 'react'
import style from "./index.module.scss"
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, InputNumber, Avatar, Radio, DatePicker, Upload, message } from 'antd';
import qs from "qs"
import { getPersonInfo, updataPersonInfo } from "../../../../api/User/Person"
import upload from "../../../../api/common/upload"
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};



const PersonA = () => {
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
    const [use, setUse] = useState(qs.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const handleChange = async (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                getData()
            });
        }
    };
    const getData = async () => {

        let res = await getPersonInfo({ id: user.id });
        if (res.code == "success") {
            setUse(res.data)
            setUser(res.data)
        }
    }
    useState(() => {
        // getData()
    })
    const onFinish = async (value) => {
        let res = await updataPersonInfo(value)
        if (res.code == "success") {
            getData()
        }
    }
    const uploadButton = (
        <div className={style["uploadv"]}>
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </div>
        </div>
    );


    return <div style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
        <div style={{ padding: 20 }}>
            <Upload
                name="file"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                data={{ id: user.id }}
                action="http://192.168.43.114:10010/personal/upload/avatarUpload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {user.avatar ? (<Avatar size={100} src={user.avatar} shape="circle" />) : imageUrl ? (<Avatar size={100} src={imageUrl} shape="circle" />) : (uploadButton)}
            </Upload>
        </div>
        <Form style={{ textAlign: "left" }} onFinish={onFinish}>
            <Form.Item initialValue={use.avatar} name="avatar" hidden>
                <Input />
            </Form.Item>
            <Form.Item initialValue={use.id} name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item label="姓名" name="name" initialValue={use.name}
                rules={[{
                    required: true,
                    message: '姓名不能为空!',
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="年龄" name="age" initialValue={use.age}
                rules={[{
                    required: true,
                    message: '年龄不能为空!',
                }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label="性别" name="sex" initialValue={use.sex}
                rules={[{
                    required: true,
                    message: '性别不能为空!',
                }]}>
                <Radio.Group>
                    <Radio value="男"> 男 </Radio>
                    <Radio value="女"> 女 </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="生日" name="birthday" initialValue={dayjs(use.birthday, "YYYY-MM-DD")}
                rules={[{
                    required: true,
                    message: '生日不能为空!',
                }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="邮箱" name="email" initialValue={use.email}
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
            <Form.Item label="手机号" name="phone" initialValue={use.phone}
                rules={[{
                    required: true,
                    message: '手机号不能为空!',
                }, {
                    pattern: '^[1][3,4,5,7,8,9][0-9]{9}$',
                    message: "请输入正确的手机号"
                }]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item label="身份字段" name="career" initialValue={use.career}
                rules={[{

                    required: true,
                    message: '身份字段还未选择!',
                }]}
            >
                <Select disabled options={[
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
            <Form.Item label="门店id" name="storeId" initialValue={use.storeId}>
                <Input disabled />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
            </Form.Item>
        </Form>
    </div>
}
export default PersonA