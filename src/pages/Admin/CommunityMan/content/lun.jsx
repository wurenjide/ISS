import { Button, List, Space } from "antd"

const Lun = () => {
    const data = [
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
    ];
    return <div>
        <Button>添加图片</Button>
        <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    extra={
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Space>
                                <a>描述</a>
                                <a>删除</a> 
                            </Space>
                        </div>
                    }
                >
                    <Space>
                        <img
                            width={500}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                        {item.title}
                    </Space>
                </List.Item>
            )}
        />
    </div>
}
export default Lun