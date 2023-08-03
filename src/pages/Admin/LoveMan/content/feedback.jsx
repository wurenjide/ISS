import { Table } from "antd";
import React,{useState} from "react";

const Feedback=()=>{
    const columns=[
        {
            title: '反馈时间',
            dataIndex: 'time',
        },
        {
            title: '反馈内容',
            dataIndex: 'content',
        },
        {
            title: '反馈类型',
            dataIndex: 'type',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '满意等级',
            dataIndex: 'level',
        },
    ]
    return <>
    <Table columns={columns}/></>
}

export default Feedback