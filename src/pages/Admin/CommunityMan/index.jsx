import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Button, Form, Input, Select, Col, Row, Table, Tag, Radio, DatePicker, Upload, message, Modal } from 'antd';
import Lun from './content/lun';
import Active from './content/active';

const CommunityMan = () => {

    const [love, setLove] = useState("active");

    const onChange = (e) => {
        setLove(e.target.value);
    }

    return <>
        <Radio.Group onChange={onChange} defaultValue="active" style={{ padding: "10px", margin: "auto" }}>
            <Radio.Button value="active">活动管理</Radio.Button>
            <Radio.Button value="lun">轮播图管理</Radio.Button>
        </Radio.Group>
        {love=="lun"?<Lun/>:<Active/>}
    </>
}
export default CommunityMan