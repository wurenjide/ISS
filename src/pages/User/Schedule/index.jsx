import React, { useState } from 'react'
import { Table, Radio } from 'antd';
import Week from './Week';
import Month from './Month';
import Day from './Day';
const Schedule = () => {
  const [scheduleS, setScheduleS] = useState("w");
  const onChange = (e) => {
    setScheduleS(e.target.value)
    console.log(`radio checked:${e.target.value}`);
  }
  return (<div>
    <Radio.Group onChange={onChange} defaultValue="w" style={{ padding: "10px", margin: "auto" }}>
      <Radio.Button value="d">按日查看</Radio.Button>
      <Radio.Button value="w">按周查看</Radio.Button>
    </Radio.Group>
    {React.createElement(scheduleS == "w" ? Week : Day)}
  </div>)
}
export default Schedule