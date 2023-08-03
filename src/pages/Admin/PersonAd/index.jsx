import React, { useState } from 'react'
import { Menu } from "antd"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import PersonA from './PersonA';

const PersonAd = () => {
    const [person, setPerson] = useState('pa')

    const onClick = (e) => {
        console.log('click ', e);
        setPerson(e.key);
      };

    return <>
        <div>
            <PersonA/>
        </div>
    </>
}
export default PersonAd