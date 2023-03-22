import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table, Tag, Drawer, Space, Pagination, DatePicker, message } from 'antd';
import { getLeaveInfo, addLeaveInfo, deleteLeaveInfo, dd } from "../../../api/User/Leave"
import dayjs from 'dayjs';
import qs from "qs";
const { TextArea } = Input;

const Leave = () => {


    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [user,setUser]=useState();
    const columns = [
        {
            title: '员工id',
            dataIndex: 'employeeId',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '请假理由',
            dataIndex: 'reason',
        },
        {
            title: "请假状态",
            dataIndex: "status",
            render: (_, s) => {
                let status = s.status
                console.log(status)
                let color = "warning"
                let tag = "错误"
                if (status == "未审批") {
                    color = "processing"
                    tag = "未审批"
                } else if (status == "同意") {
                    color = "success"
                    tag = "同意"
                } else if (status == "拒绝") {
                    color = "error"
                    tag = "拒绝"
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
            render: (s) => (
                <Button onClick={() => { deleteLeave(s) }}>删除</Button>
            )
        },
    ]

    const getData = async () => {
        let res = await getLeaveInfo();
        setData(res.data)
        let us=qs.parse(localStorage.getItem("user"))
        console.log(us)
        setUser(us)
    }

    useState(() => {
        getData()
    })
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const pageChange = (page, pageSize) => {//页码改变时
        console.log(page, pageSize)
    };
    const onFinish = async (values) => {
        values.startTime = dayjs(values.startTime).format("YYYY-MM-DD hh:mm:ss")
        values.endTime = dayjs(values.endTime).format("YYYY-MM-DD hh:mm:ss")
        let res = await addLeaveInfo(values);
        if (res.code == "success") {
            message.success(res.message)
        }
    };

    const deleteLeave = async (s) => {
        let res = await deleteLeaveInfo(s)
    }
    const ce = async () => {
        let d = [1, 2, 3]
        let res = await dd(d)
    }

    return <div>
        <Button onClick={ce}>测试</Button>
        <div style={{ textAlign: "right", margin: 5 }}>
            <Button onClick={showDrawer}>请假</Button>
        </div>
        <Table columns={columns} dataSource={data} scroll={{
            x: "100%",
            y: 420,
        }} total={1000}
            pagination={false}
            rowKey={r => r.id}
        />
        <Drawer title="请假" placement="right" onClose={onClose} open={open}>
            <Form onFinish={onFinish}>
                <Form.Item name="id" hidden initialValue="1">
                    <Input />
                </Form.Item>
                <Form.Item label="请假原因" name="reason">
                    <TextArea />
                </Form.Item>
                <Form.Item label="开始时间" name="startTime">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="结束时间" name="endTime">
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>
}
export default Leave