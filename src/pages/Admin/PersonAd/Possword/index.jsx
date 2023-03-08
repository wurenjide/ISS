import React, { useState } from 'react'
import { Button, Form, Input, Select, Col, Row, Table } from 'antd';
const Possword = () => {
    return <div style={{
        textAlign: "center", maxWidth: 400, margin: "auto",marginTop:100}}>
        <Form>
            <Form.Item label="旧密码">
                <Input.Password />
            </Form.Item>
            <Form.Item label="新密码">
                <Input.Password />
            </Form.Item>
            <Form.Item label="确认密码">
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button>确认修改</Button>
                <Button>取消修改</Button>
            </Form.Item>
        </Form>
    </div >
}
export default Possword