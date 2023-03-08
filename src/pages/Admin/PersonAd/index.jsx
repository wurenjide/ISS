import React, { useState } from 'react'
import { Menu } from "antd"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import PersonA from './PersonA';
import Possword from './Possword';
import Suggest from './Suggest';

const PersonAd = () => {
    const [person, setPerson] = useState('pa')
    const items = [
        {
            label: '个人信息管理',
            key: 'pa',
            icon: <AppstoreOutlined />,
        },
        {
            label: '密码修改',
            key: 'po',
            icon: <SettingOutlined />,
        },
        {
            label: '查看建议',
            key: 'su',
            icon: <MailOutlined />,
        }
    ]

    const onClick = (e) => {
        console.log('click ', e);
        setPerson(e.key);
      };

    return <>
        <Menu onClick={onClick} selectedKeys={[person]} mode="horizontal" items={items}/>
        <div>
            {/* <PersonA/> */}
            {person=='po'?<Possword/>:person=='su'?<Suggest/>:<PersonA/>}
        </div>
    </>
}
export default PersonAd