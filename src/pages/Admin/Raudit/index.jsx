import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import dayjs from 'dayjs';
import qs from "qs"
import { getRauditInfo, searchRaudit, updateRaudit, deleteRaudit } from "../../../api/Admin/Raudit"
import { Button, Form, Input, Select, Col, Row, Table, Tag, Pagination, Drawer, Radio, DatePicker, InputNumber, Avatar, message, Space } from 'antd';

const Raudit = () => {



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawer, setDrawer] = useState(false)
  const [useIn, setUseIn] = useState({});
  const [title, setTitle] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)

  const getData = async (values) => {
    let data = {
      storeId: user.storeId,
      page: page,
    }
    if (values !== undefined && {} && "" && null) {
      data = {
        ...data,
        name: values.name !== undefined ? "" : values.name,
        status: values.status !== undefined ? "" : values.status
      }
    }
    setLoading(true)
    let res = await getRauditInfo(data);
    if (res.code == "success") {
      setData(res.data.users)
      setTotal(res.data.total)
    }
    setLoading(false)
  }

  useState(() => {
    getData();
  })
  useEffect(() => {
    getData(form.getFieldValue())
  }, [page]);

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (_, s) => <Avatar src={s.avatar} />
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '职位',
      dataIndex: 'career',
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
      dataIndex: "pass",
      render: (pass) => {
        let color = "warning"
        let tag = "错误"
        if (pass == 1) {
          color = "processing"
          tag = "未审批"
        } else if (pass == 2) {
          color = "success"
          tag = "同意"
        } else if (pass == 0) {
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
        if (s.pass == 1) {
          return (<Button onClick={() => showDrawer("审批", s)}>审批</Button>)
        } else if (s.pass == 0 || s.pass == 2) {
          return (<Button onClick={() => showDrawer("修改", s)}>修改</Button>)
        }
      }
    },
  ];

  const pageChange = (page, pageSize) => {//页码改变时
    setPage(page)
  };

  const onFinish = async (values) => {
    console.log(values)
    let res = await updateRaudit(values);
    if (res.code == "success") {
      setDrawer(false)
      message.success("修改成功")
      getData(form)
    }
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
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

  const deleteRa = async () => {
    let res = await deleteRaudit({ id: selectedRowKeys })
    if (res.code == "success") {
      message.success("成功")
      getData(form.getFieldValue())
    }
  }
  const onSearch = async (value) => {
    getData(value)
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
    <Form form={form} name="control-hooks" onFinish={onSearch}>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入员工姓名" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="status" label="状态">
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
        <Col span={2}></Col>
        {/* <Col span={4} ><Button style={{ float: "right" }}>新增</Button></Col> */}
      </Row>
    </Form>
    <Table columns={columns} dataSource={data} total={1000} loading={loading} rowSelection={rowSelection}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange, page: page, total: total }}
      rowKey={r => r.id}
    />
    <Drawer title={title} open={drawer} onClose={onCloseDrawer} destroyOnClose={true} getContainer={false}>
      <Form onFinish={onFinish}>
        <Form.Item name="id" initialValue={useIn.id} hidden>
          <Input />
        </Form.Item>
        <Form.Item label="审核状态" name="pass" initialValue={useIn.pass}>
          <Select
            options={[
              {
                value: 1,
                label: '未审批',
                disabled: true
              },
              {
                value: 2,
                label: '同意',
              },
              {
                value: 0,
                label: '不同意',
              },
            ]} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确认</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>

}
export default Raudit
