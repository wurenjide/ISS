import React, { useState, useEffect } from 'react'
import { Button, Statistic, Input, Select, Col, Row, Table, List, Skeleton, Divider, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
const UserHome = () => {

    const xA = []
    const x1 = []
    useEffect(() => {
        gettime()
    })
    const gettime = () => {
        var myDate = new Date();
        myDate.setDate(myDate.getDate() - 29);
        var dateTemp;
        var flag = 1;
        var day;
        for (var i = 0; i < 30; i++) {
            if (myDate.getDate() < 10) {
                day = '0' + myDate.getDate().toString()
            } else {
                day = myDate.getDate().toString()
            }
            var month = myDate.getMonth() + 1;
            dateTemp = (month < 10 ? '0' + month : '' + month) + "-" + day;
            xA.push(dateTemp)
            myDate.setDate(myDate.getDate() + flag);
        }
    }
    for (let i = 0; i < 30; i++) {
        x1.push(i)
    }

    const lineOption = () => {
        const option = {
            title:{
                show:true,
                text:"近30天内上班时长统计",
                x:"center",
                textStyle:{
                    fontSize:14
                },
                textAlign:"left",
                textVerticalAliggn:"top",
            },
            grid: {
                x: 25,
                y: 45,
                x2: 5,
                y2: 25,
                borderWidth: 1,
              },
            xAxis: {
                type: 'category',
                data: xA,
            },
            yAxis: {
                type: 'value',
                name: "小时"
            },
            series: [
                {
                    data: x1,
                    type: 'bar',
                },
            ],
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: function (params) {
                    var relVal = params[0].name
                    for (var i = 0, l = params.length; i < l; i++) {
                        relVal += '<br/>' + params[i].marker + params[i].value + '小时'
                    }
                    return relVal
                }
            },
        };
        return option;
    };
    const data = [
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
        {
            title: '排班更改',
        },
    ];

    return <div>
        <Row gutter={30}>
            <Col span={6}>
                <Card>
                    <Statistic title="近三十天打卡次数" value={60} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="工作总时长" value={60} />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic title="近三十天迟到次数" value={60} />
                </Card>
            </Col>
        </Row>
        <Row style={{marginTop:30}}>
            <Col span={18}>
                <ReactEcharts
                    option={lineOption()}
                    style={{height:"100%"}}
                ></ReactEcharts>
            </Col>
            <Col span={6}>
                <List
                header={<div style={{textAlign:"center"}}>消息通知</div>}
                    pagination={{ simple:true,defaultPageSize:3,align:'center' }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />


            </Col>
        </Row>
    </div>
}
export default UserHome;