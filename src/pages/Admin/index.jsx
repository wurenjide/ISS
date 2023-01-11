
//引入antd全局样式
import "antd/dist/reset.css";
import style from "./index.module.scss";
import React, { useState } from 'react';
import AttMan from "./AttMan";
import Dept from "./Dept";
import AdminHome from "./Home1";
import { Routes, Route, useRoutes,useNavigate } from 'react-router-dom';
import routes from '../../router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown, message, Space, } from 'antd';
import LeaveMan from "./LeaveMan";
import PerMan from "./PerMan";
import ProMan from "./ProMan";
import Role from "./Role";
import Salary from "./Salary";
import Staff from "./Staff";
import TripMan from "./TripMan";
const { Header, Sider, Content } = Layout;
const Admin = () => {
  const navigate = useNavigate();
  const element = useRoutes(routes)
  console.log("el", element)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = [

    {
      label: '个人中心',
      key: 'setting:1',
    },
    {
      label: '退出系统',
      key: 'setting:2',
    },
  ];
  const handleRouter=(e)=>{
    navigate(e.key)
  }
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={style["logo"]} >logo</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/admin',
              icon: <HomeOutlined />,
              label: '首页',
            },
            {
              key: '/admin/attman',
              icon: <VideoCameraOutlined />,
              label: '出勤管理',
            },
            {
              key: '/admin/dept',
              icon: <UploadOutlined />,
              label: '部门管理',
            },
            {
              key:'/admin/leaveman',
              label:"请假管理",
            },
            {
              key:"/admin/perman",
              label:"绩效管理",
            },
            {
              key:"/admin/proman",
              label:"项目进度管理"
            },
            {
              key:"/admin/role",
              label:"角色管理",
            },
            {
              key:"/admin/salary",
              label:"工资管理"
            },
            {
              key:"/admin/staff",
              label:"员工管理"
            },
            {
              key:"/admin/tripman",
              label:"出差管理"
            }
          ]}
          onClick={handleRouter}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: style["trigger"],
            onClick: () => setCollapsed(!collapsed),
          })}
          员工管理系统
          <Space wrap style={{ float: "right", marginRight: "20px" }}>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  用户名
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<AdminHome />}/>
            <Route path='attman' element={<AttMan />} />
            <Route path='dept' element={<Dept />} />
            <Route path="leaveman" element={<LeaveMan/>}/>
            <Route path="perman" element={<PerMan/>}/>
            <Route path="proman" element={<ProMan/>}/>
            <Route path="role" element={<Role/>}/>
            <Route path="salary" element={<Salary/>}/>
            <Route path="staff" element={<Staff/>}/>
            <Route path="tripman" element={<TripMan/>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;