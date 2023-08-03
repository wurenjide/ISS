import React, { useState, useImperativeHandle } from 'react'
import dayjs from 'dayjs';
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getWeekInfo, upExecel, addWeekInfo, getAlloweStaff, inSchedule, deleteSchedule } from "../../../../api/Admin/ScheduleMan"
import { Table, message, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Drawer, Select, Avatar, Upload, Badge, Divider, Row, Col } from 'antd';
import qs from "qs"
import { getStoreById } from '../../../../api/Admin/Store';
import careers from '../../../../assets/career';
import { publicIp } from '../../../../config/apiUrl';
const { RangePicker } = TimePicker;

const Week = () => {
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
    const [drawer2, setDrawer2] = useState(false)
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [data, setData] = useState([])
    const [employee, setEmployee] = useState({ name: "请选择员工" })
    const [loading, setLoading] = useState(false)
    const [kong, setKong] = useState([])
    const [allowStaff, setAllowStaff] = useState([])
    const [career, setCareer] = useState()
    const [form] = Form.useForm()
    const [badge, setBadge] = useState(0);
    const [form2] = Form.useForm();
    const [startT, setStartT] = useState(dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'))
    const [endT, setEndT] = useState(dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'))

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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
                            <div>开放班次</div>
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
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
                return (<div style={{ textAlign: "center" }} key={day.id}>
                    {user != "" && user != null && user != undefined ? <>
                        <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                        <Space size={10}>
                            <Avatar src={user.avatar} />
                            <Space direction="vertical" size={1}>
                                <a onClick={() => { showDrawer2(day) }}>{user.name}</a>
                                <div>职位：{user.career}</div>
                            </Space>
                        </Space>
                    </>
                        : <div style={{ cursor: "pointer" }} onClick={() => showDrawer2(day)}>
                            <div>{day.startTime.slice(0,5)}-{day.endTime.slice(0,5)}</div>
                            <PlusOutlined />
                            <div>开放班次</div>
                        </div>
                    }
                </div>
                )
            }
        },
    ]

    const getData = async () => {
        setLoading(true)
        let data = {
            store_id: user.storeId,
            startTime: dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'),
            endTime: dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'),
            position: form.getFieldValue("position"),
            employeeName: form.getFieldValue("employeeName"),
        }
        let res = await getWeekInfo(data)
        if (res.code == 20000) {
            let data1 = []
            let max = 0
            setBadge(res.data.count)
            let r = [[], [], [], [], [], [], []]


            res.data.weekShiftList.forEach(((item) => {
                //将当前值item与max比较
                max = max > item.length ? max : item.length
            }))
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < 7; j++) {
                    if (res.data.weekShiftList && res.data.weekShiftList[j] && res.data.weekShiftList[j][i]) {
                        r[j].push(res.data.weekShiftList[j][i])
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
            if (res.data == {}) {
                message.error("暂无数据")
            } else {
                message.error(res.message)
            }
        }
        setLoading(false)
        let c = []
        c.push({
            label: "全部职业",
            value: "all"
        })
        c.push.apply(c, careers)
        setCareer(c)
    }
    useState(() => {
        getData()
    })

    const onClose = () => {
        setDrawer2(false)
        setEmployee({ name: "请选择员工" })
    };
    const showChildrenDrawer = async (values) => {
        let data = {
            storeId: user.storeId,
            date: values.date,
            startTime: values.startTime,
            endTime: values.endTime,
            startDate: dayjs(values.date).startOf('week').format('YYYY-MM-DD'),
            endDate: dayjs(values.date).endOf('week').format('YYYY-MM-DD'),
            allowCareer: values.allowCareer.toString()
        }
        let res = await getAlloweStaff(data);
        if (res.code == 20000) {
            setAllowStaff(res.data.userList)
            setChildrenDrawer(true);
        } else {
            message.error("请求失败")
        }
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    const changeEmployee = (value) => {
        setEmployee(value)
        onChildrenDrawerClose()
    }
    const showDrawer2 = (value) => {
        if (value.user) {
            setEmployee(value.user)
        }
        setKong(value)
        form2.setFieldsValue(value)
        console.log(value)
        form2.setFieldValue("shiftId", value.id)
        form2.setFieldValue("date", dayjs(value.date))
        form2.setFieldValue("time", [dayjs(value.startTime, "HH:mm:ss"), dayjs(value.endTime, "HH:mm:ss")])
        form2.setFieldValue("allowCareer", value.allowCareer.split(","))
        setDrawer2(true)
    }
    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            let file = new FormData()
            file.append('file', info.file.originFileObj, { enctype: 'multipart/form-data' })
            console.log(file)
            const res = await upExecel(file, user.storeId, 100);
            if (res.code == 20000) {
                message.success("上传成功")
                getData()
            } else {
                message.error(res.message)
            }
            console.log(res)
        }
    };
    const onInSchedule = async (value) => {
        console.log(value)
        let data = {
            employeeId: employee.id,
            shiftId: value.shiftId,
            allowCareer: value.allowCareer.toString()
        }
        let res = await inSchedule(data)
        if (res.code == 20000) {
            getData()
            onClose()
        }
    }
    const deleteS = async (value) => {
        console.log(value)
        let res = await deleteSchedule(value)
        if (res.code == 20000) {
            onClose()
        }
    }
    const addWeekSchedule = async () => {
        if (form.getFieldValue("time")) {

            console.log(dayjs(form.getFieldValue("time")).format("YYYY-MM-DD"))
            let res = await addWeekInfo({ store_id: user.storeId, startTime: dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'), endTime: dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD') })
            if (res.code == 20000) {
                message.success("成功")
                getData()
            }
        } else {
            message.warning("请选择排班时间")
        }
    }
    const onSearch = () => {
        console.log(form.getFieldValue("time"))
        getData()
    }
    const onChangeTime = () => {
        setStartT(dayjs(form.getFieldValue("time")).startOf('week').format('YYYY-MM-DD'))
        setEndT(dayjs(form.getFieldValue("time")).endOf('week').format('YYYY-MM-DD'))
    }

    return (<div>
        <div style={{ float: "left", padding: "10px" }}>
            <Space>
                <Upload
                    customRequest={handleChange}
                    onChange={handleChange}
                    showUploadList={false}
                    name="file">
                    <Button icon={<UploadOutlined />}>上传</Button>
                </Upload>
                <a href={publicIp + "/service_schedule/admin/work-form/getShiftsExcel/" + user.storeId + "/" + startT + "/" + endT}><Button icon={<DownloadOutlined />} >导出本周数据</Button></a>

            </Space>
        </div>
        <div style={{ float: "right", padding: "10px" }}>
            <Space>
                <Form onFinish={onSearch} form={form}>
                    <Row gutter={20}>
                        <Col>
                            <Form.Item name="employeeName">
                                <Input placeholder='请输入员工姓名' />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="position">
                                <Select options={careers} placeholder='请选择班次允许职位' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="time">
                                <DatePicker picker="week" initialValue={dayjs().day(1)} onChange={onChangeTime} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Badge count={badge}>
                                <Button onClick={addWeekSchedule}>排班</Button>
                            </Badge>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button htmlType="submit">搜索</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Space>
        </div>
        <Table columns={columns} dataSource={data} pagination={false}
            loading={loading}
            bordered />
        <Drawer open={drawer2} onClose={onClose} title="更换班次人员">
            <div key={kong.id}>
                <Form onFinish={onInSchedule} form={form2}>
                    <Form.Item name="shiftId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="日期" name="date"
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="时间段" name="time"
                    >
                        <TimePicker.RangePicker secondStep={60} minuteStep={30} />
                    </Form.Item>
                    {career ? <Form.Item name="allowCareer" label="该班次允许的职位">
                        <Select options={career} mode="multiple" />
                    </Form.Item> : <></>}

                    <Form.Item>
                        <Button onClick={() => showChildrenDrawer(kong)}>{employee.name}</Button>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button htmlType="submit">提交</Button>
                            <Button onClick={() => deleteS(kong)}>删除</Button>
                        </Space>
                    </Form.Item>
                    {kong.user ? <>
                        <Divider />
                        <Form.Item>
                            <div>
                                <div>
                                    姓名：{kong.user.name}
                                </div>
                                <div>手机号：{kong.user.phone}</div>
                                <div>职位：{kong.user.career}</div>
                            </div>
                        </Form.Item>
                    </> : <></>}
                </Form>
                <Divider />
            </div>
            <Drawer title="空闲员工" closable={false} onClose={onChildrenDrawerClose} open={childrenDrawer}>
                {allowStaff ? allowStaff.map(a => (<>
                    <Space>
                        <div>
                            姓名：{a.name}
                            <div>手机号：{a.phone}</div>
                            <div>当日工作时长：{a.dayWorkTime}</div>
                            <div>当周工作时长:{a.weekWorkTime}</div>
                        </div>
                        <Button onClick={() => changeEmployee({ id: a.id, name: a.name })}>选择</Button>
                    </Space>
                    <Divider />
                </>
                )) : <></>}
            </Drawer>
        </Drawer>
    </div>)
}
export default Week