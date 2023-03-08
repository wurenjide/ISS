import React, { useState } from 'react'
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';
import { getWeekInfo } from "../../../../api/Admin/ScheduleMan"
import { Table, Radio, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Drawer, Select, Avatar } from 'antd';
const { RangePicker } = TimePicker;
// import style from "./index.module.scss";

const Week = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staff, setStaff] = useState({});
    const [drawer, setDrawer] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [data, setData] = useState([])
    const [employee, setEmployee] = useState({ name: "请选择员工" })
    const [loading,setLoading]=useState(false)



    const getData = async () => {
        setLoading(true)
        let res = await getWeekInfo()
        let monday = []
        let tuesday = []
        let wednesday = []
        let thursday = []
        let friday = []
        let saturday = []
        let sunday = []
        let data1 = []
        res.date.week.forEach((e) => {
            switch (dayjs(e.date).day()) {
                case 1:
                    monday.push(e)
                    break;
                case 2:
                    tuesday.push(e)
                    break;
                case 3:
                    wednesday.push(e)
                    break;
                case 4:
                    thursday.push(e)
                    break;
                case 5:
                    friday.push(e)
                    break;
                case 6:
                    saturday.push(e)
                    break;
                case 0:
                    sunday.push(e)
                    break;
                default:
                    break;
            }
        })
        for (let i = 0; i < 5; i++) {
            data1.push({
                key: i,
                monday: monday[i],
                tuesday: tuesday[i],
                wednesday: wednesday[i],
                thursday: thursday[i],
                friday: friday[i],
                saturday: saturday[i],
                sunday: sunday[i],
            })
        }
        setData(data1)
        setLoading(false)
    }
    useState(() => {
        getData()
    })

    const showDrawer = () => {
        setDrawer(true);
    };
    const onClose = () => {
        setDrawer(false);
        setEmployee({ name: "请选择员工" })
    };
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    const [value, setValue] = useState(null);
    const onChangeTime = (time) => {
        setValue(time);
    };

    const onChange = (e) => {
        getData()
    };
    const onChangeStaff = (staff) => {
        setStaff(staff)
    }
    const showModal = (e) => {
        onChangeStaff(e)
        setIsModalOpen(true)
    }
    const onFinish = (values) => {
        handleCancel()
        console.log(values);
    };
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const columns = [
        {
            title: "星期一",
            dataIndex: "monday",
            render: (_, s) => {
                let day = s.monday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期二",
            dataIndex: "tuesday",
            render: (_, s) => {
                let day = s.tuesday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar}  />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期三",
            dataIndex: "wednesday",
            render: (_, s) => {
                let day = s.wednesday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar}  />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期四",
            dataIndex: "thursday",
            render: (_, s) => {
                let day = s.thursday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar}  />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期五",
            dataIndex: "friday",
            render: (_, s) => {
                let day = s.friday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar}  />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期六",
            dataIndex: "saturday",
            render: (_, s) => {
                let day = s.saturday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar}/>
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
        {
            title: "星期七",
            dataIndex: "sunday",
            render: (_, s) => {
                let day = s.sunday
                return (<div style={{ textAlign: "center" }}>
                    <div>{day.start_time}-{day.end_time}</div>
                    <Space size={10}>
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <a onClick={() => { showModal(day) }}>{day.name}</a>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
    ]
    const addStaff = () => {
        showDrawer()
    }
    const changeEmployee = () => {
        setEmployee({ name: "aa", id: "ss" })
        console.log(employee)
        onChildrenDrawerClose()
    }
    return (<div>
        <div style={{ float: "left", padding: "10px" }}>
            <Button>导入</Button>
        </div>
        <div style={{ float: "right", padding: "10px" }}>
            <Space>
                <DatePicker onChange={onChange} picker="week" defaultValue={dayjs().day(1)} />
            </Space>
        </div>
        <Modal title="员工信息" open={isModalOpen} onCancel={handleCancel} footer={[null]} destroyOnClose={true}>
            <div>姓名：<span>{staff.name}</span></div>
            <div>年龄：<span>{staff.age}</span></div>
            <div>手机号：<span>{staff.phone}</span></div>
            <div>职位：<span>{staff.career}</span></div>
            <Form onFinish={onFinish}>
                <Form.Item initialValue={staff.id} name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="工作时间段" name="workTime" initialValue={[dayjs(staff.start_time, 'HH:mm:ss'), dayjs(staff.end_time, 'HH:mm:ss')]}>
                    <RangePicker onChange={onChangeTime} format={"HH:mm:ss"} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button>确认</Button>
                        <Button>取消</Button>
                        <Button>删除</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
        <Table columns={columns} dataSource={data} pagination={{ position: ["none"] }}
        loading={loading}
        bordered />
        <Drawer
            title="添加"
            closable={false}
            onClose={onClose}
            open={drawer}
            destroyOnClose={true}>
            <Form>
                <Form.Item label="日期">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="时间段">
                    <TimePicker.RangePicker />
                </Form.Item>
                <Form.Item label="职位">
                    <Select options={
                        [{
                            value: "1",
                            label: "保洁",
                        },
                        {
                            value: "2",
                            label: "收银",
                        }
                        ]} />
                </Form.Item>
                <Form.Item>
                    <Button onClick={showChildrenDrawer}>{employee.name}</Button>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button htmlType="submit">提交</Button>
                        <Button>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Drawer title="空闲员工" closable={false} onClose={onChildrenDrawerClose} open={childrenDrawer}>
                <a onClick={changeEmployee}>aa</a>
            </Drawer>
        </Drawer>
    </div>)
}
export default Week