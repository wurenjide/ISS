import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Button, Form, Input, Select, Col, Row, Table, Tag, Radio, DatePicker, Upload, message, Modal } from 'antd';
import Apply from './content/apply';
import Feedback from './content/feedback';
import Record from './content/record';

const LoveMan = () => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState([{ username: 22, phone: 22, status: "审核中" }])
    const [love, setLove] = useState("apply");
    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
        },
        {
            title: '申请原因',
            dataIndex: 'reason',
        },
        {
            title: '申请时间',
            dataIndex: 'time',
        },
        {
            title: '申请状态',
            dataIndex: 'status',
            render: (_, s) => {
                let status = s.status
                let color = "warning"
                let tag = "错误"
                if (status == "审核中") {
                    color = "processing"
                    tag = "审核中"
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
            dataIndex: "option",
            render: (_, s) => {
                if (s.status == "审核中") {

                    return <a onClick={() => showModal(s, "反馈")}>进行反馈</a>
                } else if (s.status == "完成") {
                    return <a onClick={() => showModal(s, "查看")}>查看反馈</a>
                }
            }
        }
    ]

    const onChange = (e) => {
        setLove(e.target.value);
      }

    const showModal = (s, title) => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    return <>
        <Radio.Group onChange={onChange} defaultValue="w" style={{ padding: "10px", margin: "auto" }}>
            <Radio.Button value="apply">关怀申请</Radio.Button>
            <Radio.Button value="feedback">反馈</Radio.Button>
            <Radio.Button value="record">关怀记录</Radio.Button>
        </Radio.Group>
        {React.createElement(love == 'apply' ? Apply : (love == "feedback" ? Feedback : Record))}
        {/* <Table columns={columns} dataSource={data} rowKey={r => r.username} />
        <Modal title="反馈" open={open} footer={false} onCancel={onClose}>
            <Form>
                <Form.Item name="type" label="反馈类型">
                    <Select options={[
                        {
                            label: "线下关怀",
                            value: "线下关怀",
                        },
                        {
                            label: "排班关怀",
                            value: "排班关怀",
                        },
                    ]} />
                </Form.Item>
                <Form.Item name="content" label="反馈内容">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button>提交</Button>
                </Form.Item>
            </Form>
        </Modal> */}
    </>
}
export default LoveMan