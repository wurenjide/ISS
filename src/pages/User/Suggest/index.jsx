import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, message } from 'antd';
import React, { useState } from 'react';
import { getSuggestInfo, addSuggestInfo, deleteSuggestInfo } from "../../../api/User/Suggest"
import qs from "qs"
import dayjs from 'dayjs';

const Suggest = () => {


    const [open, setOpen] = useState(false);
    const [su, setSu] = useState({});
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));



    const columns = [
        {
            title: "编号",
            dataIndex: "id",
        },
        {
            title: "建议内容",
            dataIndex: "content",
        },
        {
            title: "提交时间",
            dataIndex: "subTime"
        },
        {
            title: "操作",
            dataIndex: "option",
            render: (_, s) => <>
                <div key={s.id}>
                    <Space>
                        <a onClick={() => { Delete(s) }}>删除</a>
                        <a onClick={() => { showDrawer(s, "修改") }}>修改</a>
                    </Space>
                </div>
            </>
        },
    ]

    const getData = async () => {

        let res = await getSuggestInfo({ id: user.id})
        setData(res.data)
    }
    useState(() => {
        getData()
    })

    const showDrawer = (s, title) => {
        console.log(s, title)
        setSu(s)
        setTitle(title)
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const Delete = async (s) => {
        let res = await deleteSuggestInfo(s);
        console.log(s)
    }
    const onFinish = async (value) => {
        let data = {
            id: value.id,
            content: value.content,
            submitTime: dayjs().format("YYYY-MM-DD hh:mm:ss")
        }

        let res = await addSuggestInfo(data)
        if (res.code == "success") {
            message.success(res.message)
            getData()
            setOpen(false)
        } else if (res.code == "fail") {
            message.error(res.message)
        }

    }
    return <div>
        <Button onClick={() => { showDrawer({}, "新增") }}>新增</Button>
        <Table columns={columns} dataSource={data} rowKey={data => data.id}
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, defaultPageSize: 6 }} />
        <Modal open={open} onCancel={onClose} onClose={onClose} title={title}
            footer={null}
        >
            <Form onFinish={onFinish}>
                <Form.Item label="用户id" name="id" initialValue={su.employeeId} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="建议内容" name="content" initialValue={su.content}>
                    <Input.TextArea />
                </Form.Item>
                {/* <Form.Item label="是否匿名">
                    <Select options={[
                        {
                            label: "匿名",
                            value: "0",
                        },
                        {
                            label: "实名",
                            value: "1",
                        },
                    ]} />
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}
export default Suggest