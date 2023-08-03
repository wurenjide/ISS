import React, { useState } from "react";
import style from "./index.module.scss"
import { Skeleton, Avatar, List, Modal, Descriptions } from "antd"
import MyCarousel from "./myCarousel";
const Community = () => {
    const [open, setOpen] = useState(false)
    const [data,setData]=useState([
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ])

    const getData=()=>{

    }
    useState(()=>{
        getData()
    })

    const showModal = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <MyCarousel />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <List
            header={<>活动列表</>}
                style={{ textAlign: "center" }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <a onClick={showModal}>"Ant Design, a design language for background applications, is refined by Ant UED Team"</a>
                    </List.Item>
                )}
            bordered />
            <Modal open={open} footer={false} onCancel={onClose} title="活动具体信息" width={1000}>
                <Descriptions  bordered>
                    <Descriptions.Item label="活动名称" span={2}>Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="活动类型">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="活动持续时间" span={2}>
                        2019-04-24 18:00:00 - 2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="活动地点" span={3}>
                        湖南省张家界永定区大庸桥公园吉首大学第七教学楼7301
                    </Descriptions.Item>
                    <Descriptions.Item label="活动内容">
                        阿斯达斯打扫打扫打扫打扫
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}
export default Community