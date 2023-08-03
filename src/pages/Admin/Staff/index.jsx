import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import dayjs from 'dayjs';
import qs from "qs"
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { getStaffInfo, deleteStaffInfo, updateStaffInfo, searchStaffInfo, addStaffInfo } from "../../../api/Admin/Staff"
import { Button, Form, Input, InputNumber, Popconfirm, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Avatar, message, Select } from 'antd';
import { getAllStore } from "../../../api/Admin/Store"
import { publicIp } from '../../../config/apiUrl';

const Staff = () => {

  const [title, setTitle] = useState();
  const [form] = Form.useForm();
  const [drawer, setDrawer] = useState(false)
  const [useIn, setUseIn] = useState({});
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(qs.parse(localStorage.getItem("user")))
  const [store, setStore] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const getData = async () => {
    setLoading(true)
    let data = {
      storeId: user.storeId,
      page: page,
      name: form.getFieldValue("name")
    }
    let res = await getStaffInfo(data)
    if (res.code == "success") {
      setData(res.data.users)
      setTotal(res.data.total)
    }
    setLoading(false)
  }
  useState(() => {
    getData()
  })
  useEffect(() => {
    console.log(page)
    getData()
  }, [page]);



  const columns = [
    {
      title: '头像',
      dataIndex: 'id',
      render: (_, s) => (<Avatar src={s.avatar} />)
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      render: (_, s) => (<>
        {s.birthday}
      </>)
    },
    {
      title: '职位',
      dataIndex: 'career',
    },
    {
      title: "操作",
      key: 'operation',
      fixed: 'right',
      width: 110,
      render: (s) => <div>
        <Space>
          <Button onClick={() => showDrawer('修改', s)}>修改</Button>
        </Space>
      </div>,
    },
  ];
  const showDrawer = (title, s) => {
    setUseIn(s)
    setTitle(title)
    setDrawer(true);
  };
  const onCloseDrawer = () => {
    setDrawer(false);
    setUseIn({})
  };
  const onFinish = async (values) => {
    if (title == "修改") {
      let res = await updateStaffInfo(values)
      if (res.code == "success") {
        message.success(res.message)
        getData(form.getFieldValue())
        setDrawer(false)
      }
    } else if (title == "新增") {
      let res = await addStaffInfo(values)
      if (res.code == "success") {
        message.success(res.message)
        getData(form.getFieldValue())
        setDrawer(false)
      }
    } else {
      alert("操作失败，请刷新后重试")
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const deleteStaff = async () => {
    let res = await deleteStaffInfo(selectedRowKeys);
    if (res.code == "success") {
      message.success(res.message)
      getData(form.getFieldValue())
    }
  }
  const pageChange = (page, pageSize) => {
    console.log(page, pageSize)
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
  const onSearch = () => {
    getData()
  }

  return <div>
    <Form form={form} name="control-hooks" onFinish={onSearch}>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入员工姓名" />
          </Form.Item>

        </Col>
        {store != "" ?
          <Col span={2}>
            <Form.Item label="门店id" name="storeId">
              <Select options={store} />
            </Form.Item>
          </Col>
          : <></>}
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
        <Col span={4} push={10}>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href={ publicIp+"/manage/exportExcel/writeUserToExcel/"+user.storeId }><Button>导出</Button></a>
            <Button onClick={() => showDrawer('新增', {})}>新增</Button>
            <Popconfirm
              title="删除"
              description="是否删除这些数据?"
              onConfirm={deleteStaff}
              okText="是"
              cancelText="否"
            >
              <Button danger>删除</Button>
            </Popconfirm>

          </Space>
        </Col>
      </Row>
    </Form>
    <Table columns={columns} dataSource={data}
      rowKey={r => r.id}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange, page: page, total: total }}
      rowSelection={rowSelection}
      loading={loading}
    />
    <Drawer title={title} open={drawer} onClose={onCloseDrawer} destroyOnClose={true} getContainer={false}>
      <Form onFinish={onFinish}>
        <Form.Item name="id" initialValue={useIn.id} hidden>
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="name" initialValue={useIn.name}>
          <Input />
        </Form.Item>
        <Form.Item label="年龄" name="age" initialValue={useIn.age}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="性别" name="sex" initialValue={useIn.sex}>
          <Radio.Group>
            <Radio value="男"> 男 </Radio>
            <Radio value="女"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="职位" name="career" initialValue={useIn.career}>
          <Input />
        </Form.Item>
        <Form.Item label="生日" name="birthday" initialValue={useIn.birthday ? dayjs(useIn.birthday, 'YYYY-MM-DD') : ""}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="手机号" name="phone" initialValue={useIn.phone}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" initialValue={useIn.email}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确认</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>

}
export default Staff
