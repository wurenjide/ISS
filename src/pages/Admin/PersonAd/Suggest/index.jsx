import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Radio, DatePicker, Upload, message, List, Space } from 'antd';
const Suggest = () => {

    const data = [
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

    return <div>
        <List
            pagination={{  hideOnSinglePage: true, pageSize: 5 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        title={<span>{item.title}</span>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <Space>
                        <div>2020-03-13</div>
                        <a>删除</a>
                    </Space>

                </List.Item>
            )}
        />
    </div>
}
export default Suggest