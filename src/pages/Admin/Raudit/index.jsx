import React, { useState } from 'react'
import style from "./index.module.scss";
import dayjs from 'dayjs';
import { Button, Form, Input, Select, Col, Row, Table, Tag, Pagination, Drawer, Radio, DatePicker, InputNumber } from 'antd';

const Raudit = () => {
  const columns = [
    {
      title: '员工号',
      dataIndex: 'uid',
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
      title: "审核状态",
      dataIndex: "state",
      render: (state) => {
        let color = "warning"
        let tag = "错误"
        if (state == 0) {
          color = "processing"
          tag = "未审批"
        } else if (state == 1) {
          color = "success"
          tag = "同意"
        } else if (state == 2) {
          color = "error"
          tag = "不同意"
        }
        return (
          <div>
            <Tag color={color} >
              {tag}
            </Tag>
          </div>);
      }
    },
    {
      title: "操作",
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (s) => {
        console.log(s)
        if (s.state == 0) {
          return (<Button onClick={() => showDrawer("审批", s)}>审批</Button>)
        } else if (s.state == 1 || s.state == 2) {
          return (<Button onClick={() => showDrawer("修改", s)}>修改</Button>)
        }
      }
    },
  ];
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      uid: i,
      name: `Edrward ${i}`,
      age: 32,
      birthday: '1999-06-02',
      sex: 0,
      email: `aaaaaaa ${i}`,
      phone: `${i}165456131`,
      store: "aaa",
      career: "AAAA",
      state: i % 3,
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawer, setDrawer] = useState(false)
  const [useIn, setUseIn] = useState({});
  const [title, setTitle] = useState();
  const [form] = Form.useForm();

  const pageChange = (page, pageSize) => {//页码改变时
    console.log(page, pageSize)
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const showDrawer = (title, s) => {
    setTitle(title)
    setUseIn(s)
    setDrawer(true);
  };
  const onCloseDrawer = () => {
    setDrawer(false);
    setUseIn({})
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return <div>
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入员工姓名" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="role" label="状态">
            <Select style={{ width: 120 }}
              options={[
                {
                  value: 0,
                  label: '未审批',
                },
                {
                  value: 1,
                  label: '同意',
                },
                {
                  value: 2,
                  label: '不同意',
                },
              ]}
              placeholder="请选择状态"
            />
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
        <Col span={2}></Col>
        {/* <Col span={4} ><Button style={{ float: "right" }}>新增</Button></Col> */}
      </Row>
    </Form>
    <Table columns={columns} dataSource={data} total={1000}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange }}
    />
    <Drawer title={title} open={drawer} onClose={onCloseDrawer} destroyOnClose>
      <Form>
        <Form.Item name="id" initialValue={useIn.id} hidden>
          <Input />
        </Form.Item>
        <Form.Item label="审核状态" name="state" initialValue={useIn.state}>
          <Select
            options={[
              {
                value: 0,
                label: '未审批',
                disabled: true
              },
              {
                value: 1,
                label: '同意',
              },
              {
                value: 2,
                label: '不同意',
              },
            ]} />
        </Form.Item>
        <Form.Item>
          <Button>确认</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>

}
export default Raudit
