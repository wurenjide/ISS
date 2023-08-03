import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, message } from 'antd';
import React, { useState } from 'react';
import { getSuggestInfo, addSuggestInfo, deleteSuggestInfo } from "../../../api/User/Suggest"
import qs from "qs"
import dayjs from 'dayjs';

const Suggest = () => {


    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [su, setSu] = useState({});
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);


    const columns = [
        // {
        //     title: "编号",
        //     dataIndex: "id",
        // },
        {
            title: "建议内容",
            dataIndex: "content",
        },
        {
            title: "提交时间",
            dataIndex: "subTime"
        },
        // {
        //     title: "操作",
        //     dataIndex: "option",
        //     render: (_, s) => <>
        //         <div key={s.id}>
        //             <Space>
        //                 <a onClick={() => { Delete(s) }}>删除</a>
        //                 <a onClick={() => { showDrawer(s, "修改") }}>修改</a>
        //             </Space>
        //         </div>
        //     </>
        // },
    ]

    const getData = async () => {

        let res = await getSuggestInfo({ id: user.id, page: page })
        setData(res.data.suggests)
        setTotal(res.data.total)
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
    const Delete = async () => {
        let res = await deleteSuggestInfo(selectedRowKeys);
        if(res.code=="success"){
            message.success("成功")
            getData()
        }
    }
    const onFinish = async (value) => {
        let data = {
            id: value.id,
            content: value.content,
            storeId: value.storeId
        }
        console.log(data)
        let res = await addSuggestInfo(data)
        if (res.code == "success") {
            message.success(res.message)
            getData()
            setOpen(false)
        } else if (res.code == "fail") {
            message.error(res.message)
        }

    }
    const pageChange = (page, pageSize) => {
        setPage(page)
    }
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return <div>
        <div style={{ margin: 5 }}>
            <Space>
                <Button onClick={() => { showDrawer({}, "新增") }}>新增</Button>
                <Button onClick={Delete}>删除</Button>
            </Space>

        </div>
        <Table columns={columns} dataSource={data} rowKey={data => data.id} rowSelection={rowSelection}
            pagination={{ position: ["bottomCenter"], showSizeChanger: false, defaultPageSize: 6, page: page, total: total, onChange: pageChange }} />
        <Modal open={open} onCancel={onClose} onClose={onClose} title={title}
            footer={null} getContainer={false}
        >
            <Form onFinish={onFinish}>
                <Form.Item label="用户id" name="id" initialValue={user.id} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="用户id" name="storeId" initialValue={user.storeId} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="建议内容" name="content" initialValue={su.content}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}
export default Suggest