import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table, Tag, DatePicker, Space, Drawer, TimePicker, Avatar, message } from 'antd';
import { getAttInfo, updateAttInfo, deleteAttInfo, Publish } from "../../../api/Admin/AttMan"
import qs from "qs"
import dayjs from 'dayjs';

const AttMan = () => {



    const columns = [
        {
            title: '头像',
            dataIndex: 'id',
            render: (_, s) => (<Avatar src={s.avatar} />)
        },
        {
            title: '姓名',
            dataIndex: 'name',
            render: (_, s) => (<>{s.name}</>)
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 60,
            render: (_, s) => {
                if (s.sex == 0) {
                    return <div>女</div>
                } else {
                    return <div>男</div>
                }
            }
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        // {
        //     title: '职位',
        //     dataIndex: 'career',
        // },
        {
            title: '签到时间',
            dataIndex: 'signTime',
        },
        {
            title: '签到类型',
            dataIndex: 'signType',
        },
        {
            title:"备注信息",
            dataIndex:"Info",
        },
        // {
        //     title: "是否打卡",
        //     dataIndex: "state",
        //     render: (state) => {
        //         let color = "warning"
        //         let tag = "错误"
        //         if (state == 0) {
        //             color = "processing"
        //             tag = "未打卡"
        //         } else if (state == 1) {
        //             color = "success"
        //             tag = "已打卡"
        //         }
        //         return (
        //             <div>
        //                 <Tag color={color} >
        //                     {tag}
        //                 </Tag>
        //             </div>);
        //     }
        // },
        {
            title: "操作",
            key: 'operation',
            fixed: 'right',
            width: 110,
            render: (s) => <div>
                <Button onClick={() => showDrawer(s)}>修改</Button>
                {/* <Button onClick={() => deleteAtt(s)}>删除</Button> */}
            </div>,
        },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [drawer, setDrawer] = useState(false);
    const [useIn, setUseIn] = useState({})
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))


    const getData = async (values) => {
        setLoading(true)
        let data = {
            id: user.id,
            storeId: user.storeId,
            page: page,

        }
        if (values !== undefined && {} && "" && null) {
            data = {
                ...data,
                name: values.name !== undefined && {} && "" && null ? "" : values.name,
                status: values.status !== undefined && {} && "" && null ? "" : values.status,
                data: values.data !== undefined && {} && "" && null ? "" : dayjs(values.data).format("YYYY-MM-DD")
            }
        }
        let res = await getAttInfo(data);
        if (res.code == "success") {
            // setData(res.data.clockIns)
            let d = []
            res.data.clockIns.forEach(r => {
                r.user.id = undefined
                d.push({
                    ...r.clockIn,
                    ...r.user,
                })
            })
            setData(d)
            setTotal(res.data.total)
        }
        setLoading(false)
    }
    useState(() => {
        getData()
    }, [])
    useEffect(() => {
        getData(form.getFieldValue())
    }, [page])
    const showDrawer = (s) => {
        setUseIn(s)
        setDrawer(true);
    };
    const onCloseDrawer = () => {
        setDrawer(false);
        setUseIn({})
    };

    const onSearch = (s) => {
        console.log(s)
        getData(s)
    }
    const onFinish = async (values) => {
        let res = await updateAttInfo(values)
        if (res.code == "success") {
            message.success(res.message)
            getData(form.getFieldValue())
        } else {
            message.error(res.message)
            getData(form.getFieldValue())
        }
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };

    const deleteAtt = async () => {
        let res = await deleteAttInfo({ id: selectedRowKeys });
        if (res.code == "success") {
            message.success(res.message)
            getData(form)
        } else {
            message.error(res.message)
            getData(form)
        }
    }

    const pageChange = (page, pageSize) => {
        setPage(page)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const publish = async () => {
        let res = await Publish({ gesture: document.getElementById("pu").value })
        if (res.code == "success") {
            message.success("发布成功")
        }
    }

    return <div>
        <Row>
            <Col span={20}>
                <Form form={form} name="control-hooks" onFinish={onSearch}>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item name="name" label="姓名">
                                <Input placeholder="请输入员工姓名" />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="status" label="状态">
                                <Select style={{ width: 120 }}
                                    options={[
                                        {
                                            value: 0,
                                            label: '未打卡',
                                        },
                                        {
                                            value: 1,
                                            label: '已打卡',
                                        },
                                    ]}
                                    placeholder="请选择状态"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="data" label="日期">
                                <Space direction="vertical">
                                    <DatePicker placeholder="请选择日期" />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    重置
                                </Button>
                                <Button onClick={deleteAtt}>删除</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={4}>
                <Space>
                    <Input id="pu" placeholder='设置签到码' />
                    <Button onClick={publish}>发布签到</Button>
                </Space>
            </Col>
        </Row>

        <Table columns={columns} dataSource={data} rowKey={r => r.id} rowSelection={rowSelection}
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, page: page, total: total, onChange: pageChange }}
            loading={loading}
        />
        <Drawer title="修改" open={drawer} onClose={onCloseDrawer} destroyOnClose={true} getContainer={false}>
            <Form onFinish={onFinish}>
                <Form.Item name="state" initialValue={useIn.state} label="打卡状态">
                    <Select
                        options={[
                            {
                                value: 1,
                                label: '已打卡',
                            },
                            {
                                value: 0,
                                label: '未打卡',
                            },
                        ]}
                        placeholder="请选择状态"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>


}
export default AttMan
