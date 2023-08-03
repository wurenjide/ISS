import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Popconfirm, message } from 'antd';
import { searchAttInfo, updateStore, deleteS, addStore,getAllStore } from "../../../../api/Admin/Store"


const StoreSA = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [store, setStore] = useState({})
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("")

    const columns = [
        {
            title: '门店名称',
            dataIndex: 'name',
        },
        {
            title: '门店地址',
            dataIndex: 'address',
        },
        {
            title: "占地面积(平方米)",
            dataIndex: "size",
            render: (_, s) => <div>
                {s.size}m²
            </div>
        },
        {
            title: '员工数目',
            dataIndex: 'employeeNum',
        },
        {
            title: "操作",
            key: 'operation',
            fixed: 'right',
            width: 110,
            render: (s) => <div>
                <Space>
                    <Button onClick={() => showDrawer(s, "修改")}>修改</Button>
                </Space>
            </div>,
        },
    ]
    const getData = async (values) => {
        let res = await getAllStore()
        setData(res.data)
    }
    useState(() => {
        getData()
    })
    //搜索
    const onSearch = () => {
        getData(form.getFieldValue())
    }
    const onReset = () => {
        form.resetFields();
    };

    const showDrawer = (s, title) => {
        setTitle(title)
        setStore(s)
        setOpen(true)
    }
    const onCloseDrawer = () => {
        setOpen(false)
    }
    const onFinish = async (values) => {
        if (title == "修改") {
            let res = await updateStore(values);
            if (res.code == "success") {
                message.success(res.message)
                getData(form.getFieldValue())
            }
        } else {
            let res = await addStore(values);
            if (res.code == "success") {
                message.success(res.message)
                getData(form.getFieldValue())
                onCloseDrawer()
            }
        }

    }
    const deleteStore = async (value) => {
        let res = await deleteS(value);
        if (res.code == "success") {
            message.success(res.message)
            getData(form.getFieldValue())
        }
    }

    return <div>
        <Form form={form} name="control-hooks" onFinish={onSearch}>
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item name="name" label="门店名称">
                        <Input placeholder="请输入门店名称" />
                    </Form.Item>
                </Col>
                <Col span={6}>
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
                <Col span={2} push={12}>
                    <Button onClick={() => showDrawer({}, "新建")}>新建门店</Button>
                </Col>
            </Row>
        </Form>
        <Table columns={columns} dataSource={data} rowKey={r => r.id}
            pagination={false}
        />
        <Drawer
            title={title}
            open={open}
            onClose={onCloseDrawer}
            destroyOnClose={true}
            getContainer={false}
        >
            <Form onFinish={onFinish}>
                <Form.Item name="id" initialValue={store.id} hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="name" initialValue={store.name} label="门店名称" >
                    <Input />
                </Form.Item>
                <Form.Item name="address" initialValue={store.address} label="门店地址" >
                    <Input />
                </Form.Item>
                <Form.Item name="size" initialValue={store.size} label="门店面积" >
                    <Input />
                </Form.Item>
                {title == "新建" ? <></> : <Form.Item name="employeeNum" initialValue={store.employeeNum} label="门店人数">
                    <Input disabled />
                </Form.Item>}

                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>
}
export default StoreSA;