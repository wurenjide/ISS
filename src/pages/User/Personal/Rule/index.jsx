import React, { useState } from 'react'
import dayjs from 'dayjs';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Checkbox, TimePicker, message } from 'antd';
import { getPerInfo, updatePerInfo, addPerInfo } from "../../../../api/User/Preference"
import qs from "qs"
const Rule = () => {

    const [data, setData] = useState({})
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [checked, setChecked] = useState([])
    const [form] = Form.useForm();


    const getData = async () => {
        let res = await getPerInfo({ id: user.id })
        console.log(res.data)
        if (res.code == "success") {
            form.setFieldValue("id",res.data.id)
            form.setFieldValue("weekTime",res.data.weekTime)
            form.setFieldValue("lunchTime",[dayjs(res.data.lunchTime.slice(0,5),"HH:mm"),dayjs(res.data.lunchTime.slice(6,11),"HH:mm")])
            form.setFieldValue("dinnerTime",[dayjs(res.data.dinnerTime.slice(0,5),"HH:mm"),dayjs(res.data.dinnerTime.slice(6,11),"HH:mm")])
            form.setFieldValue("timeLength", parseInt(res.data.timeLength))
            form.setFieldValue("time", [dayjs(res.data.startTime, "HH:mm"), dayjs(res.data.endTime, "HH:mm")])
            form.setFieldValue("rangeTime", res.data.rangeTime.split(','))
            setData(res.data)
            setChecked(res.data.range)
        }
    }

    useState(() => {
        getData()
    })

    const onChange = (checkedValues) => {
        setChecked(checkedValues)
    };
    const onFinish = async (value) => {
        value.lunchTime=dayjs(value.lunchTime[0]).format("HH:mm")+"-"+dayjs(value.lunchTime[1]).format("HH:mm")
        value.dinnerTime=dayjs(value.dinnerTime[0]).format("HH:mm")+"-"+dayjs(value.dinnerTime[1]).format("HH:mm")
        value.startTime=dayjs(value.time[0]).format("HH:mm")
        value.endTime=dayjs(value.time[1]).format("HH:mm")
        value.rangeTime=value.rangeTime.join(",")
        let res = await updatePerInfo(value)
        if (res.code == "success") {
            message.success("成功")
            getData()
        }
    }
    return <>
        <div style={{ margin: "auto", maxWidth: 700 }}>
            <Form onFinish={onFinish} form={form}>
                <Form.Item name="id" hidden>
                    <Input/>
                </Form.Item>
                <Form.Item name="employeeId" initialValue={user.id} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="storeId" initialValue={user.storeId} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="工作时长偏好" name="timeLength">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="周工作时长偏好" name="weekTime">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="午餐时间" name="lunchTime"
                >
                    <TimePicker.RangePicker minuteStep={30} secondStep={60} format="HH:mm" />
                </Form.Item>


                <Form.Item label="晚餐时间" name="dinnerTime">
                    <TimePicker.RangePicker minuteStep={30} secondStep={60} format="HH:mm" />
                </Form.Item>

                <Form.Item label="工作时间" name="time" >
                    <TimePicker.RangePicker minuteStep={30} secondStep={60} format="HH:mm" />
                </Form.Item>
                <Form.Item label="工作日偏好" name="rangeTime" style={{ verticalAlign: "middle", display: "inline-block" }}>
                    <Checkbox.Group options={[
                        {
                            label: "星期一",
                            value: "1",
                        },
                        {
                            label: "星期二",
                            value: "2",
                        },
                        {
                            label: "星期三",
                            value: "3",
                        },
                        {
                            label: "星期四",
                            value: "4",
                        },
                        {
                            label: "星期五",
                            value: "5",
                        },
                        {
                            label: "星期六",
                            value: "6",
                        },
                        {
                            label: "星期七",
                            value: "7",
                        }
                    ]} 
                    onChange={onChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">确认提交</Button>
                </Form.Item>
            </Form>
        </div>

    </>
}
export default Rule