import React, { useState } from 'react'
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Radio, DatePicker, Upload, message, InputNumber, List } from 'antd';
import qs from "qs"


const History = () => {

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            title: '消息'+i,
        })
    }

    return <div>
        <List
            pagination={{position: "bottom",align: "center",}}
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>2023-03-21</div>
                </List.Item>
            )}
        />
    </div>
}

export default History;
