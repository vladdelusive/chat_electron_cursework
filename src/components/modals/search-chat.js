import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Row, Col, Input } from 'antd';
import { createNewChat, fetchUsersForChat } from 'store/chats/actions';

function SearchChatModal(props) {
    const { setIsShowNewChatModal, fetchUsersForChat } = props;

    const [isShow, setIsShow] = useState(true)
    const [searchValue, setSearchValue] = useState("")


    useEffect(() => {
        fetchUsersForChat()
    }, [fetchUsersForChat])

    return (
        <Modal
            visible={isShow}
            title="Search chat with new person"
            onCancel={() => {
                setTimeout(() => setIsShowNewChatModal(false), 200)
                setIsShow(false)
            }}
        >
            <Row typeof="flex" justify="center" style={{ marginBottom: 10 }} >
                <Col span={24}>
                    <Input
                        className="input"
                        placeholder="input search text"
                        size="large"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}

                    />
                </Col>
            </Row>
           
        </Modal>
    )
}


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = { fetchUsersForChat, createNewChat };

const EnhancedSearchChatModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SearchChatModal);

export { EnhancedSearchChatModal };