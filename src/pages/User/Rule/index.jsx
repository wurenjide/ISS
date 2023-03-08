import React, { useState } from 'react'
import dayjs from 'dayjs';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Checkbox, TimePicker } from 'antd';

const Rule = () => {

    const options = [
        {
            label: "星期一",
            value: 1,
        },
        {
            label: "星期二",
            value: 2,
        },
        {
            label: "星期三",
            value: 3,
        },
        {
            label: "星期四",
            value: 4,
        },
        {
            label: "星期五",
            value: 5,
        },
        {
            label: "星期六",
            value: 6,
        },
        {
            label: "星期七",
            value: 7,
        }
    ]
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    return <>
        <Form>
            <Form.Item label="工作日偏好">
                <Checkbox.Group options={options} onChange={onChange} />
            </Form.Item>
            <Form.Item label="午餐时间">
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="晚餐时间">
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="工作时间偏好">
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="每日工作时长偏好">
                <InputNumber />
            </Form.Item>
            <Form.Item label="每周工作时长偏好">
                <InputNumber />
            </Form.Item>
            <Form.Item>
                <Button>确认修改</Button>
            </Form.Item>
        </Form>
    </>
}
export default Rule