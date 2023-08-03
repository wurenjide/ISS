import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import { Statistic, Button, Card, Avatar, Countdown, Select, Col, Row, Table, Modal, Space, Drawer, Radio, Descriptions, List, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import CountUp from 'react-countup';
import dayjs, { Dayjs } from 'dayjs';
import { color } from 'echarts';
import qs from "qs"
import { getStoreById, getAllStore } from "../../../api/Admin/Store"
import { getHomeData, getSexData } from '../../../api/Admin/Staff';
import { getClockWeek } from "../../../api/Admin/AttMan"
const AdminHome = () => {
  const [nowTime, setNowTime] = useState(dayjs())
  const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
  const [store, setStore] = useState({ storeId: "", name: "", size: "", employeeNum: "", address: "" })
  const [stores, setStores] = useState();
  const [option, setOption] = useState();
  const [homedata, setHomedata] = useState({ userNum: 0, userPassingNum: 0, writtenPassingNum: 0 });
  const [sex, setSex] = useState({ woman: 0, man: 0 })
  const xA = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
  const [x1, setX1] = useState([])
  const [x2, setX2] = useState([])
  const getData = async () => {
    let s = await getStoreById({ storeId: user.storeId })
    if (s.code == "success") {
      if (s.data) {
        setStore(s.data)
      }
    }
  }

  const getStores = async () => {
    let ss = await getAllStore();
    if (ss.code == "success") {
      let stores = []
      ss.data.forEach(s => {
        stores.push({
          label: s.name,
          value: s.id,
        })
      })
      setStores(stores)
    }
  }
  const getHomeD = async () => {
    let res = await getHomeData()
    if (res.code == "success") {
      setHomedata(res.data)
    }
  }
  const getClockWeekInfo = async () => {
    let res = await getClockWeek(user.storeId);
    if (res.code == "success") {
      let x1 = []
      let x2 = []
      for (let i = 6; i >= 0; i--) {
        x1.push(res.data.clockInUp[i])
        x2.push(res.data.clockInDown[i])
      }
      setX1(x1)
      setX2(x2)
    }
  }
  const getSex = async () => {
    let res = await getSexData(user.storeId)
    if (res.code == "success") {
      setSex(res.data)
    }
  }
  const lineOption = () => {
    const option = {
      title: {
        text: "本周签到人数",
      },
      legend: {
        show: true
      },
      grid: {

        x: 25,
        y: 45,
        x2: 5,
        y2: 25,
        borderWidth: 1,
        containLabel: false
      },
      xAxis: {
        data: xA,
        id: "2",
      },
      yAxis: {},
      series: [
        {
          data: x1,
          type: 'line',
          name: "上班签到人次",
          stack: 'x',
        },
        {
          data: x2,
          type: 'line',
          name: "下班签到人次",
          stack: 'y',
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params) => {
          var relVal = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
            relVal += '<br/>' + params[i].marker + params[i].value + '人次'
          }
          return relVal
        }
      },
    };
    console.log(option)
    setOption(option)
  }
  useEffect(() => {
    lineOption()
  }, [x1, x2])
  useState(() => {
    getSex()
    getClockWeekInfo()
    getHomeD()
    getStores()
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

  // for (let i = 0; i < 7; i++) {
  //   x1.push(i)
  //   x2.push(i % 3)
  // }
  const formatter = (value) => <CountUp end={value} separator="," />;

  const onChangeId = (value) => {
    let data = {
      ...user
    }
    data.storeId = value
    localStorage.setItem("user", qs.stringify(data))
    message.success("修改成功")
  }

  return <div>
    <Row gutter={16}>
      <Col span={10}>
        <Card
          className={style["cardcolor"]}
          bodyStyle={{
            // backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 33%)",
            // backgroundColor: "white",
            borderRadius: 23, borderColor: "black", borderWidth: 20,
            hegiht: 111
          }}>
          <Space direction="vertical" style={{ hegiht: 111 }}>
            <Space size="large" >
              <Avatar src={user.avatar} size={111} />
              <Space direction="vertical">
                <span style={{ fontSize: 20 }}>{user.name}</span>
                <span>您当前的身份为：<span style={{ fontWeight: "bold" }}>{user.career}</span></span>
                <span>门店名称:{store.name}</span>
              </Space>
              {user.career == "超级管理员" ? (stores ? <><Select style={{ width: 100 }} options={stores} onChange={onChangeId} placeholder="门店选择" /></> : <></>) : <></>}
            </Space>
          </Space>
        </Card>
      </Col>
      <Col span={14}>
        <Card
          className={style["cardcolor"]}
        >
          <Descriptions bordered>
            <Descriptions.Item label="门店名称">{store.name}</Descriptions.Item>
            <Descriptions.Item label="门店面积">{store.size}</Descriptions.Item>
            <Descriptions.Item label="门店人数">{store.employeeNum}</Descriptions.Item>
            <Descriptions.Item label="门店地址">{store.address}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: 20 }}>
      <Col span={6}>
        <Card
          className={style["cardcolorchild"]}
          bordered >
          <Space size="large">
            <svg t="1681451336273" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17938" width="32" height="32"><path d="M949.946663 967.548249c-14.001285-96.120027-60.696594-184.567464-133.61919-251.886095-41.141081-37.979271-88.655517-67.362277-140.026042-87.181698 28.988161-15.116799 55.821419-34.725094 79.60046-58.504135 61.227453-61.228468 94.947671-142.634662 94.947671-229.224599s-33.720217-167.99613-94.947671-229.224599C694.673423 50.299671 613.266215 16.579454 526.677293 16.579454S358.681163 50.299671 297.452694 111.528139c-61.227453 61.227453-94.947671 142.634662-94.947671 229.224599s33.720217 167.99613 94.947671 229.224599c21.288165 21.28715 45.0195 39.24095 70.555553 53.61678-56.478141 19.731113-108.660688 50.843725-153.332033 92.087324-72.927671 67.330812-119.617906 155.791444-133.60701 251.923651-2.62892 18.067483 11.044511 34.492653 29.623568 35.653844l2.05137 0.127893c16.701257 1.043448 31.309528-10.730867 33.690781-26.969272 11.949915-81.509726 51.597891-156.521248 113.475976-213.651037 65.401245-60.383966 149.761167-95.195337 239.091678-99.023005 9.15453 0.769391 18.382142 1.181492 27.674716 1.181492 5.830316 0 11.634241-0.165449 17.412791-0.468943 84.832925 6.316514 164.561278 40.648793 227.006764 98.29523 61.875041 57.119638 101.527077 132.11898 113.487142 213.618556 2.383284 16.238405 16.99257 28.01069 33.693827 26.965212l2.050355-0.127893C938.906213 1002.042932 952.578629 985.615733 949.946663 967.548249zM268.481789 340.751723c0-68.96602 26.856604-133.80494 75.623584-182.57192 48.76698-48.765965 113.604885-75.623584 182.57192-75.623584s133.80494 26.856604 182.57192 75.623584c48.76698 48.76698 75.623584 113.6059 75.623584 182.57192s-26.856604 133.80494-75.623584 182.57192c-48.138678 48.137663-111.94024 74.909004-179.910519 75.591103-4.587923-0.140074-9.184981-0.217216-13.792189-0.217216-64.788169-2.730423-125.307133-29.240902-171.440117-75.373887C295.339408 474.556663 268.481789 409.717743 268.481789 340.751723z" fill="#4C4C4C" p-id="17939"></path></svg>
            <Statistic
              title="在职员工数"
              // valueStyle={{color:"#0e94ea"}}
              value={homedata.userNum} formatter={formatter} />
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          className={style["cardcolorchild"]}
          bordered>
          <Space>
            <svg t="1681449350266" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11915" width="30" height="30"><path d="M696.9 434c-42.6 0-82.8 10.2-118.5 28.3l-23.1-50.8c-17.6 11.9-37.2 20.9-58.3 26.4l27.5 60.6c-41.8 36.3-72 85.6-84.4 141.5H301.9l95-203.2c-20.9-6-40.4-15.4-57.7-27.7L231.3 640H64v320h612v-0.8c6.9 0.5 13.9 0.8 20.9 0.8 70.3 0 136.3-27.4 186-77 49.7-49.7 77.1-115.7 77.1-186 0-145-118-263-263.1-263zM128 896V704h306.1c1.8 67.6 28.9 131 76.9 179 4.5 4.5 9.2 8.9 14 13H128z m568.9 0C587.3 896 498 806.7 498 697s89.3-199 198.9-199C806.7 498 896 587.3 896 697s-89.3 199-199.1 199z" fill="#727272" p-id="11916"></path><path d="M639 254c0 65.5-33.1 123.3-83.6 157.4-17.6 11.9-37.2 20.9-58.3 26.4-15.4 4-31.5 6.1-48.1 6.1-18.1 0-35.6-2.5-52.1-7.2-20.9-6-40.4-15.4-57.7-27.7-48.5-34.3-80.2-91-80.2-155 0-105 85-190 190-190s190 85 190 190z" fill="#5280C1" p-id="11917"></path><path d="M704 704V576h-64v192h192v-64z" fill="#669E8B" p-id="11918"></path></svg>
            <Statistic
              title="待审核员工数"
              value={homedata.userPassingNum} formatter={formatter} />
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          className={style["cardcolorchild"]}
          bordered>
          <Space>
            <svg t="1681449786352" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12191" width="30" height="30"><path d="M878 127.3V256H64V127.3C64 92.4 92.7 64 127.9 64H814c35.3 0 64 28.4 64 63.3z" fill="#5280C1" p-id="12192"></path><path d="M878 256v284.5c-7.5-39.1-31.3-72.5-64-92.7V256h64z" fill="#727272" p-id="12193"></path><path d="M256 351.1h64v64h-64z" fill="#E6C37C" p-id="12194"></path><path d="M384 351.9h320v64H384z" fill="#B2B2B2" p-id="12195"></path><path d="M256 479.6h64v64h-64z" fill="#E6C37C" p-id="12196"></path><path d="M384 480.4h191v64H384z" fill="#B2B2B2" p-id="12197"></path><path d="M256 607.6h64v64h-64z" fill="#E6C37C" p-id="12198"></path><path d="M384 608.4h128v64H384z" fill="#B2B2B2" p-id="12199"></path><path d="M896.8 768l-59.1-100.2c-15.4 14.8-34.1 26.1-55 32.7l39.8 67.5H663.9l37.9-66.4c-21.1-6.1-40.1-16.9-55.8-31.3L590.2 768H521v32H128V256H64v544.7c0 34.9 28.7 63.3 63.9 63.3H521v96h439V768h-63.2z m-0.8 128H585v-64h311v64z" fill="#727272" p-id="12200"></path><path d="M880.5 567c0 39.6-16.4 75.4-42.8 100.8-15.4 14.8-34.1 26.1-55 32.7-13.3 4.2-27.5 6.5-42.2 6.5-13.5 0-26.5-1.9-38.8-5.4-21.1-6.1-40.1-16.9-55.8-31.3-27.9-25.6-45.4-62.3-45.4-103.2 0-77.4 62.7-140 140-140 27 0 52.1 7.6 73.5 20.8 32.7 20.2 56.5 53.5 64 92.7 1.6 8.5 2.5 17.3 2.5 26.4z" fill="#5280C1" p-id="12201"></path></svg>
            <Statistic title="待审核假条"
              value={homedata.writtenPassingNum} formatter={formatter} />
          </Space>
        </Card>
      </Col>
      <Col
        className={style["cardcolorchild"]}
        span={6} style={{
          textAlign: "center", backgroundColor: "white", borderRadius: 23,
        }}>
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
    <Row gutter={16} style={{ marginTop: 20 }}>
      <Col span={18}>
        {option ? <ReactEcharts
          style={{
            width: "925px",
            height: "254px",
          }}
          option={option}
        ></ReactEcharts> : <></>}

      </Col>
      <Col span={6}>
        <ReactEcharts option={{
          title: {
            text: "男女比例",
            x: "center",
          },
          series: [
            {
              color: [
                '#66a6ff',
                '#fecfef',
              ],
              type: 'pie',
              data: [
                {
                  value: sex.man,
                  name: '男'
                },
                {
                  value: sex.woman,
                  name: '女'
                },
              ],
              label: {
                show: true,
                position: "inner",
                formatter: '{c}',
              }
            }
          ],
        }}>
        </ReactEcharts>
      </Col>
    </Row>
  </div >

}
export default AdminHome
