import React, { useState, useEffect } from 'react'
import style from "./index.module.scss";
import dayjs from 'dayjs';
import qs from "qs"
import { getRauditInfo, searchRaudit, updateRaudit, deleteRaudit } from "../../../api/Admin/Raudit"
import { Button, Form, Input, Select, Col, Row, Table, Tag, Pagination, Drawer, Radio, DatePicker, InputNumber, Avatar, message } from 'antd';

const Raudit = () => {



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawer, setDrawer] = useState(false)
  const [useIn, setUseIn] = useState({});
  const [title, setTitle] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [loading,setLoading]=useState(false)

  const getData = async (values) => {
    // let data={
    //   name:values.name?values.name:"",
    //   status:values.status?values.status:"",
    //   page:page,
    //   storeId:storeId,
    // }
    setLoading(true)
    values.page = page
    values.storeId = user.storeId
    values.id=user.id
    let res = await getRauditInfo(data);
    if (res.code == "success") {
      setData(res.data.users)
      setTotal(res.data.total)
    }
    setLoading(false)
  }

  useState(() => {
    let user = qs.parse(localStorage.getItem("user"))
    setUser(user)
    getData(form.getFieldValue());
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

  const deleteRa = async (value) => {
    let res = await deleteRaudit(value)
  }
  const onSearch = async (value) => {
    getData(form)
  }

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
    <Table columns={columns} dataSource={data} total={1000} loading={loading}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange, page: page }}
      rowKey={r => r.id}
    />
    <Drawer title={title} open={drawer} onClose={onCloseDrawer} destroyOnClose>
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
