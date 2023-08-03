import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { Button, Form, Input, Select, Col, Row, Table, Space, DatePicker, Popconfirm, message, Drawer } from 'antd';
import qs from "qs"
import { getNoticeInfor, addNoticeInfor, deleteNoticeInfor } from "../../../api/Admin/NoticeMan"
import { getAllStaff } from "../../../api/Admin/Staff"
import { publicIp } from '../../../config/apiUrl';
const NoticeMan = () => {

    const [user] = useState(qs.parse(localStorage.getItem("user")))
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [staff, setStaff] = useState([])
    const columns = [
        {
            title: "通知接收者",
            dataIndex: "receiverId",
            width: 200,
            render: (_, s) => {
                if (s.receiverId == "全体成员") {
                    return <>全体成员</>
                } else {
                    return <>{s.name}</>
                }
            }
        },
        {
            title: '消息内容',
            dataIndex: 'content',
        },
        {
            title: "发布时间",
            dataIndex: "createTime",
            width: 200
        },
    ]

    const getData = async () => {
        let data = {
            storeId: user.storeId,
            page: page,
            time: form.getFieldValue("time") ? dayjs(form.getFieldValue("time")).format("YYYY-MM-DD") + " 00:00:00" : "",
        }
        let res = await getNoticeInfor(data)
        if (res.code == "success") {
            let data1 = []
            res.data.notices.forEach(r => {
                data1.push({
                    ...r.notice,
                    name: r.user ? r.user.name : ""
                })
            })
            setData(data1)
            setTotal(res.data.total)
        }
    }
    const getStaff = async () => {
        let data = {
            storeId: user.storeId,
        }
        let res = await getAllStaff(data)
        if (res.code == "success") {
            let s = []
            s.push({
                label: "全体成员",
                value: "全体成员",
            })
            res.data.forEach(r => {
                s.push({
                    label: r.name,
                    value: r.id
                })
            })
            setStaff(s)
        }
    }
    useState(() => {
        getData()
        getStaff()
    })
    useEffect(() => {
        getData()
    }, [page]);
    const pageChange = (page, pageSize) => {//页码改变时
        setPage(page)
    };

    const onReset = () => {
        form.resetFields();
    };
    const onFinish = async (values) => {

        let res = await addNoticeInfor(values);
        if (res.code == "success") {
            message.success("成功")
            setOpen(false)
            getData()
        }
    };
    const deleteNotice = async () => {
        let res = await deleteNoticeInfor(selectedRowKeys)
        if (res.code == "success") {
            message.success("成功")
            getData()
        }
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSearch = () => {
        getData()
    };
    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };

    return <>
        <Form form={form} name="control-hooks" onFinish={onSearch}>
            <Row gutter={16} justify="start" align="middle">
                <Col span={6}>
                    <Form.Item name="time" label="搜索在此之后的消息">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>

                </Col>
                <Col span={4} push={9}>
                    <Form.Item>
                        <Space>
                            <Button onClick={showDrawer}>发布消息</Button>
                            <Popconfirm
                                title="删除"
                                description="是否删除这条数据?"
                                onConfirm={deleteNotice}
                                okText="是"
                                cancelText="否"
                            >
                                <Button danger>删除</Button>
                            </Popconfirm>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} total={1000}
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange, page: page, total: total }}
            rowKey={r => r.id}
            loading={loading} />
        <Drawer
            title="发布消息"
            placement="right"
            onClose={onClose}
            open={open}
            destroyOnClose={true}
            getContainer={false}
        >
            <Form
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item name="senderId" initialValue={user.id} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="storeId" initialValue={user.storeId} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="receiverId" label="接收者">
                    <Select options={staff} />
                </Form.Item>
                <Form.Item name="content" label="消息内容">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button onClick={onClose}>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    </>
}
export default NoticeMan