import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import qs from "qs"
import { getWeekInfo } from "../../../api/Admin/ScheduleMan"
import { Table, message, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Avatar } from 'antd';
const { RangePicker } = TimePicker;
// import style from "./index.module.scss";

const Week = () => {
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [id, setID] = useState(localStorage.getItem("id"));
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [form] = Form.useForm()



    const getData = async (value) => {
        setLoading(true)
        let data = {
            store_id: user.storeId,
            startTime: dayjs().startOf('week').format('YYYY-MM-DD'),
            endTime: dayjs().endOf('week').format('YYYY-MM-DD'),
            position: user.career,
            employeeName: user.name
        }
        let res = await getWeekInfo(data)
        if (res.code == 20000) {
            let data1 = []
            let max = 0
            let r = [[],[],[],[],[],[],[]]

            res.data.weekShiftList.forEach(((item) => {
                //将当前值item与max比较
                max = max > item.length ? max : item.length
            }))
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < 7; j++) {
                    if (res.data.weekShiftList&&res.data.weekShiftList[j]&&res.data.weekShiftList[j][i]) {
                        if (res.data.weekShiftList[j][i].user) {
                            r[j].push(res.data.weekShiftList[j][i])
                            console.log(r[j])
                        }
                    }
                }
            }
            max = 0
            r.forEach(((item) => {
                //将当前值item与max比较
                max = max > item.length ? max : item.length
            }))

            for (let i = 0; i < max; i++) {
                data1.push({
                    key: i,
                    monday: r[0][i],
                    tuesday: r[1][i],
                    wednesday: r[2][i],
                    thursday: r[3][i],
                    friday: r[4][i],
                    saturday: r[5][i],
                    sunday: r[6][i],
                })
            }
            message.success(res.message)
            setData(data1)
        } else {
            message.error("获取排班数据失败")
        }
        setLoading(false)
    }
    useState(() => {
        getData()
    })
    const onChangeTime = (time) => {
        setValue(time);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staff, setStaff] = useState({});
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
    const columns = [
        {
            title: "星期一",
            dataIndex: "monday",
            render: (_, s) => {
                let day = s.monday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div hidden>
                            {/* <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <div>开放班次</div> */}
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期二",
            dataIndex: "tuesday",
            render: (_, s) => {
                let day = s.tuesday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期三",
            dataIndex: "wednesday",
            render: (_, s) => {
                let day = s.wednesday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期四",
            dataIndex: "thursday",
            render: (_, s) => {
                let day = s.thursday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期五",
            dataIndex: "friday",
            render: (_, s) => {
                let day = s.friday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期六",
            dataIndex: "saturday",
            render: (_, s) => {
                let day = s.saturday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
        {
            title: "星期日",
            dataIndex: "sunday",
            render: (_, s) => {
                let day = s.sunday
                if (day == undefined && day == null) {
                    return (<></>)
                }
                let user = ""
                if (day != undefined && day != null && day.user != undefined && day.user != null) {
                    user = day.user
                }
                return (<div style={{ textAlign: "center" }}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <div>{user.name}</div>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>

                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
    ]

    return (<div>
        <Table columns={columns} dataSource={data} pagination={{ position: ["none"] }}
            loading={loading}
            // scroll={{ x: "100%", y: "100%" }}
            bordered />
    </div>)
}
export default Week