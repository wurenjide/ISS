import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Col, Row, Table, Avatar, Radio, DatePicker, Upload, message, List, Space } from 'antd';
import qs from "qs";
import { getSuggestInfo, deleteSuggestInfo } from "../../../api/Admin/SuggestMan";
const SuggestMan = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState([]);
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();


    const getData = async () => {

        let res = await getSuggestInfo({ storeId: user.storeId })
        if (res.code == "success") {
            setData(res.data)
            setTotal(res.data.total)
        }
    }
    useState(() => {
        getData()
    })
    useEffect(() => {
        getData()
    }, [page]);
    const pageChange = (page, pageSize) => {
        setPage(page)
    }
    const deleteSuggest = async (value) => {
        let res = await deleteSuggestInfo([value])
        if (res.code == "success") {
            getData()
            message.success("成功")
        }
    }
    const onSearch = (values) => {
        getData(values)
    };
    const onReset = () => {
        form.resetFields();
    };
    return <div >
        <Form form={form} name="control-hooks" onFinish={onSearch}>
            <Row gutter={16} justify="start" align="middle">
                <Col span={6}>
                    <Form.Item name="time" label="搜索时间段">
                        <DatePicker.RangePicker />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Space>

                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <List
            pagination={{ hideOnSinglePage: true, }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    extra={<Space style={{ minWidth: 93 }}>
                        <div>{item.subTime}</div>
                        <a onClick={() => { deleteSuggest(item.id) }}>删除</a>
                    </Space>}
                >
                    <p style={{ maxWidth: 1300 }}>{item.content}</p>
                </List.Item>
            )}
        />
    </div>
}
export default SuggestMan