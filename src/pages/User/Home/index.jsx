import React, { useState, useEffect } from 'react'
import {
    BellOutlined
} from "@ant-design/icons"
import { Button, Statistic, Input, Select, Col, Row, Tag, List, message, Divider, Card, Space } from 'antd';
import ReactEcharts from 'echarts-for-react';
import CountUp from 'react-countup';
import { clockIn, getClockIn } from "../../../api/Admin/AttMan"
import { getNoticeInfor } from "../../../api/Admin/NoticeMan"
import { getWorkTimeById } from "../../../api/Admin/ScheduleMan"
import dayjs from 'dayjs';
import style from "./index.module.scss"
import qs from "qs"
import Week from './week';
const UserHome = () => {

    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
    const [nowTime, setNowTime] = useState(dayjs())
    const [notice, setNotice] = useState();
    const [daytime, setDaytime] = useState(0);
    const [weektime, setWeektime] = useState(0);
    const [clockType, setClockType] = useState();

    const getData = async () => {
        let temp = dayjs("2000-01-01 00:00:00").format("YYYY-MM-DD HH:mm:ss")
        let data = {
            id: user.id,
            storeId: user.storeId,
            page: 1,
            time: temp,
        }
        let res = await getNoticeInfor(data)
        let time = await getWorkTimeById({ id: user.id, date: dayjs().format("YYYY-MM-DD"), startDate: dayjs().startOf('week').format('YYYY-MM-DD'), endDate: dayjs().endOf('week').format('YYYY-MM-DD') })
        if (res.code == "success") {
            setNotice(res.data.notices)
        }
        if (time.code == 20000) {
            setDaytime(time.data.user.dayWorkTime)
            setWeektime(time.data.user.weekWorkTime)
        }
    }

    const getClockInfo = async () => {
        let res = await getClockIn({ id: user.id })
        if (res.code == "success") {
            if (res.data.length == 0) {
                setClockType("未签到")
            } else {
                setClockType(res.data[res.data.length-1].signType)
                // if (res.data.length % 2 == 0) {
                //     setClockType("下班")
                // } else {
                //     setClockType("上班")
                // }
            }
        }
    }

    useState(() => {
        getClockInfo()
        getData()
    })

    useEffect(() => {
        const t = setInterval(() => {
            setNowTime(dayjs())
        }, 1000)
        return () => {  // 每次卸载都执行此函数，清楚定时器
            clearTimeout(t)
        }
    }, [])
    const formatter = (value) => <CountUp end={value} separator="," />;


    const clin = async () => {
        let time = dayjs().format("HH:mm:ss")
        let type = "上班"
        if(clockType=="未签到"){
            type="上班"
        }else if(clockType=="上班"){
            type="下班"
        }
        let res = await clockIn({ storeId: user.storeId, employeeId: user.id, gesture: document.getElementById("pu").value, signType: type })
        if (res.code == "success") {
            message.success("签到成功")
            getClockInfo()
        }else if(res.code=="fail"){
            message.error(res.message)
        }

    }

    return <div>
        <Row gutter={30}>
            <Col span={6}>
                <Card
                    className={style["cardcolor"]}
                    bodyStyle={{
                        borderRadius: 23
                    }}
                >
                    {/* <Statistic title="签到" value={60} formatter={formatter} /> */}
                    <Space style={{
                        // textAlign:"center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        {/* <span style={{whiteSpace:"nowrap"}}>上班已签到</span> */}
                        {clockType == "上班" ? <Tag color="success">上班</Tag> : (clockType == "下班" ? <Tag color="success">下班</Tag> : <Tag color="processing">未签到</Tag>)}

                        {/* <Tag color="success">上班签到</Tag> */}
                        <Space.Compact style={{ width: "100%" }}>
                            <Input size="small"
                                style={{
                                    // borderTopLeftRadius: 40, borderBottomLeftRadius: 40, 
                                    width: "100%"
                                }}
                                id="pu" placeholder='签到打卡处' />
                            <Button onClick={clin}
                            // style={{ borderBottomRightRadius: 40, borderTopRightRadius: 40 }}
                            ><BellOutlined /></Button>
                        </Space.Compact>
                    </Space>
                    <div className={style["yun"]} style={{ textAlign: "center", marginTop: 10 }}>经营客户，用心专业，客户至上！</div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className={style["cardcolor"]}>
                    <Statistic title="本日需工作时长" value={daytime} formatter={formatter} />
                </Card>
            </Col>
            <Col span={6}>
                <Card className={style["cardcolor"]}    >
                    <Statistic title="本周需工作时长" value={weektime} formatter={formatter} />

                </Card>
            </Col>
            <Col className={style["cardcolor"]} span={6} style={{ textAlign: "center", borderRadius: 23, }}>
                <Space direction="vertical" style={{
                    disply: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}>
                    <span className={style["number"]} >{nowTime.format('YYYY-MM-DD')}</span>
                    <span className={style["number"]} >{nowTime.format('HH:mm:ss')}</span>
                </Space>
            </Col>
        </Row>
        <Row style={{ marginTop: 30 }} gutter={30}>
            <Col span={18}>
                <Week />
            </Col>
            <Col span={6}>
                <Card className={style["listcolor"]}>
                    <List
                        header={<div style={{ textAlign: "center" }}>信息公告栏</div>}
                        pagination={{ simple: true, defaultPageSize: 2, align: 'center' }}
                        dataSource={notice}
                        renderItem={(item) => (
                            <List.Item key={item.notice.id}>
                                {item.notice.content}
                            </List.Item>
                        )}
                    />
                </Card>
                {/* <ReactEcharts>

</ReactEcharts> */}

            </Col>
        </Row>
    </div>
}
export default UserHome;