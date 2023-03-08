import React, { useState } from 'react'
import { Table, Radio, Space, Button, Drawer, TimePicker, Form, Select, DatePicker, Divider,Badge } from 'antd';
import Week from './Week';
import Month from './Month';
import Day from './Day';
import Week2 from './Week2';

const ScheduleMan = () => {
  const [drawer, setDrawer] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [employee, setEmployee] = useState({ name: "请选择员工" })
  const [drawer2,setDrawer2]=useState(false)
  const showDrawer = () => {
    setDrawer(true);
  };
  const onClose = () => {
    setDrawer(false);
    setDrawer2(false)
    setEmployee({ name: "请选择员工" })
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const [scheduleS, setScheduleS] = useState("w");
  const onChange = (e) => {
    setScheduleS(e.target.value)
    console.log(`radio checked:${e.target.value}`);
  }
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const changeEmployee = () => {
    setEmployee({ name: "aa", id: "ss" })
    onChildrenDrawerClose()
  }
  const addStaff = () => {
    showDrawer()
  }
  const showDrawer2=()=>{
    setDrawer2(true)
  }
  return (<div>

    <Radio.Group onChange={onChange} defaultValue="w" style={{ padding: "10px", margin: "auto" }}>
      <Radio.Button value="d">按日查看</Radio.Button>
      <Radio.Button value="w">按周查看</Radio.Button>
      <Radio.Button value="m">按月查看</Radio.Button>
      <Radio.Button value='w2'>排班表草稿2</Radio.Button>
    </Radio.Group>
    <div style={{ float: "right", padding: "10px" }}>
      <Space>
        <Badge count={5}>
          <Button onClick={showDrawer2}>开放班次</Button>
        </Badge>
      <Button onClick={addStaff}>添加</Button>
      </Space>
    </div>
    <Drawer
      title="添加"
      closable={false}
      onClose={onClose}
      open={drawer}
      destroyOnClose={true}>
      <Form>
        <Form.Item label="日期">
          <DatePicker />
        </Form.Item>
        <Form.Item label="时间段">
          <TimePicker.RangePicker />
        </Form.Item>
        <Form.Item label="职位">
          <Select options={
            [{
              value: "1",
              label: "保洁",
            },
            {
              value: "2",
              label: "收银",
            }
            ]} />
        </Form.Item>
        <Form.Item>
          <Button onClick={showChildrenDrawer}>{employee.name}</Button>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="submit">提交</Button>
            <Button>取消</Button>
          </Space>
        </Form.Item>
      </Form>
      <Drawer title="空闲员工" closable={false} onClose={onChildrenDrawerClose} open={childrenDrawer}>
        <Space>
          <div>
            姓名：aa
            <div>当日工作时间段：10:30-11:30</div>
            <div>当日工作时长：1小时</div>
          </div>
          <Button onClick={() => { changeEmployee() }}>选择</Button>
        </Space>
        <Divider />
        <Space>
          <div>
            姓名：aa
            <div>当日工作时间段：10:30-11:30</div>
            <div>当日工作时长：1小时</div>
          </div>
          <Button onClick={() => { changeEmployee() }}>选择</Button>
        </Space>
        <Divider />
      </Drawer>
    </Drawer>
    <Drawer open={drawer2} onClose={onClose} title="未处理的开放班次">
      <Form>
        <Form.Item label="日期">
          <DatePicker/>
        </Form.Item>
        <Form.Item label="时间段">
          <TimePicker/>
        </Form.Item>
      </Form>
    </Drawer>
    {React.createElement(scheduleS=='w2'?Week2:(scheduleS == "w" ? Week : (scheduleS == "m" ? Month : Day)) )}
  </div>)
}
export default ScheduleMan
