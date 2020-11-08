import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tag, Typography } from 'antd'
import { Spin } from 'components/common';
import { NATIONALITIES } from 'constants/nationalities';
import React from 'react'
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

export const ProfileCard = React.memo((props) => {
    const {
        img,
        nameTitle,
        email,
        age,
        country,
        street,
        nat,
        number,
        title,
        isDataExist,
        returnBtn,
    } = props

    const nation = NATIONALITIES[nat] || NATIONALITIES.DEFAULT
    return (
        <div className="page--profile">
            <Row type={"flex"} justify="center">
                <Col>
                    <Title>{title}</Title>
                </Col>
            </Row>
            <Spin isDataExist={isDataExist}>
                <Row gutter={16} type={"flex"} justify="center" >
                    <Col className="avatar" style={{ marginBottom: 20 }}>
                        <img alt="avatar" src={img} />
                    </Col>
                    <Col>
                        <Title level={3}>{nameTitle}&nbsp;
                            <Text type="secondary" style={{ fontSize: 16 }}>{`(${age} years)`}</Text>
                        </Title>
                        <Divider dashed />
                        <Paragraph copyable>{email}</Paragraph>
                        <Paragraph copyable>{number}</Paragraph>
                        <Paragraph copyable>/{country}/</Paragraph>
                        <Paragraph>{street}</Paragraph>
                        <Divider dashed />
                        <Tag color={nation.color}>{nation.name}</Tag>
                    </Col>
                </Row>
                {returnBtn ? <Row type={"flex"} justify="center">
                    <Col>
                        <Link to="/contacts" >
                            <Button icon={<DoubleLeftOutlined />} type="primary">Back</Button>
                        </Link>
                    </Col>
                </Row> : null}
            </Spin>
        </div>
    )
})
