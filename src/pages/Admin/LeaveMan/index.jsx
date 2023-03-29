import React, { useState,useEffect } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table, Tag, Drawer, Space, Pagination, message } from 'antd';
import { getLeaveInfor, updateLeave } from "../../../api/Admin/LeaveMan"
const { TextArea } = Input;

const LeaveMan = () => {



  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [user,setUser]=useState({})
  const columns = [
    {
      title: '员工名称',
      dataIndex: 'name',
    },
    {
      title: '职位',
      dataIndex: 'career',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '请假理由',
      dataIndex: 'reason',
    },
    {
      title: "请假状态",
      dataIndex: "status",
      render: (status) => {
        let color = "warning"
        let tag = "错误"
        if (status == "审核中") {
          color = "processing"
          tag = "审核中"
        } else if (status == "同意") {
          color = "success"
          tag = "同意"
        } else if (status == "拒绝") {
          color = "error"
          tag = "拒绝"
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
        if (s.status == "审核中") {
          return (<Button key={s.id} onClick={() => showDrawer(s)}>审批</Button>)
        } else if (s.status == "同意" || s.status == "拒绝") {
          return (<Button key={s.id} onClick={() => showDrawer(s)}>修改</Button>)
        }
      }
    },
  ];
  
  const getData = async (values) => {
    // setLoading(true)
    values.id=user.id;
    values.storeId=user.storeId;
    values.page=page
    let res=await getLeaveInfor(values)
    if (res.code == "success") {
      setData(res.data.writtens)
      setTotal(res.data.total)
  }
    setLoading(false)
  }

  useState(() => {
    let user=localStorage.getItem("user")
    setUser(user)
    getData(form.getFieldValue)
  })
  useEffect(() => {
    getData(form.getFieldValue)
  }, [page]);

  const pageChange = (page, pageSize) => {//页码改变时
    setPage(page)
  };

  const onReset = () => {
    form.resetFields();
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const showDrawer = (s) => {
    setOpen(true);
    console.log(s)
    setDrawer(s)
  }

  const onClose = () => {
    setOpen(false);
    setDrawer({})
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (values) => {
    getData(values)
  };
  const onFinish = async (values) => {
    let res = await updateLeave(data);
    if (res.code == "success") {
      message.success("修改成功")
      getData(form.getFieldValue)
    }
    if (values.status == "审批中") {
      message.info("该请假条还未审批！")
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          <Form.Item name="role" label="状态"
            rules={
              [

              ]
            }
          >
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

      </Row>
    </Form>
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} total={1000}
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange,page:page,total:total }}
      rowKey={r => r.id}
      loading={loading}
    />
    <Drawer
      title={drawer.status == 0 ? "审核" : "修改"}
      placement="right"
      onClose={onClose}
      open={open}
      destroyOnClose={true}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item initialValue={drawer.storeId} name="storeId" label="门店id" hidden>
          <Input/>
        </Form.Item>
       <Form.Item initialValue={drawer.employeeId} name="employeeId" label="用户id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.id} name="id" label="假条id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.name} name="name" label="员工名称">
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.career} name="career" label="员工职位">
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.reason} name="reason" label="请假理由">
          <TextArea disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.status} name="status" label="请假状态">
          <Select
            // onChange={handleChange}
            options={[
              {
                value: "审批中",
                label: '审批中',
                disabled: true
              },
              {
                value: '同意',
                label: '同意',
              },
              {
                value: '拒绝',
                label: '拒绝',
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={onClose}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  </div>
}
export default LeaveMan
