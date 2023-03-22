import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getWeekInfo } from "../../../../api/Admin/ScheduleMan"
import { Table, Radio, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Avatar } from 'antd';
const { RangePicker } = TimePicker;
// import style from "./index.module.scss";

const Week = () => {
    const [id,setID]=useState(localStorage.getItem("id"));
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])



    const getData = async (value) => {
        setLoading(true)
        let res = await getWeekInfo(value)
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
    const onChangeTime = (time) => {
        // console.log(time)
        setValue(time);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staff, setStaff] = useState({});
    const onChange = (e) => {
        // console.log(dayjs(e).day(1).format("YYYY-MM-DD"),dayjs(e).day(7).format("YYYY-MM-DD"));
    };
    const onChangeStaff = (staff) => {
        setStaff(staff)
    }
    const showModal = (e) => {
        onChangeStaff(e)
        setIsModalOpen(true)
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
                            <div>{day.name}</div>
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
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <div>{day.name}</div>
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
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <div>{day.name}</div>
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
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <div>{day.name}</div>
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
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <div>{day.name}</div>
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
                        <Avatar src={day.avatar} />
                        <Space direction="vertical" size={1}>
                            <div>{day.name}</div>
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
                            <div>{day.name}</div>
                            <div>职位：{day.career}</div>
                        </Space>
                    </Space>
                </div>
                )
            }
        },
    ]

    return (<div>
        <div style={{ float: "left", padding: "10px" }}>
            <Space>
                <Button>导出本周数据</Button>
                <Button onClick={()=>{getData({id:id})}}>仅看本人</Button>
            </Space>
        </div>
        <div style={{ float: "right", padding: "10px" }}>
            <Space>
                <DatePicker onChange={onChange} picker="week" defaultValue={dayjs().day(1)} />
            </Space>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ position: ["none"] }}
            loading={loading}
            bordered />
    </div>)
}
export default Week