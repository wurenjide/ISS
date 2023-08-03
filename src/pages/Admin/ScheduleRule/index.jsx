import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Card, Radio, DatePicker, TimePicker, Divider, message } from 'antd';
import {
    getRule,
    upbusinessRule,
    upendRule,
    upmealTimeRule,
    upnoPassengerFlowRule,
    uppassengerFlowRule,
    upprepareRule,
    uprestTimeRule,
    upshiftLimitRule,
    upworkHourRule,
} from "../../../api/Admin/Rule"
import qs from "qs"
import dayjs from 'dayjs';
const ScheduleRule = () => {

    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [store, setStore] = useState({ size: 100 })
    const [count, setCount] = useState(0)
    const [prepare] = Form.useForm();
    const [end] = Form.useForm();
    const [business] = Form.useForm();
    const [dinnerTime] = Form.useForm();
    const [lunchTime] = Form.useForm();
    const [workHour] = Form.useForm();
    const [shiftLimit] = Form.useForm();
    const [passengerFlow] = Form.useForm();
    const [noPassengerFlow] = Form.useForm();
    const [restTime] = Form.useForm();

    const getData = async () => {
        let res = await getRule({ storeId: user.storeId })
        let rule = res.data.rule
        prepare.setFieldsValue(rule.prepareRule)
        prepare.setFieldValue("formula", Math.ceil(store.size / parseInt(rule.prepareRule.formula.substring(5))))
        end.setFieldsValue(rule.endRule)
        end.setFieldValue("formula", Math.ceil(store.size / parseInt(rule.endRule.formula.substring(5))))
        rule.businessRule.runDateTimeDtoList.forEach((r) => {
            business.setFieldValue(r.week, [dayjs(r.startTime, "HH:mm"), dayjs(r.endTime, "HH:mm")])
        })
        lunchTime.setFieldsValue(rule.lunchTimeRule)
        lunchTime.setFieldValue("time", [dayjs(rule.lunchTimeRule.time.slice(0, 5), "HH:mm"), dayjs(rule.lunchTimeRule.time.slice(6, 11), "HH:mm")])
        dinnerTime.setFieldsValue(rule.dinnerTimeRule)
        dinnerTime.setFieldValue("time", [dayjs(rule.dinnerTimeRule.time.slice(0, 5), "HH:mm"), dayjs(rule.dinnerTimeRule.time.slice(6, 11), "HH:mm")])
        workHour.setFieldsValue(rule.workHourRule)
        workHour.setFieldValue("time", [dayjs(rule.workHourRule.shiftTimeRange.slice(0, 1), "HH"), dayjs(rule.workHourRule.shiftTimeRange.slice(2, 3), "HH")])
        shiftLimit.setFieldsValue(rule.shiftLimitRule)
        shiftLimit.setFieldValue("formula", parseInt(rule.shiftLimitRule.formula.substring(2)))
        passengerFlow.setFieldValue("formula", parseInt(rule.passengerFlowRule.formula))
        noPassengerFlow.setFieldsValue(rule.noPassengerFlowRule)
        restTime.setFieldsValue(rule.restTimeRule)
    }
    useState(() => {
        getData()
    })

    const disabledTime = () => {
        return { disabledHours: () => [0, 1, 2, 3, 4, 5] }
    }

    const InputChange3 = (value) => {
        setCount(Math.ceil(store.size / passengerFlow.getFieldValue("formula")))
    }

    const businessRule = async (values) => {
        console.log(values)
        let key = Object.keys(values)
        let value = Object.values(values)
        let data = {
            type: "门店营业时间规则",
            storeId: user.storeId,
            runDateTimeDtoList: []
        }
        console.log(value, "va")
        for (let i = 0; i < key.length; i++) {
            data.runDateTimeDtoList.push({
                week: key[i],
                startTime: value[i][0] != "" ? dayjs(value[i][0]).format("HH:mm") : "",
                endTime: value[i][1] != "" ? dayjs(value[i][1]).format("HH:mm") : "",
            })
        }
        console.log(data, "aaa")
        let res = await upbusinessRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }
    const workHourRule = async (value) => {
        let data = {
            type: "工作时长规则",
            storeId: user.storeId,
            weekWorkTime: value.weekWorkTime,
            dayWorkTime: value.dayWorkTime,
            maxWorkTime: value.maxWorkTime,
            shiftTimeRange: value.time ? dayjs(value.time[0]).format("H") + "-" + dayjs(value.time[1]).format("H") : ""
        }
        let res = await upworkHourRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }

    const mealTimeRule = async (value) => {

        let data = {
            type: "午餐时间规则",
            storeId: user.storeId,
            time: value.time ? dayjs(value.time[0]).format("HH:mm") + "-" + dayjs(value.time[1]).format("HH:mm") : "",
            count: value.count
        }
        let res = await upmealTimeRule(data)
        if (res.code == 20000) {
            message.success("成功")
        }
    }
    const prepareRule = async (value) => {
        let data = {
            type: "开店规则",
            storeId: user.storeId,
            front: value.front > 0 ? value.front * -1 : value.front,
            formula: "size/" + store.size / value.formula
        }
        let res = await upprepareRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        } else {
            message.success(res.message)
        }
    }
    const endRule = async (value) => {
        let data = {
            type: "关店规则",
            storeId: user.storeId,
            after: value.after,
            count: value.count > 0 ? value.count : value.count * -1,
            formula: "size/" + store.size / value.formula
        }
        let res = await upendRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        } else {
            message.success(res.message)
        }
    }

    const passengerFlowRule = async (value) => {
        let data = {
            type: "客流量规则",
            storeId: user.storeId,
            formula: document.getElementById("ke").value
        }
        let res = await uppassengerFlowRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }
    const noPassengerFlowRule = async (value) => {
        let data = {
            type: "无客流量规则",
            storeId: user.storeId,
            count: value.count
        }
        let res = await upnoPassengerFlowRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }

    const restTimeRule = async (value) => {
        let data = {
            type: "休息时间规则",
            storeId: user.storeId,
            count: value.count
        }
        let res = await uprestTimeRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }

    const shiftLimitRule = async (value) => {
        let data = {
            type: "班次限制规则",
            storeId: user.storeId,
            count: value.count,
            formula: "<=" + value.formula
        }
        let res = await upshiftLimitRule(data)
        if (res.code == 20000) {
            getData()
            message.success("成功")
        }
    }

    return (<div>
        <Space size="large" direction="vertical" >
            <Row gutter={20}>
                <Col span={6}>
                    {/* 开店关店规则 */}
                    <Space direction="vertical" size="large" style={{height:"100%"}}>
                        <Form onFinish={prepareRule} form={prepare}>
                            <Card title="开店规则"
                                style={{
                                    width: 300,
                                    backgroundColor: "white"
                                }}
                                actions={[<Button style={{height:"100%",width:"100%"}} htmlType="submit">保存</Button>]}>
                                <Form.Item label="开店前准备时长" name="front">
                                    <InputNumber step={0.5} />
                                </Form.Item>
                                <Form.Item label="准备人数" name="formula">
                                    <InputNumber size="small" style={{ width: 70 }} formatter={(value) => value.replace(/^(0+)|[^\d]+/g, "")} />
                                </Form.Item>
                            </Card>
                        </Form>
                        <Form onFinish={endRule} form={end}>
                            <Card title="关店规则"
                                // style={{
                                //     width: 300,
                                //     backgroundColor: "white",
                                // }}
                                actions={[<Button htmlType="submit">保存</Button>]}>
                                <Form.Item label="关店后准备时长" name="after">
                                    <InputNumber step={0.5} />
                                </Form.Item>
                                <Form.Item label="默认增加的人数" name="count">
                                    <InputNumber formatter={(value) => value.replace(/^(0+)|[^\d]+/g, "")} id="addcount" />
                                </Form.Item>
                                <Form.Item label="准备人数" name="formula">
                                    <InputNumber size="small" style={{ width: 70 }} formatter={(value) => value.replace(/^(0+)|[^\d]+/g, "")} />
                                </Form.Item>
                            </Card>
                        </Form>
                    </Space>
                </Col>
                <Col span={6}>
                    {/* 午餐晚餐规则 */}
                    <Space direction="vertical" size="large">
                        <Form onFinish={mealTimeRule} form={lunchTime}>
                            <Card title="午餐规则"
                                style={{
                                    width: 300,
                                    backgroundColor: "white"
                                }}

                                actions={[<Button htmlType="submit">保存</Button>]}>
                                <Form.Item name="type" initialValue={"午餐时间规则"} hidden={true}>
                                    <Input hidden />
                                </Form.Item>
                                <Form.Item label="间隔时长" name="count">
                                    <InputNumber step={0.5} />
                                </Form.Item>
                                <Form.Item label="时间段" name="time">
                                    <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                                </Form.Item>
                            </Card>
                        </Form>
                        <Form onFinish={mealTimeRule} form={dinnerTime}>
                            <Card title="晚餐规则"
                                style={{
                                    width: 300,
                                    backgroundColor: "white",
                                }}
                                bodyStyle={{height:216}}
                                actions={[<Button htmlType="submit">保存</Button>]}>
                                <Form.Item name="type" initialValue={"晚餐时间规则"} hidden={true}>
                                    <Input hidden />
                                </Form.Item>
                                <Form.Item label="间隔时长" name="count">
                                    <InputNumber step={0.5} />
                                </Form.Item>
                                <Form.Item label="时间段" name="time">
                                    <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                                </Form.Item>
                            </Card>
                        </Form>
                    </Space>
                </Col>
                <Col span={6}>
                    {/* 营业规则 */}
                    <Form onFinish={businessRule} form={business}>
                        <Card
                            title="门店营业规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}
                            bodyStyle={{height:516}}
                            actions={[<Button htmlType="submit">保存</Button>]}
                        >
                            <Form.Item label="星期一" name="Mon" >
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期二" name="Tue">
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期三" name="Wed" >
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期四" name="Thu" >
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期五" name="Fri" >
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期六" name="Sat">
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                            <Form.Item label="星期七" name="Sun" >
                                <TimePicker.RangePicker minuteStep={30} secondStep={60} disabledTime={disabledTime} hideDisabledOptions={true} format="HH:mm" />
                            </Form.Item>
                        </Card>
                    </Form>
                </Col>
                <Col span={6}>
                    {/* 工作时长规则 */}
                    <Form onFinish={workHourRule} form={workHour}>
                        <Card title="工作时长规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}
                             bodyStyle={{height:516}}
                            actions={[<Button htmlType="submit">保存</Button>]}>
                            <Form.Item label="周工作时长" name="weekWorkTime" >
                                <InputNumber min={0} max={140} />
                            </Form.Item>
                            <Form.Item label="日工作时长" name="dayWorkTime" >
                                <InputNumber min={0} max={24} />
                            </Form.Item>
                            <Form.Item label="连续工作时长" name="maxWorkTime" >
                                <InputNumber min={0} max={24} />
                            </Form.Item>
                            <Form.Item label="班次时长范围" name="time">
                                <TimePicker.RangePicker format="HH" />
                            </Form.Item>
                        </Card>
                    </Form>

                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={6}>
                    <Form onFinish={shiftLimitRule} form={shiftLimit}>
                        <Card title="班次限制规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}

                            actions={[<Button htmlType="submit">保存</Button>]}>
                            <Form.Item label="班次数量" name="count">
                                <InputNumber formatter={(value) => value.replace(/^(0+)|[^\d]+/g, "")} />
                            </Form.Item>
                            <Form.Item label="单个班次时间不超过" name="formula">
                                <InputNumber step={0.5} max={10} />
                            </Form.Item>
                        </Card>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form onFinish={passengerFlowRule} form={passengerFlow}>
                        <Card title="客流量规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}

                            actions={[<Button htmlType="submit">保存</Button>]}>
                            <Form.Item label="参数" name="formula">
                                <InputNumber size="small" onChange={InputChange3} style={{ width: 70 }} step={0.1} />
                            </Form.Item>
                            <Form.Item>
                                {store.size}/{passengerFlow.getFieldValue("formula")}={count != 0 ? count : Math.ceil(store.size / passengerFlow.getFieldValue("formula"))}人
                            </Form.Item>
                        </Card>
                    </Form>

                </Col>
                <Col span={6}>
                    <Form onFinish={noPassengerFlowRule} form={noPassengerFlow}>
                        <Card title="无客流量规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}
                            bodyStyle={{height:160}}
                            actions={[<Button htmlType="submit">保存</Button>]}>
                            <Form.Item label="最少人数" name="count">
                                <InputNumber formatter={(value) => value.replace(/^(0+)|[^\d]+/g, "")} id="addcount" />
                            </Form.Item>
                        </Card>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form onFinish={restTimeRule} form={restTime}>
                        <Card title="休息时间规则"
                            style={{
                                width: 300,
                                backgroundColor: "white"
                            }}
                            bodyStyle={{height:160}}
                            actions={[<Button htmlType="submit">保存</Button>]}>
                            <Form.Item label="休息时长" name="count">
                                <InputNumber step={0.5} />
                            </Form.Item>
                        </Card>
                    </Form>
                </Col>

            </Row>
        </Space>
    </div>)
}
export default ScheduleRule