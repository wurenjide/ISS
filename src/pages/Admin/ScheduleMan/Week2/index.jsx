import React, { useState } from 'react'
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';
import { getWeekInfo } from "../../../../api/Admin/ScheduleMan"
import { Table, Radio, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Drawer, Select, Avatar, Divider } from 'antd';
const { RangePicker } = TimePicker;

const Week2 = () => {

    const [data, setData] = useState([])


    const getData = () => {
        let data = []
        for (let i = 0; i < 5; i++) {
            data.push({
                name: "aaa" + i,
                monday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                tuesday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                wednesday:[
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                thursday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                friday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                saturday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
                sunday: [
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                    {
                        id: "12",
                        start_time: "16:30",
                        end_time: "18:30",
                        career: "保洁" + i,
                    },
                ],
            })
        }
        setData(data)
    }

    useState(() => {
        getData()
    }, [])

    const showModal = (e) => {
    }

    const columns = [
        {
            title: "员工",
            dataIndex: "name",
        },
        {
            title: "星期一",
            dataIndex: "monday",
            render: (_, s) => {
                let d = s.monday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期二",
            dataIndex: "tuesday",
            render: (_, s) => {
                let d = s.tuesday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期三",
            dataIndex: "wednesday",
            render: (_, s) => {
                let d = s.wednesday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期四",
            dataIndex: "thursday",
            render: (_, s) => {
                let d = s.thursday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期五",
            dataIndex: "friday",
            render: (_, s) => {
                let d = s.friday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期六",
            dataIndex: "saturday",
            render: (_, s) => {
                let d = s.saturday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
        {
            title: "星期七",
            dataIndex: "sunday",
            render: (_, s) => {
                let d = s.sunday
                return d.map(day => {
                    return (<div style={{ textAlign: "center" }}>
                        {d[0] == day ? <></> : <Divider />}
                        <div>班次时间：{day.start_time}-{day.end_time}</div>
                        <Space size={10}>
                            <Space direction="vertical" size={1}>
                                <div>职位：{day.career}</div>
                            </Space>
                        </Space>
                    </div>)
                })
            }
        },
    ]

    return <>
        <Table columns={columns} dataSource={data} rowKey={r => r.name} bordered={true}/>
    </>

}
export default Week2;