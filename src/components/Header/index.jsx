import {React,useState} from 'react';
import { inject, observer } from "mobx-react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import style from "./index.module.scss";
import { DownOutlined, UserOutlined,SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const Header = ({ appStore }) => {
  const toggleCollapsed = () => {
    appStore.changeState()
  };
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: 'Navigation',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },]
    }
  ];
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <div className={style["navbar", "flex"]} >
      {/* <!-- 左侧 --> */}
      <div className={style["flex", "items-center"]}>
        <div className={style["b"]}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
            }}
          >
            {appStore.appState ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        {/* <!-- 系统标题 --> */}
        <p >
        智能排班系统
        </p>
      </div>
      {/* <!-- 右侧 --> */}
      <div >
        <Space wrap>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};
export default inject("appStore")(observer(Header));;