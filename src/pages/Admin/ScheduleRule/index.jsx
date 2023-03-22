import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, TimePicker, Divider } from 'antd';
const ScheduleRule = () => {

    const [open, setOpen] = useState(false);

    const columns = [
        {
            title: "时间段",
            dataIndex: "time",
        },
        {
            title: "员工数量",
            dataIndex: "staff_total",
        },
        {
            title: "职业限制",
            dataIndex: "staff_career",
        },
    ]

    const showDrawer = (s) => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    return (<div>
        <Row gutter={20}>
            <Col span={12}>
                <Form>
                    <Space
                        direction='vertical'
                    // style={{ display: "flex" }}
                    >
                        <Space>
                            <Form.Item label="准备工作时长">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="准备工作人数">
                                <InputNumber />
                            </Form.Item>
                        </Space>
                        <Form.Item label="职位选择">
                            <Select
                                mode="multiple"
                                style={{ width: "150px" }}
                                allowClear
                                placeholder="请选择职业"
                                options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
                            />
                        </Form.Item>
                        <Divider />
                        <Space>
                            <Form.Item label="店员人数设置">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    预计客流量/<InputNumber />=员工需求数
                                </div>
                            </Form.Item>
                        </Space>
                        <Form.Item label="职位选择">
                            <Select
                                mode="tags"
                                style={{ width: "150px" }}
                                placeholder="请选择职业"
                                options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
                            />
                        </Form.Item>
                        <Divider />
                        <Space>
                            <Form.Item label="没有客流量至少值班员工人数">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="职位选择">
                                <Select
                                    mode="multiple"
                                    style={{ width: "150px" }}
                                    placeholder="请选择职业"
                                    options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
                                />
                            </Form.Item>
                        </Space>
                        <Divider />
                        <Space>
                            <Form.Item label="关店收尾工作时长">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="收尾工作人数">
                                <InputNumber />
                            </Form.Item>
                        </Space>
                        <Form.Item label="职位选择">
                            <Select
                                mode="multiple"
                                style={{ width: "150px" }}
                                placeholder="请选择职业"
                                options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button>保存修改</Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Col>
            <Col span={12}>
                <Table columns={columns} bordered title={() =>
                    <div style={{ width: "100%" }}>
                        <div style={{ float: "left" }}>自定义规则</div>
                        <div style={{ float: "right" }}>
                            <a onClick={showDrawer}>添加规则</a>
                        </div>
                    </div>
                } />
            </Col>
        </Row>
        <Drawer open={open} onClose={onClose}>
            <Form>
                <Form.Item label="时间段">
                    <TimePicker.RangePicker minuteStep={30} secondStep={60} />
                </Form.Item>
                <Form.Item label="员工数量">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="职位选择">
                    <Select
                        mode="multiple"
                        style={{ width: "150px" }}
                        allowClear
                        placeholder="请选择职业"
                        options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button>确定</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>)
}
export default ScheduleRule