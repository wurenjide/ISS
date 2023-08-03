import React,{useState} from "react";
import { Button, Form, Input, Select, Col, Row, Table, Tag, Menu, DatePicker, Upload, message, Modal } from 'antd';

const Apply=()=>{

    const [open, setOpen] = useState(false)

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
        },
        {
            title: '申请原因',
            dataIndex: 'reason',
        },
        {
            title: '申请时间',
            dataIndex: 'time',
        },
        {
            title: '申请状态',
            dataIndex: 'status',
            render: (_, s) => {
                let status = s.status
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
            dataIndex: "option",
            render: (_, s) => {
                if (s.status == "审核中") {

                    return <a onClick={() => showModal(s, "反馈")}>进行反馈</a>
                } else if (s.status == "完成") {
                   return <a onClick={() => showModal(s, "查看")}>查看反馈</a>
                }
            }
        }
    ]
    const showModal = (s, title) => {
        setOpen(true)
    }

    return <>
    <Table columns={columns}/>
    </>
}

export default Apply