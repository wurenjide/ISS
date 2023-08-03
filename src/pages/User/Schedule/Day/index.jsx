import React, { useState } from 'react'
import { Table, Radio, Space, DatePicker, Button, Tooltip, Form, Input, TimePicker, Row, Col } from 'antd';
import styles from "./index.module.scss"
import dayjs from 'dayjs';
import qs from "qs"
import { getDayInfo } from "../../../../api/Admin/ScheduleMan"
const Day = () => {


    const [data, setData] = useState([])
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [form] = Form.useForm()

    const getData = async () => {
        let time=form.getFieldValue("time")!="Invalid Date"?form.getFieldValue("time"):dayjs().format("YYYY-MM-DD")
        let res = await getDayInfo({ store_id: user.storeId, date: dayjs(form.getFieldValue("time")).format("YYYY-MM-DD") })
        let data1 = []
        console.log(res.data.dayShiftList)
        res.data.dayShiftList.forEach((r) => {
            if (r.user != null && r.user != undefined) {
                var data2 = data1.findIndex(d => d.name === r.user.name)
                if (data2 != null && data2 != undefined && data2 != -1) {
                    data1[data2].data.push({
                        key: r.id,
                        startTime: r.startTime,
                        endTime: r.endTime=="00:00:00"?"24:00:00":r.endTime,
                        career: r.user.career,
                    })
                } else {
                    data1.push({
                        name: r.user.name,
                        data: [{
                            key: r.id,
                            startTime: r.startTime,
                            endTime: r.endTime=="00:00:00"?"24:00:00":r.endTime,
                            career: r.user.career,
                        }],
                    })
                }
            }
        })
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
    const onChange = () => {
        getData()
    }

    return (<div>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
            <Form form={form}>
                <Row gutter={20}>
                    <Col>
                        <Form.Item name="time">
                            <DatePicker onChange={onChange} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
        <div className={styles.meetingCard}>
            <div className={styles.rowHead}>
                {data.map(data => (<div className={styles.week}>{data.name}</div>))}
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
                                    <Tooltip title={'职位：' + data.career}>
                                        <div key={data.key} className={styles.meetingSpan}
                                            style={{
                                                width: `${100 / 20 * timeInterval(data.startTime, data.endTime)}%`,
                                                left: `${100 / 20 * timeInterval('06:00:00', data.startTime)}%`,
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
                    <span className={styles.timeSpan}>24:00</span>
                </div>
            </div>
        </div>
    </div>)
}
export default Day