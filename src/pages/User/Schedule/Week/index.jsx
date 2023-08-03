import React, { useState, useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import qs from "qs"
import { getWeekInfo } from "../../../../api/Admin/ScheduleMan"
import { DownloadOutlined } from '@ant-design/icons'
import { Table, message, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Avatar } from 'antd';
import { publicIp } from '../../../../config/apiUrl';
const { RangePicker } = TimePicker;
// import style from "./index.module.scss";

const Week = () => {
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [id, setID] = useState(localStorage.getItem("id"));
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [form] = Form.useForm()
    const [employeeName, setEmployeeName] = useState("")
    const [startT, setStartT] = useState(dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'))
    const [endT, setEndT] = useState(dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'))



    const getData = async () => {
        setLoading(true)
        let data = {
            store_id: user.storeId,
            startTime: dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'),
            endTime: dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'),
            employeeName: employeeName
        }
        let res = await getWeekInfo(data)
        if (res.code == 20000) {
            let data1 = []
            let max = 0
            let r = [[], [], [], [], [], [], []]


            res.data.weekShiftList.forEach(((item) => {
                //将当前值item与max比较
                max = max > item.length ? max : item.length
            }))
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < 7; j++) {
                    if (res.data.weekShiftList && res.data.weekShiftList[j] && res.data.weekShiftList[j][i]) {
                        if (res.data.weekShiftList[j][i].user) {
                            r[j].push(res.data.weekShiftList[j][i])
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
    useEffect(() => {
        getData()
    }, [employeeName]);
    const onChangeTime = (time) => {
        setValue(time);
    };
    const onChange = (e) => {
        setStartT(dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'))
        setEndT(dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'))
        getData()
    };
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

    const onChangeName = () => {
        if (employeeName == "") {
            setEmployeeName(user.name)
        } else {
            setEmployeeName("")
        }
    }

    return (<div>
        <div style={{ float: "left", padding: "10px" }}>
            <Space>
                <a href={publicIp+"/service_schedule/admin/work-form/getShiftsExcel/" + user.storeId + "/"+startT + "/"+endT}><Button icon={<DownloadOutlined />} >导出本周数据</Button></a>
                {employeeName ? <Button onClick={onChangeName}>查看所有</Button> : <Button onClick={onChangeName}>仅看本人</Button>}

            </Space>
        </div>
        <div style={{ float: "right", padding: "10px" }}>
            <Space>
                <Form form={form}>
                    <Form.Item name="time">
                        <DatePicker onChange={onChange} picker="week" />
                    </Form.Item>
                </Form>
            </Space>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ position: ["none"] }}
            loading={loading}
            bordered />
    </div>)
}
export default Week