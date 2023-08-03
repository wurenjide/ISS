import React, { useState, useRef } from 'react'
import dayjs from 'dayjs';
import { Table, Radio, Space, Button, Drawer, TimePicker, Form, Select, DatePicker, Divider, Badge, Input, message } from 'antd';
import Week from './Week';
import Month from './Month';
import Day from './Day';
import { useForm } from 'antd/es/form/Form';
import { getAlloweStaff, addSchedule } from "../../../api/Admin/ScheduleMan"
import careers from '../../../assets/career';

const ScheduleMan = () => {
  const [drawer, setDrawer] = useState(false);
  const [allowStaff, setAllowStaff] = useState([])
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [employee, setEmployee] = useState({ name: "请选择员工" })
  const [drawer2, setDrawer2] = useState(false)
  const [career, setCareer] = useState()
  const [form1] = useForm();


  const getData = () => {
    let c = []
    c.push({
      label: "全部职业",
      value: "all"
    })
    c.push.apply(c, careers)
    setCareer(c)
  }
  useState(() => {
    getData()
  })

  const showDrawer = () => {
    setDrawer(true);
  };
  const onClose = () => {
    setDrawer(false);
    setDrawer2(false)
    setEmployee({ name: "请选择员工" })
  };
  const showChildrenDrawer = async () => {
    let data = {
      storeId: 1,
      date: dayjs(form1.getFieldValue("date")).format("YYYY-MM-DD"),
      startTime: dayjs(form1.getFieldValue("time")[0]).format("hh:mm:ss"),
      endTime: dayjs(form1.getFieldValue("time")[1]).format("hh:mm:ss"),
      startDate: dayjs(form1.getFieldValue("date")).startOf('week').add(1, 'day').format('YYYY-MM-DD'),
      endDate: dayjs(form1.getFieldValue("date")).endOf('week').add(1, 'day').format('YYYY-MM-DD'),
      allowCareer: form1.getFieldValue("allowCareer").toString()
    }
    let res = await getAlloweStaff(data);
    if (res.code == 20000) {
      setAllowStaff(res.data.userList)
      setChildrenDrawer(true);
    } else {
      message.error("请求失败")
    }
  };
  const [scheduleS, setScheduleS] = useState("w");
  const onChange = (e) => {
    setScheduleS(e.target.value)
  }
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const changeEmployee = (value) => {
    setEmployee(value)
    onChildrenDrawerClose()
  }
  const addStaff = () => {
    showDrawer()
  }

  const onAddSchedule = async (value) => {
    console.log(value)
    let data = {
      storeId: 1,
      employeeId: employee.id,
      date: dayjs(value.date).format("YYYY-MM-DD"),
      startTime: dayjs(value.time[0]).format("hh:mm:ss"),
      endTime: dayjs(value.time[0]).format("hh:mm:ss"),
      allowCareer: "all"
    }
    console.log(data)
    let res = await addSchedule(data)
    if (res.code == 2000) {
      onClose()
    }
  }

  return (<div>

    <Radio.Group onChange={onChange} defaultValue="w" style={{ padding: "10px", margin: "auto" }}>
      <Radio.Button value="d">按日查看</Radio.Button>
      <Radio.Button value="w">按周查看</Radio.Button>
      {/* <Radio.Button value="m">按月查看</Radio.Button> */}
    </Radio.Group>
    <div style={{ float: "right", padding: "10px" }}>
      <Space>
        <Button onClick={addStaff}>添加</Button>
      </Space>
    </div>
    <Drawer
      title="添加"
      closable={false}
      onClose={onClose}
      open={drawer}
      destroyOnClose={true}>
      <Form form={form1} onFinish={onAddSchedule}>
        <Form.Item label="门店id" name="storeId" defaultValue={1} hidden>
          <Input />
        </Form.Item>
        <Form.Item label="日期" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="时间段" name="time">
          <TimePicker.RangePicker secondStep={60} minuteStep={30} />
        </Form.Item>
        <Form.Item name="id" hidden defaultValue={employee.id}>
          <Input />
        </Form.Item>
        {career ? <Form.Item name="allowCareer" label="该班次允许的职位" >
          <Select options={career} mode="multiple" defaultValue={"all"} />
        </Form.Item> : <></>}
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
        {allowStaff.map(a => (<>
          <Space>
            <div>
              姓名：{a.name}
              <div>手机号：{a.phone}</div>
              <div>当日工作时长：{a.dayWorkTime}</div>
              <div>当周工作时长:{a.weekWorkTime}</div>
            </div>
            <Button onClick={() => changeEmployee({ id: a.id, name: a.name })}>选择</Button>
          </Space>
          <Divider />
        </>
        ))}
      </Drawer>
    </Drawer>
    <Drawer open={drawer2} onClose={onClose} title="未处理的开放班次">
      <Form>
        <Form.Item label="日期">
          <DatePicker />
        </Form.Item>
        <Form.Item label="时间段">
          <TimePicker.RangePicker />
        </Form.Item>
        <Form.Item label="所需人数">
          <Input disabled />
        </Form.Item>
        <Form.Item label="职位选择">
          <Select
            mode="multiple"
            style={{ width: "150px" }}
            allowClear
            placeholder="请选择职业"
            options={[{ label: "aa", value: "aa" }, { label: "aa2", value: "aa2" }]}
          />
        </Form.Item>
      </Form>
    </Drawer>
    {scheduleS == "w" ? <Week /> : (scheduleS == "m" ? <Month /> : <Day />)}
  </div>)
}
export default ScheduleMan
