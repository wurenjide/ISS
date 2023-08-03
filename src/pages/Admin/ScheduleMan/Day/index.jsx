import React, { useState } from 'react'
import styles from "./index.module.scss"
import dayjs from 'dayjs';
import { Table, Select, Space, DatePicker, Button, Row, Col, Form, Input, TimePicker, Tooltip } from 'antd';
import { render } from '@testing-library/react';
import { getDayInfo } from "../../../../api/Admin/ScheduleMan"
import qs from "qs"
import careers from '../../../../assets/career';
const Day = () => {

    const [data, setData] = useState([])
    const [form] = Form.useForm()
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))

    const getData = async () => {
        let data = {
            store_id: user.storeId,
            date: dayjs(form.getFieldValue("time")).format("YYYY-MM-DD"),
            position: form.getFieldValue("position"),
            employeeName: form.getFieldValue("employeeName"),
        }
        let res = await getDayInfo(data)
        let data1 = []
        res.data.dayShiftList.forEach((r) => {
            if (r.user != null && r.user != undefined) {
                var data2 = data1.findIndex(d => d.name === r.user.name)
                if (data2 != null && data2 != undefined && data2 != -1) {
                    console.log(data2, "data2")
                    data1[data2].data.push({
                        key: r.id,
                        startTime: r.startTime,
                        endTime: r.endTime,
                        career: r.user.career,
                    })
                } else {
                    data1.push({
                        name: r.user.name,
                        data: [{
                            key: r.id,
                            startTime: r.startTime,
                            endTime: r.endTime,
                            career: r.user.career,
                        }],
                    })
                }
            }
        })
        console.log(data1, "data1")
        setData(data1)

    }

    useState(() => {
        getData()
    })

    const timeInterval = (start, end) => {
        const t1 = new Date(`2017-1-1 ${start}`);
        const t2 = new Date(`2017-1-1 ${end}`);
        const interval = t2.getTime() - t1.getTime();
        if (interval < 0) return 0;
        return (interval / 1000 / 60 / 60).toFixed(2)
    }
    const onSearch = () => {
        getData()
    }

    return (<div>
            <div style={{ display:"flex", justifyContent:"flex-end", padding: "10px" }}>
                <Form onFinish={onSearch} form={form}>
                    <Row gutter={20}>
                        <Col>
                            <Form.Item name="employeeName">
                                <Input placeholder='请输入员工姓名' />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="position">
                                <Select options={careers} placeholder='请选择员工职位' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="time">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button htmlType="submit">搜索</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </div>
        <div className={styles.meetingCard}>
            <div className={styles.rowHead}>
                {data.map(data => (<div key={data.name} className={styles.week}>{data.name}</div>))}
            </div>
            <div className={styles.rowBody} >
                <table>
                    {data.map(data => (<tbody key={data.name}>
                        <tr>
                            <td></td><td></td><td></td>
                            <td></td><td></td><td></td>
                            <td></td><td></td><td></td>
                            <td></td><td></td><td></td>
                            <td></td><td></td><td></td>
                            <td></td><td></td><td></td>
                            {
                                data.data.map((data) => (
                                    <Tooltip title={'工作：' + data.career}>
                                        <div key={data.id} className={styles.meetingSpan}
                                            style={{
                                                width: `${100 / 18 * timeInterval(data.startTime, data.endTime)}%`,
                                                left: `${100 / 18 * timeInterval('06:00:00', data.startTime)}%`,
                                            }} />
                                    </Tooltip>
                                ))
                            }
                        </tr>
                    </tbody>))}
                </table>
                <div className={styles.timeCard}>
                    <span className={styles.timeSpan}>6:00</span>
                    <span className={styles.timeSpan}>8:00</span>
                    <span className={styles.timeSpan}>10:00</span>
                    <span className={styles.timeSpan}>12:00</span>
                    <span className={styles.timeSpan}>14:00</span>
                    <span className={styles.timeSpan}>16:00</span>
                    <span className={styles.timeSpan}>18:00</span>
                    <span className={styles.timeSpan}>20:00</span>
                    <span className={styles.timeSpan}>22:00</span>
                </div>
            </div>
        </div>
    </div>)
}
export default Day