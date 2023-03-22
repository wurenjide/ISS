import React, { useState } from 'react'
import dayjs from 'dayjs';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Checkbox, TimePicker } from 'antd';
import { getPerInfo, updatePerInfo } from "../../../api/User/Preference"

const Rule = () => {

    const [data, setData] = useState()



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


    const getData = async () => {
        let res = await getPerInfo()
    }

    useState(() => {
        getData()
    })

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    const onFinish = async (value) => {
        console.log(value)
    }
    return <>
        <Form onFinish={onFinish}>
            {/* <Form.Item label="工作日偏好" initialValue={data.range}>
                <Checkbox.Group options={options} onChange={onChange} />
            </Form.Item> */}
            <Form.Item label="午餐时间" name="lunch" initialValue={[dayjs("12:00:00", "hh:mm:ss"),dayjs("12:30:00", "hh:mm:ss")]}>
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="晚餐时间" name="dinner">
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="工作时间偏好" name="time">
                <TimePicker.RangePicker minuteStep={30} secondStep={60} />
            </Form.Item>
            <Form.Item label="每日工作时长偏好" name="time_length">
                <InputNumber />
            </Form.Item>
            <Form.Item label="每周工作时长偏好">
                <InputNumber />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">确认修改</Button>
            </Form.Item>
        </Form>
    </>
}
export default Rule