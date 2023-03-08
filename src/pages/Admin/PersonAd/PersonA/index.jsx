import React, { useState } from 'react'
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Radio, DatePicker, Upload, message } from 'antd';

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

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
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
    );


    return <div style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
        <div style={{ padding: 20 }}>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? (<Avatar size={250} />) : (uploadButton)}


            </Upload>
        </div>
        <Form style={{ textAlign: "left" }}>
            <Form.Item label="姓名">
                <Input />
            </Form.Item>
            <Form.Item label="年龄">
                <Input />
            </Form.Item>
            <Form.Item label="性别" name="sex">
                <Radio.Group>
                    <Radio value="0"> 男 </Radio>
                    <Radio value="1"> 女 </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="生日" name="birthday">
                <DatePicker initialValues={dayjs('2015-06-06', 'YYYY-MM-DD')} />
            </Form.Item>
            <Form.Item label="手机号" name="phone">
                <Input />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="门店id">
                12
            </Form.Item>
            <Form.Item>
                <Button>保存修改</Button>
            </Form.Item>
        </Form>
    </div>
}
export default PersonA