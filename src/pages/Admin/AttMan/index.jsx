import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table, Tag, DatePicker, Space, Drawer, TimePicker, Avatar } from 'antd';
import { getAttInfo } from "../../../api/Admin/AttMan"


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
        {
            title: '职位',
            dataIndex: 'career',
        },
        {
            title: '上班打卡时间',
            dataIndex: 'clock_in',
        },
        {
            title: '下班打卡时间',
            dataIndex: 'go_off',
        },
        {
            title: "工作时间段",
            render: (_, s) => <div>{s.start_time}-{s.end_time}</div>
        },
        {
            title: "是否打卡",
            dataIndex: "state",
            render: (state) => {
                let color = "warning"
                let tag = "错误"
                if (state == 0) {
                    color = "processing"
                    tag = "未打卡"
                } else if (state == 1) {
                    color = "success"
                    tag = "已打卡"
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
            width: 110,
            render: (s) => <div>
                <Button onClick={() => showDrawer(s)}>修改</Button>
                <Button>删除</Button>
            </div>,
        },
    ];

    const [drawer, setDrawer] = useState(false);
    const [useIn, setUseIn] = useState({})
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [loading,setLoading]=useState(false)


    const getData = async () => {
        setLoading(true)
        let res = await getAttInfo()
        console.log(res)
        if (res.code != "") {
            setData(res.data.employee)
        }
        setLoading(false)
    }
    useState(() => {
        getData()
    }, [])
    const showDrawer = (s) => {
        setUseIn(s)
        setDrawer(true);
    };
    const onCloseDrawer = () => {
        setDrawer(false);
        setUseIn({})
    };

    const onSearch=async()=>{

    }
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };

    

    return <div>
        <Form form={form} name="control-hooks" onFinish={onSearch}>
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item name="name" label="姓名">
                        <Input placeholder="请输入员工姓名" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="role" label="状态">
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
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <Table columns={columns} dataSource={data} rowKey={r => r.id}
        pagination={{position: ["bottomCenter"],showSizeChanger:false}}
        loading={loading}
        />
        <Drawer title="修改" open={drawer} onClose={onCloseDrawer} destroyOnClose={true}>
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
                    <Button  type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>


}
export default AttMan
