import { AppstoreOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Row, Typography, Col, Button, Tooltip } from 'antd';
import { ContactsTable } from 'components/tables';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchContacts } from 'store/contacts/actions'
import { getContactsList } from 'store/contacts/selectors';

const { Title } = Typography;

function PageContactsContainer(props) {
    const { fetchContacts, tabularView } = props

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    return (
        <div className="page page--contacts">
            <div className="page__head">
                <Row justify="space-between">
                    <Col> <Title level={2}>Contacts</Title></Col>
                    <Col>
                        <Row type="flex" gutter={12}>
                            <Col>
                                <Tooltip title="Update data">
                                    <Button type="dashed" shape="circle" icon={<ReloadOutlined size="large" />} />
                                </Tooltip>
                            </Col>
                            <Col>
                                <Button.Group>
                                    <Tooltip title={tabularView ? "Tiled view" : ""}>
                                        <Button icon={<AppstoreOutlined />}
                                            type={!tabularView ? "primary" : "default"}
                                            className={!tabularView ? "is-active" : ""} />
                                    </Tooltip>
                                    <Tooltip title={!tabularView ? "Tabular view" : ""}>
                                        <Button
                                            icon={<UnorderedListOutlined />}
                                            type={tabularView ? "primary" : "default"}
                                            className={tabularView ? "is-active" : ""} />
                                    </Tooltip>
                                </Button.Group>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
            <div className="page__body">
                <ContactsTable />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contactsList: getContactsList(state)
    };
};

const mapDispatchToProps = { fetchContacts };

const PageContacts = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(PageContactsContainer);

export { PageContacts };