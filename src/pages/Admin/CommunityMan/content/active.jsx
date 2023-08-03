import React, { useState } from "react";
import { Button, Form, Input, Select, Col, Row, Table, Tag, Descriptions, DatePicker, Upload, message, Modal, Space } from 'antd';

const Active = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([{ activityName: "aa" }])
    const columns = [
        {
            title: '活动名称',
            dataIndex: 'activityName',
        },
        {
            title: '活动类型',
            dataIndex: 'activityType',
        },
        // {
        //     title: "活动内容",
        //     dataIndex: "activityContent",
        // },
        {
            title: "发布时间",
            dataIndex: "publishTime",
        },
        {
            title: "活动开始时间",
            dataIndex: "startTime",
        },
        {
            title: "活动结束时间",
            dataIndex: "endTime",
        },
        // {
        //     title: "活动地点",
        //     dataIndex: "activityLocation",
        // }
    ]

    const showModal = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onFinish=async()=>{

    }
    return <div>
        <Form>
            <Row gutter={20}>
                <Col span={4}>
                    <Form.Item label="发布时间" name="publishTime">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        <Button>搜索</Button>
                    </Form.Item>
                </Col>
                <Col span={3} push={14}>
                    <Space>
                        <Button onClick={showModal}>新增</Button>
                        <Button danger>删除</Button>
                    </Space>
                </Col>
            </Row>
        </Form>
        <Table dataSource={data}
            columns={columns} rowSelection={rowSelection} expandable={{
                expandedRowRender: (record) => (<>
                    <Descriptions >
                        <Descriptions.Item label="活动名称" span={2}>Cloud Database</Descriptions.Item>
                        <Descriptions.Item label="活动类型">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="发布时间">2018-04-24 18:00:00</Descriptions.Item>
                        <Descriptions.Item label="活动持续时间" span={2}>
                            2019-04-24 18:00:00 - 2019-04-24 18:00:00
                        </Descriptions.Item>
                        <Descriptions.Item label="活动地点" span={3}>
                            湖南省张家界永定区大庸桥公园吉首大学第七教学楼7301
                        </Descriptions.Item>
                        <Descriptions.Item label="活动内容">
                            阿斯达斯打扫打扫打扫打扫
                        </Descriptions.Item>
                    </Descriptions>
                </>)
            }} />
        <Modal open={open} footer={false} onCancel={onClose} title="活动具体信息" width={700}>
            <Form onFinish={onFinish}>
                <Row gutter={20}>
                    <Col span={16} >
                        <Form.Item label="活动名称">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="活动类型">
                            <Select options={
                                [
                                    {
                                        label:"线上",
                                    },
                                ]
                            } />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="持续时间">
                    <DatePicker.RangePicker/>
                </Form.Item>
                <Form.Item label="活动地点">
                    <Input/>
                </Form.Item>
                <Form.Item label="活动内容">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}
export default Active