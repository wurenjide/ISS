import React, { useRef } from "react";
import style from "./index.module.scss"
import { Carousel, Row, Col } from 'antd';
import { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const MyCarousel = () => {
    const ref = useRef(null);
    return (<>
        <Row>
            <Col span={1}>
                <div onClick={() => { ref.current?.prev(); }} className={style['center']} >
                    <LeftOutlined />{/* your previous icon image */}
                </div>
            </Col>
            <Col span={22}>
                <Carousel ref={ref} draggable effect="fade" >
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Col>
            <Col span={1}>
                <div onClick={() => { ref.current?.next(); }}  className={style['center']}>
                    <RightOutlined />
                </div>
            </Col>
        </Row>
    </>)
}
export default MyCarousel