import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table, Tag, Drawer, Space, Pagination, DatePicker } from 'antd';
const { TextArea } = Input;

const Leave = () => {
    const columns = [
        {
            title: '员工名称',
            dataIndex: 'name',
        },
        {
            title: '职位',
            dataIndex: 'position',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '更新时间',
            dataIndex: 'update_time',
        },
        {
            title: '请假理由',
            dataIndex: 'reason',
        },
        {
            title: "请假状态",
            dataIndex: "state",
            render: (state) => {
                let color = "warning"
                let tag = "错误"
                if (state == 0) {
                    color = "processing"
                    tag = "未审批"
                } else if (state == 1) {
                    color = "success"
                    tag = "同意"
                } else if (state == 2) {
                    color = "error"
                    tag = "不同意"
                }
                return (
                    <div>
                        <Tag color={color} >
                            {tag}
                        </Tag>
                    </div>);
            }
        },
        {
            title: "操作",
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (s) => (<Button>删除</Button>)
        },
    ]
    const data = [{name:"aa"}]
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const pageChange = (page, pageSize) => {//页码改变时
        console.log(page, pageSize)
    };
    const onSelectChange = () => {
        console.log(1)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return <div>
        <div style={{ textAlign: "right", margin: 5 }}>
            <Button onClick={showDrawer}>请假</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{
            x: "100%",
            y: 420,
        }} total={1000}
            pagination={false}
        />
        <Drawer title="请假" placement="right" onClose={onClose} open={open}>
            <Form onFinish={onFinish}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="请假原因" name="reason">
                    <TextArea />
                </Form.Item>
                <Form.Item label="开始时间" name="start_time">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="结束时间" name="end_time">
                    <DatePicker/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>
}
export default Leave