import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker } from 'antd';
import React, { useState } from 'react';
const Suggest = () => {


    const [open, setOpen] = useState(false);
    const [su, setSu] = useState({});
    const [title, setTitle] = useState("");

    const columns = [
        {
            title: "编号",
            dataIndex: "id",
        },
        {
            title: "建议内容",
            dataIndex: "suggest",
        },
        {
            title: "提交时间",
            dataIndex: "uptime"
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
    const data = []
    for (let i = 0; i < 100; i++) {
        data.push({
            id: i,
            suggest: "aaa" + i,
            uptime: "2023-2-13"
        })
    }
    const showDrawer = (s, title) => {
        console.log(s, title)
        setSu(s)
        setTitle(title)
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const Delete = (s) => {
        console.log(s)
    }
    return <div>
        <Button onClick={() => { showDrawer({}, "新增") }}>新增</Button>
        <Table columns={columns} dataSource={data} rowKey={data => data.id}
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, defaultPageSize: 6 }} />
        <Modal open={open} onCancel={onClose} onClose={onClose} title={title}
            okText='确认'
            cancelText='取消'
        >
            <Form>
                <Form.Item label="建议内容">
                    <Input.TextArea value={su.suggest} />
                </Form.Item>
                <Form.Item label="是否匿名">
                    <Select options={[
                        {
                            label: "匿名",
                            value: "0",
                        },
                        {
                            label: "实名",
                            value: "0",
                        },
                    ]} />
                </Form.Item>
            </Form>
        </Modal>
    </div>
}
export default Suggest