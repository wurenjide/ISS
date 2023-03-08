import React, { useState } from 'react'
import styles from "./index.module.scss"
import dayjs from 'dayjs';
import { Table, Radio, Space, DatePicker, Button, Modal, Form, Input, TimePicker, Tooltip } from 'antd';
import { render } from '@testing-library/react';
const Day = () => {

    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    // };
    // const columns = [
    //     {
    //         title: "姓名",
    //         dataIndex: "name",
    //         width: "100px"
    //     },
    //     {
    //         title: "早上",
    //         dataIndex: "morning",
    //         render: () => (<>
    //             <div>
    //                 <Space>
    //                     <div>
    //                         职位：保洁
    //                     </div>
    //                     <div>
    //                         时间段：10:12-12:20
    //                     </div>
    //                 </Space>
    //             </div>
    //         </>)
    //     },
    //     {
    //         title: "上午",
    //         dataIndex: "forenoon",
    //         render: () => (<>
    //             <div>
    //                 <Space>
    //                     <div>
    //                         职位：保洁
    //                     </div>
    //                     <div>
    //                         时间段：10:12-12:20
    //                     </div>
    //                 </Space>
    //             </div>
    //         </>)
    //     },
    //     {
    //         title: "下午",
    //         dataIndex: "afternoon",
    //         render: () => (<>
    //             <div>
    //                 <Space>
    //                     <div>
    //                         职位：保洁
    //                     </div>
    //                     <div>
    //                         时间段：10:12-12:20
    //                     </div>
    //                 </Space>
    //             </div>
    //         </>)
    //     },
    //     {
    //         title: "晚上",
    //         dataIndex: "evening",
    //         render: () => (<>
    //             <div>
    //                 <Space>
    //                     <div>
    //                         职位：保洁
    //                     </div>
    //                     <div>
    //                         时间段：10:12-12:20
    //                     </div>
    //                 </Space>
    //             </div>
    //         </>)
    //     },
    //     {
    //         title: "操作",
    //         key: "operation",
    //         fixed: 'right',
    //         width: 110,
    //         render: () => (<div>
    //             <Button>修改</Button>
    //             <Button>删除</Button>
    //         </div>)
    //     }
    // ]
    // const data = [
    //     {
    //         key: "aaa",
    //         id: "qqq",
    //         name: "aaaa",
    //         times: [{ id: "aaa", s: "04:06:06", e: "10:06:06" }]
    //     },
    //     {
    //         key: "aaa1",
    //         id: "qqq",
    //         name: "aaaa",
    //         times: [{ id: "aaa", s: "04:06:06", e: "10:06:06" }]
    //     }
    // ]


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
                    start_time: "11:00:00",
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
                    end_time: "11:00:00", 
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
            name: "aa3",
            data: [
                {
                    key: 1,
                    start_time: "10:00:00",
                    end_time: "13:00:00", carrer: "保洁",
                },
                {
                    key: 2,
                    start_time: "13:00:00",
                    end_time: "13:30:00", carrer: "保洁",
                },
            ]
        },
    ]

    const weekRows = [
        { key: 'Monday' },
        { key: 'Tuesday' },
        { key: 'Wednesday' },
        { key: 'Thursday' },
        { key: 'Friday' },
        { key: 'Saturday' },
        { key: 'Sunday' },
    ];

    const dataSource = [
        {
            day: 'Monday',
            data: [{
                key: 1,
                title: '123',
                start: '09:00:00',
                end: '10:00:00'
            }],
        },
        {
            day: 'Friday',
            data: [{
                key: 1,
                title: '123',
                start: '11:00:00',
                end: '13:00:00'
            }],
        }

    ];


    const timeInterval = (start, end) => {
        const t1 = new Date(`2017-1-1 ${start}`);
        const t2 = new Date(`2017-1-1 ${end}`);
        const interval = t2.getTime() - t1.getTime();
        if (interval < 0) return 0;
        console.log((interval / 1000 / 60 / 60).toFixed(2))
        return (interval / 1000 / 60 / 60).toFixed(2)
    }


    return (<div>
        {/* <div  style={{ float: "right", padding: "10px" }}>    
        <Space>
            <DatePicker onChange={onChange} />
            <Button>添加</Button>
        </Space>
        </div>
        <Table columns={columns} dataSource={data} pagination={{ position: ["none"] }} /> */}

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
                                    <Tooltip title={'工作：'+data.carrer}>
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