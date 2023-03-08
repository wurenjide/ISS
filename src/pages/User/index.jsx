
//引入antd全局样式
import "antd/dist/reset.css";
import style from "./index.module.scss";
import React, { Children, useState } from 'react';
import { Routes, Route, useRoutes, useNavigate } from 'react-router-dom';
import { getPosition } from "../../utils/map";
import routes from '../../router'
import {
    CalendarOutlined,
    HomeOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown, message, Space, } from 'antd';
import Personal from "./Personal";
import Leave from "./Leave";
import UserHome from "./Home"
import Schedule from "./Schedule";
import Rule from "./Rule";
import Suggest from "../User/Suggest";
const { Header, Sider, Content } = Layout;
const User = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const handleRouter = (e) => {
        if (e.key == "/quit") {
            localStorage.clear()
            navigate("/login")
        } else if (e.key == "/sign") {
        getPosition()
        }
        else {
            navigate(e.key)
        }
    }
    return (
        <Layout className={style["layout"]}>
            <Header>
                <div className={style["logo"]} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/user']}
                    items={[
                        {
                            key: '/user',
                            icon: <HomeOutlined />,
                            label: '首页',
                        },
                        {
                            key: '/user/schedule',
                            icon: <CalendarOutlined />,
                            label: '排班表',
                        },
                        {
                            key: '/user/leave',
                            icon: <VideoCameraOutlined />,
                            label: '请假',
                        },
                        {
                            key: "/user/rule",
                            label: "排班偏好"
                        },
                        {
                            key:"/user/suggest",
                            label:"提交建议",
                        },
                        {
                            key: 'user',
                            label: "用户名",
                            style: { marginLeft: "auto", },
                            children: [
                                {
                                    label: '个人中心',
                                    key: '/user/personal',
                                },
                                {
                                    label: "签到",
                                    key: "/sign"
                                },
                                {
                                    label: '退出系统',
                                    key: '/quit',
                                },
                            ]
                        }
                    ]}
                    onClick={handleRouter}
                />
            </Header>
            <Content
                style={{
                    padding: '50px 50px',
                }}
            >
                <div
                    className={style["site-layout-content"]}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 509,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<UserHome />} />
                        <Route path='leave' element={<Leave />} />
                        <Route path='personal' element={<Personal />} />
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="rule" element={<Rule />} />
                        <Route path="suggest" element={<Suggest/>}/>
                    </Routes>

                </div>
            </Content>
        </Layout >
    );
};
export default User;