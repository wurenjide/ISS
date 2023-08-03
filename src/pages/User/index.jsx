
//引入antd全局样式
import "antd/dist/reset.css";
import style from "./index.module.scss";
import React, { Children, useState,useEffect } from 'react';
import { Routes, Route, useRoutes, useNavigate,useLocation } from 'react-router-dom';
import { getPosition } from "../../utils/map";
import imge from "../../assets/logo.png"
import routes from '../../router'
import {
    ScheduleOutlined,
    HomeOutlined,
    HistoryOutlined,
    HeartOutlined,
    FormOutlined,
    ClockCircleOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown, message, Space, Avatar, Input, Image } from 'antd';
import Personal from "./Personal";
import Leave from "./Leave";
import UserHome from "./Home"
import Schedule from "./Schedule";
import HistoryIn from "./HistoryIn";
import Suggest from "../User/Suggest";
import Loving from "./Loving";
import Community from "./Community";
import { getLoction } from "../../api/common/location"
import { clockIn } from "../../api/Admin/AttMan"
import dayjs from "dayjs";
import qs from "qs"
import userEvent from "@testing-library/user-event";
const { Header, Sider, Content } = Layout;
const User = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const locaation = useLocation();
    const { pathname, from } = locaation;
    const [menukey, setMenukey] = useState([])

    const navigate = useNavigate();
    const [user, setUser] = useState(qs.parse(localStorage.getItem("user")));
    const handleRouter = async (e) => {
        console.log(e)
        if (e.key == "/quit") {
            localStorage.clear()
            navigate("/login")
        } else if (e.key == "/sign") {
            let res = await getLoction({ ak: "kcXCzrwuzKkQKStGfbaxV3XrXV25j734", ip: "218.76.65.101", coor: "bd09ll" })
            console.log(res)
            getPosition()
        }
        else {
            navigate(e.key)
        }
    }
    const items = [
        {
            label: (<a onClick={() => { handleRouter({ key: "/user/personal" }) }}>个人中心</a>),
            key: '/user/personal',
        },
        {
            label: (<a onClick={() => { handleRouter({ key: '/quit' }) }}>退出系统</a>),
            key: '/quit',
        },
    ]

    useState(() => {
        setMenukey([pathname])
    })
    useEffect(() => {
        setMenukey([pathname])
    }, [pathname]);

    return (
        <Layout className={style["layout"]}>
            <Header className={style["backcolcor"]}>
                <div className={style["header"]}>
                    <div className={style["logo"]}>
                        <Image src={imge} height={50} preview={false} />
                    </div>
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
                                icon: <ScheduleOutlined />,
                                label: '排班表',
                            },
                            {
                                key: '/user/leave',
                                icon: <ClockCircleOutlined />,
                                label: '请假',
                            },

                            {
                                key: "/user/suggest",
                                icon: <FormOutlined />,
                                label: "提交建议",
                            },
                            {
                                key: "/user/historyIn",
                                icon: <HistoryOutlined />,
                                label: "历史消息"
                            },
                        ]}
                        onClick={handleRouter}
                        className={style["backcolor"]}
                        selectedKeys={menukey}
                    ></Menu>
                    <div style={{ display: "inline-block" }}>
                        <Space>
                            {/* <a onClick={() => { handleRouter({ key: "/sign" }) }}><BellOutlined style={{ fontSize: 20 }} /></a>
                            <Space.Compact>
                                <Input size="small" style={{ borderTopLeftRadius: 40, borderBottomLeftRadius: 40, width: 60 }} id="pu" />
                                <Button onClick={clin} style={{ borderBottomRightRadius: 40, borderTopRightRadius: 40 }}><BellOutlined /></Button>
                            </Space.Compact> */}
                            <Dropdown
                                menu={{ items }}
                                placement="bottom"
                            >
                                <Avatar src={user.avatar} />
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </Header>
            <Content
                style={{
                    padding: '1%',
                }}
            >
                <div
                    className={style["site-layout-content"]}
                    style={{
                        margin: '2%',
                        padding: "1%",
                        minHeight: 566,
                        // background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="*" element={<UserHome />} />
                        <Route path='leave' element={<Leave />} />
                        <Route path='personal' element={<Personal />} />
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="suggest" element={<Suggest />} />
                        <Route path="historyIn" element={<HistoryIn />} />
                    </Routes>
                </div>
            </Content>
        </Layout >
    );
};
export default User;