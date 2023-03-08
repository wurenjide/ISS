import React, { useState,useEffect } from 'react'
import style from "./index.module.scss";
import { Statistic, Button, Card, Avatar, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, List } from 'antd';
import ReactEcharts from 'echarts-for-react';
const AdminHome = () => {
  const xA=[]
  const x1 = []
  const x2 = []
  const item = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  useEffect(()=>{
    var temp=gettime()
    temp.forEach((t)=>{
      xA.push(t)
    })
  },[xA])
  for (let i = 0; i < 30; i++) {
    x1.push(i)
    x2.push(i % 3)
  }
  const gettime = () => {
    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 29);
    var dateTemp;
    var flag = 1;
    var day;
    var data=[];
    for (var i = 0; i < 30; i++) {
      if (myDate.getDate() < 10) {
        day = '0' + myDate.getDate().toString()
      } else {
        day = myDate.getDate().toString()
      }
      var month = myDate.getMonth() + 1;
      dateTemp = (month < 10 ? '0' + month : '' + month) + "-" + day;
      data.push(dateTemp)
      myDate.setDate(myDate.getDate() + flag);
    }
    return data
  }
  const lineOption = () => {
    const option = {
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
        id:"2",
      },
      yAxis: {},
      series: [
        {
          data: x1,
          type: 'line',
          name: "迟到人次",
          stack: 'x',
        },
        {
          data: x2,
          type: 'line',
          name: "早退人次",
          stack: 'y',
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
                relVal += '<br/>' + params[i].marker + params[i].value + '人次'
            }
            return relVal
        }
    },
    };
    return option
  }
  return <div>
    <Row gutter={16} style={{ textAlign: "center" }}>
      <Col span={6}>
        <Card>
          <Statistic title="在职员工数" value={100} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="待审核员工数" value={100} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="待审核假条" value={100} />
        </Card>
      </Col>
      <Col span={6} style={{ textAlign: "center" }}>
        <h4>近30天迟到早退人数</h4>
        <Space>
          <Card>
            <Statistic title="迟到人次" value={30} />
          </Card>
          <Card >
            <Statistic title="早退人次" value={30} />
          </Card>
        </Space>
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: 20 }}>
      <Col span={18}>
        <ReactEcharts
        style={{width: "925px",
          height: "254px",}}
          option={lineOption()}
        ></ReactEcharts>
      </Col>
      <Col span={6}>
        <h3 style={{ textAlign: "center" }}>昨日迟到早退员工</h3>
        <List itemLayout="horizontal"
        dataSource={item}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar />}
              description="02-13"
            />
          </List.Item>
        )}/>
      </Col>
    </Row>
  </div >

}
export default AdminHome
