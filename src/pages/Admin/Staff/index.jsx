import React, { useState } from 'react'
import style from "./index.module.scss";
import dayjs from 'dayjs';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { getStaffInfo, deleteStaffInfo, updateStaffInfo, searchStaffInfo, addStaffInfo } from "../../../api/Admin/Staff"
import { Button, Form, Input, InputNumber, Popconfirm, Col, Row, Table, Modal, Space, Drawer, Radio, DatePicker, Avatar } from 'antd';

const Staff = () => {

  const [title, setTitle] = useState();
  const [form] = Form.useForm();
  const [drawer, setDrawer] = useState(false)
  const [useIn, setUseIn] = useState({});
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    let res = await getStaffInfo()
    console.log(res)
    if (res.code != "") {
      setData(res.data.employee)
    }
    setLoading(false)
  }
  useState(() => {
    getData()
  }, [])


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
    } else if (title == "新增") {
      let res = await addStaffInfo(values)
    } else {
      alert("操作失败，请刷新后重试")
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const deleteStaff = async (s) => {
    let res=await deleteStaffInfo(s);

  }

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
      render: (_, s) => {
        if (s.sex == 0) {
          return <div>女</div>
        } else {
          return <div>男</div>
        }
      }
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
          <Popconfirm
            description="是否删除这条数据?"
            onConfirm={() => deleteStaff(s)}
            okText="是"
            cancelText="否"
          >
            <Button>删除</Button>
          </Popconfirm>
        </Space>
      </div>,
    },
  ];
  return <div>
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入员工姓名" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Col>
        <Col span={6}></Col>
        <Col span={4}></Col>
        <Col span={4} >
          <Button
            style={{ float: "right" }}
            onClick={() => showDrawer('新增', {})}>新增</Button>
        </Col>
      </Row>
    </Form>
    <Table columns={columns} dataSource={data}
      rowKey={r => r.id}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false }}
      loading={loading}
    />
    <Drawer title={title} open={drawer} onClose={onCloseDrawer} destroyOnClose={true}>
      <Form>
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
            <Radio value={0}> 男 </Radio>
            <Radio value={1}> 女 </Radio>
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
        <Form.Item label="密码" name="password" initialValue={useIn.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button>确认</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>

}
export default Staff
