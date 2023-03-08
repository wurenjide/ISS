import React, { useState } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table, Tag, Drawer, Space, Pagination, message } from 'antd';
const { TextArea } = Input;

const LeaveMan = () => {


  const columns = [
    {
      title: '员工号',
      dataIndex: 'uid',
    },
    {
      title: '员工名称',
      dataIndex: 'name',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      title: '请假理由',
      dataIndex: 'reason',
    },
    {
      title: "请假状态",
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
        if (s.state == 0) {
          return (<Button key={s.uid} onClick={() => showDrawer(s)}>审批</Button>)
        } else if (s.state == 1 || s.state == 2) {
          return (<Button key={s.uid} onClick={() => showDrawer(s)}>修改</Button>)
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
      position: "aaaaaa",
      reason: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      opinion: "",
      state: i % 3,
    });
  }
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const pageChange = (page, pageSize) => {//页码改变时
    console.log(page, pageSize)
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
    console.log('Success:', values);
  };
  const onFinish = (values) => {
    if (values.state == 0) {
      message.info("该请假条还未审批！")
    }
    console.log('Success:', values);
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
      pagination={{ position: ["bottomCenter"], showSizeChanger: false, onChange: pageChange }}
    />
    <Drawer
      title={drawer.state == 0 ? "审核" : "修改"}
      placement="right"
      // size={"d"}
      onClose={onClose}
      open={open}
      destroyOnClose={true}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item initialValue={drawer.name} name="name" label="员工名称">
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.position} name="position" label="员工职位">
          <Input disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.reason} name="reason" label="请假理由">
          <TextArea disabled />
        </Form.Item>
        <Form.Item initialValue={drawer.state} name="state" label="请假状态">
          <Select
            // onChange={handleChange}
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
