import React, { useState } from 'react'
import { Table, Radio, Space, DatePicker, Button, Tooltip, Form, Input, TimePicker, Modal } from 'antd';
import styles from "./index.module.scss"
const Day = () => {


    const data = [
        {
            name: "aa1",
            data: [
                {
                    key: 1,

                    start_time: "06:00:00",
                    end_time: "10:00:00",
                    carrer: "保洁",
                },
                {
                    key: 2,
                    start_time: "12:00:00",
                    end_time: "14:00:00", carrer: "保洁",
                },
            ]
        },
        {
            name: "aa2",
            data: [
                {
                    key: 1,
                    start_time: "06:00:00",
                    end_time: "10:00:00", carrer: "保洁",
                },
                {
                    key: 2,
                    start_time: "12:00:00",
                    end_time: "14:00:00", carrer: "保洁",
                },
            ]
        },
        {
            name: "aa3",
            data: [
                {
                    key: 1,
                    start_time: "06:00:00",
                    end_time: "10:00:00", carrer: "保洁",
                },
                {
                    key: 2,
                    start_time: "12:00:00",
                    end_time: "14:00:00", carrer: "保洁",
                },
            ]
        },
    ]

    const timeInterval = (start, end) => {
        const t1 = new Date(`2017-1-1 ${start}`);
        const t2 = new Date(`2017-1-1 ${end}`);
        const interval = t2.getTime() - t1.getTime();
        if (interval < 0) return 0;
        console.log((interval / 1000 / 60 / 60).toFixed(2))
        return (interval / 1000 / 60 / 60).toFixed(2)
    }


    return (<div>

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
                                    <Tooltip title={'工作：' + data.carrer}>
                                        <div key={data.key} className={styles.meetingSpan}
                                            style={{
                                                width: `${100 / 18 * timeInterval(data.start_time, data.end_time)}%`,
                                                left: `${100 / 18 * timeInterval('06:00:00', data.start_time)}%`,
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