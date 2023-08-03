import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Space, DatePicker, message, List } from 'antd';
import qs from "qs"
import { getNoticeInfor } from "../../../api/Admin/NoticeMan"


const History = () => {

    const [user] = useState(qs.parse(localStorage.getItem("user")))
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();

    const getData = async () => {
        let temp = form.getFieldValue("time") ? dayjs(form.getFieldValue("time")).format("YYYY-MM-DD") + " 00:00:00" : ""
        let data = {
            id: user.id,
            storeId: user.storeId,
            page: page,
            time: temp,
        }
        let res = await getNoticeInfor(data)
        if (res.code == "success") {
            let data1 = []
            res.data.notices.forEach(r => {
                data1.push(r.notice)
            })
            console.log(data1)
            setData(data1)
            setTotal(res.data.total)
            message.success("成功")
        }
    }
    useState(() => {
        getData()
    })

    useEffect(() => {
        getData()
    }, [page]);

    const onSearch = async (s) => {
        let res = await getData(s)
        if (res.code == "success") {
            message.success("成功")
        }
    }
    const pageChage = (page, pageSize) => {
        setPage(page)
    }

    return <div>
        <Form form={form} onFinish={onSearch}>
            <Row gutter={20}>
                <Col span={4}>
                    <Form.Item name="time" label="搜索时间段">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Button htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <List
            pagination={{ position: "bottom", align: "center", page: page, total: total, pageChage: pageChage }}
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    extra={<Space style={{ minWidth: 127 }}>
                        <div>{item.createTime}</div>
                    </Space>}
                >
                    <p style={{ maxWidth: 1300 }}>{item.content}</p>
                </List.Item>
            )}
        />
    </div>
}

export default History;
