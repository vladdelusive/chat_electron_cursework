import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import { Spin } from 'components/common';
import React from 'react'
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const ProfileCard = React.memo((props) => {
    const {
        img,
        nameTitle,
        email,
        title,
        returnBtn,
        isDataExist,
    } = props

    return (
        <div className="page--profile">
            <Row type={"flex"} justify="center">
                <Col>
                    <Title>{title}</Title>
                </Col>
            </Row>
            {returnBtn ? <Row type={"flex"} justify="center">
                <Col>
                    <Link to="/chats" >
                        <Button icon={<DoubleLeftOutlined />} type="primary">Back</Button>
                    </Link>
                </Col>
            </Row> : null}
        </div>
    )
})
