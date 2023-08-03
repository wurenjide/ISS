import React, { useState,useEffect } from 'react'
import dayjs from 'dayjs';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Tag, DatePicker, Drawer, message, Space, Modal, Rate } from 'antd';

const Loving = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState({});
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
                console.log(status)
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
                if (s.status == "审批中") {
                    <a>进行反馈</a>
                } else if (s.status == "完成") {
                    <a>查看反馈</a>
                }
            }
        }
    ]
    const getData = async () => {
    }
    useState(() => {
        getData()
    })
    useEffect(() => {
        getData()
    }, [page]);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showModel = () => {
        setOpen2(true);
    }
    const onCancel = () => {
        setOpen2(false);
    };
    const pageChange = (page, pageSize) => {
        setPage(page)
    }
    return <>
        <Space style={{ margin: 10 }}>
            <Button onClick={showDrawer}>申请关怀</Button>
            <Button onClick={showModel}>进行反馈</Button>
        </Space>
        <Table columns={columns} dataSource={data} rowKey={data => data.id} 
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, defaultPageSize: 6, page: page, total: total, onChange: pageChange }} />
        <Drawer title="申请" placement="right" onClose={onClose} open={open} getContainer={false}>
            <Form >
                <Form.Item name="storeId" initialValue={user.storeId} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="id" hidden initialValue={user.id}>
                    <Input />
                </Form.Item>
                <Form.Item label="申请原因" name="reason">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Drawer>
        <Modal open={open2} title="反馈" footer={false} onCancel={onCancel}>
            <Form>
                <Form.Item label="反馈类型">
                    <Select />
                </Form.Item>
                <Form.Item label="反馈内容">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="备注">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="满意等级">
                    <Rate />
                </Form.Item>
                <Form.Item>
                    <Button>提交</Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}
export default Loving