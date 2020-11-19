import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Input, Layout, Menu, Row, Tooltip, Typography, Avatar } from 'antd';
import
Icon,
{
    PaperClipOutlined, PlusOutlined, UserOutlined,
} from '@ant-design/icons';
import { MessageCard } from 'components/cards/message'
import { setActiveChatId } from 'store/chats/actions';
import { getActiveChatId, getChatsList } from 'store/chats/selectors';
import { getAuthProfile } from 'store/auth/selectors';
import { SearchChatModal } from 'components/modals';
const { Content, Sider } = Layout;
const { Search } = Input;
const { Title } = Typography;

function Chats(props) {
    const {
        chats,
        setActiveChatId,
        activeChatId,
        isSetActiveChat,
        activeChat,
        profile,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isShowNewChatModal, setIsShowNewChatModal] = useState(false)

    const filteredChats = (searchValue?.toString().trim().length && chats.filter(({ userInfo }) => {
        return userInfo.name?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim())
    })) || chats;

    useEffect(() => {
        return () => setActiveChatId(null)
    }, [setActiveChatId])

    return (
        <>
            <div className="page page--chats">
                <div className="chats-header">
                    <div className={`header-line ${isCollapsed ? "collapsed" : ""}`}>
                        <div className="search-chat-btn">
                            <Tooltip title="Chat with new person">
                                <Button icon={<PlusOutlined />} size="large" onClick={() => setIsShowNewChatModal(true)} />
                            </Tooltip>
                        </div>
                        <Search
                            placeholder="Search chat..."
                            className="search-chats"
                            allowClear
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className="chat-information">
                        <Row typeof="flex" justify="space-between" align="middle" style={{ height: "100%", padding: "0px 10px" }}>
                            <Col span={8}>
                                <Row align="middle" gutter={10}>
                                    <Col>
                                        <Avatar
                                            src={isSetActiveChat && activeChat?.userInfo?.photo ? activeChat.userInfo.photo : profile?.photo}
                                            icon={<UserOutlined />}
                                            size="large"
                                            style={{
                                                color: "white",
                                                background: "#5d86e8",
                                                fontSize: 40, width: 60,
                                                height: 60, lineHeight: "55px"
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <Title level={3}>
                                            {isSetActiveChat && activeChat?.userInfo?.name ? activeChat.userInfo.name : profile?.name || "Владислав Товсточуб"}
                                        </Title>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {
                isShowNewChatModal
                    ?
                    <SearchChatModal setIsShowNewChatModal={setIsShowNewChatModal} />
                    : null
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const activeChatId = getActiveChatId(state)
    const chats = getChatsList(state);
    const activeChat = activeChatId && chats?.length ? chats.find(chat => chat.id === activeChatId) : null;
    return {
        chats,
        isSetActiveChat: !!activeChat,
        activeChat,
        activeChatId,
        profile: getAuthProfile(state),
    };
};

const mapDispatchToProps = {
    setActiveChatId,
};

const PageChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Chats);

export { PageChats };