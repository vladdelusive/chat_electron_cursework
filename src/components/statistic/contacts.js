import React from 'react'
import { Col, Row, Statistic, Typography } from 'antd';
import { NATIONALITIES } from 'constants/nationalities';
import { sortObjectToEntriesArray } from 'utils';

const { Title, Text } = Typography;

export const ContactStatistic = React.memo((props) => {
    const { data } = props;
    let males = 0, females = 0, indeterminates = 0, collection = 0;
    data.forEach(el => {
        collection++
        if (el.gender === "female") {
            females++
        } else if (el.gender === "male") {
            males++
        } else {
            indeterminates++
        }
    });

    const nationalities = sortObjectToEntriesArray(data.reduce((a, { nat }) => {
        const natKey = NATIONALITIES[nat]?.name || NATIONALITIES.DEFAULT.name;
        return a[natKey] ? (a[natKey]++, a) : (a[natKey] = 1, a)
    }, {}))
    const predomineted = (females > indeterminates || males > indeterminates) ? (females > males ? "Women" : "Men") : "Indeterminates"

    return (
        <div className="statistic-contacts">
            <Title level={3}>Statistic</Title>
            <Row type={"flex"} gutter={24}>
                <Col>
                    <Statistic title="Collection size" value={collection} />
                </Col>
                <Col>
                    <Row type={"flex"} gutter={12}>
                        <Col>
                            <Statistic title="Males" value={males} />
                        </Col>
                        <Col>
                            <Statistic title="Females" value={females} />
                        </Col>
                        <Col>
                            <Statistic title="Indeterminate" value={indeterminates} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text mark>{collection ? predomineted : "No one"} predominate</Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Statistic
                        formatter={() => (
                            <Row type="flex" gutter={24}>
                                {nationalities.map(([natName, natCount]) => {
                                    return <Col className="nationality" key={natName}>
                                        <div className="nationality__name">{natName}:</div>
                                        <div className="nationality__count">{natCount} contacts</div>
                                    </Col>
                                })}
                            </Row>
                        )}
                        title={nationalities.length ? `Nationalities` : `Nationalities - zero`}
                    />
                </Col>
            </Row>
        </div>
    )
})
