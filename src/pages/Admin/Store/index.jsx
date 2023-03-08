import React, { useState } from 'react'
import style from "./index.module.scss";
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';

const Store = () => {

    return <div style={{textAlign: "center",margin:"auto",maxWidth:"400px",marginTop:"10%"}}>

                <Form>
                    <Form.Item label="名称">
                        <Input />
                    </Form.Item>
                    <Form.Item label="地址">
                        <Input />
                    </Form.Item>
                    <Form.Item label="面积">
                        <Input />
                    </Form.Item>
                    <Form.Item label="人数">
                        20
                    </Form.Item>
                    <Form.Item>
                        <Button>保存修改</Button>
                    </Form.Item>
                </Form>
    </div>

}
export default Store
