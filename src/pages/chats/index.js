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
import { setActiveChatId, setUpdatedChatMessages, sendNewMessage } from 'store/chats/actions';
import { setUpdateProfile } from 'store/auth/actions';
import { getActiveChatId, getChatsList } from 'store/chats/selectors';
import { getAuthProfile } from 'store/auth/selectors';
import { SearchChatModal } from 'components/modals';
import { api } from 'services';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

import { Scrollbars } from 'react-custom-scrollbars';

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
        setUpdateProfile,
        profileUid,
        profileChats,
        setUpdatedChatMessages,
        sendNewMessage,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isShowNewChatModal, setIsShowNewChatModal] = useState(false)
    const [messageValue, setMessageValue] = useState("")

    useEffect(() => {
        setMessageValue("")
    }, [activeChatId])

    useEffect(() => {
        let unsubscribeToProfileChats;
        if (profileUid) {
            unsubscribeToProfileChats = api.auth.subscribeToProfileChats(profileUid, setUpdateProfile)
        }
        return () => {
            if (typeof unsubscribeToProfileChats === "function" && profileUid) {
                unsubscribeToProfileChats()
            }
        }
    }, [profileUid, setUpdateProfile])

    useEffect(() => {
        let unsubscribeChatsMessagesArray;
        if (profileChats) {
            unsubscribeChatsMessagesArray = profileChats.map(chat => api.auth.subscribeToChatsMessages(chat, setUpdatedChatMessages))
        }
        return () => {
            if (typeof unsubscribeChatsMessagesArray === "object" && profileChats) {
                unsubscribeChatsMessagesArray.forEach(unsub => unsub())
            }
        }
    }, [profileChats, setUpdatedChatMessages])

    const filteredChats = (searchValue?.toString().trim().length && chats.filter(({ userInfo }) => {
        return userInfo.name?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim())
    })) || chats;

    useEffect(() => {
        return () => setActiveChatId(null)
    }, [setActiveChatId])

    const submitMessage = (e) => {
        if (!messageValue.trim()) {
            return;
        }
        if (e.key === "Enter") {
            sendNewMessage({ chatUid: activeChatId, message: messageValue })
            setMessageValue("")
        }
    }

    useEffect(() => {
        const scrollBlockContainer = document.querySelector(".simplebar-content")
        if (scrollBlockContainer) {
            scrollBlockContainer.scrollTo({
                top: scrollBlockContainer.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [chats])

    useEffect(() => {
        const scrollBlockContainer = document.querySelector(".simplebar-content")
        if (scrollBlockContainer) {
            scrollBlockContainer.scrollTo({
                top: scrollBlockContainer.scrollHeight,
            });
        }
    }, [activeChatId])

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
                            placeholder="Найти чат..."
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
                                            {isSetActiveChat && activeChat?.userInfo?.name ?
                                                <Link to={routes["profiles"].link(activeChat.userInfo.uid)} style={{ color: "#2335a0" }}>
                                                    {activeChat.userInfo.name}
                                                </Link>
                                                : profile?.name || "Владислав Товсточуб"}
                                        </Title>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Layout className="chats-list">
                    <Sider
                        width={300}
                        theme={'light'}
                        collapsible={true}
                        collapsed={isCollapsed}
                        onCollapse={() => setIsCollapsed(!isCollapsed)}
                    >
                        <Menu mode="inline" selectedKeys={[activeChatId]}>
                            {filteredChats.map((chat) => {
                                const { userInfo, id } = chat;
                                const { name, photo } = userInfo;
                                return (
                                    <Menu.Item
                                        key={id}
                                        onClick={() => setActiveChatId(id)}
                                        icon={<Icon component={() => (<img src={photo} alt="logo" />)} />}>
                                        {name}
                                    </Menu.Item>
                                )
                            }
                            )}
                        </Menu>
                    </Sider>
                    <Layout className="chat-content">
                        <Content>
                            <div className="messages-container">
                                {activeChatId
                                    ?
                                    <Scrollbars style={{ width: "100%", height: "100%" }}
                                        renderView={props => <div {...props} className="simplebar-content" />}
                                    >
                                        {activeChat.messages.map((item, index) => {
                                            return <MessageCard key={index} item={item} />
                                        })}
                                    </Scrollbars>
                                    : null}
                            </div>
                            {activeChatId ? <div className="input-container">
                                <Row className="input-message" typeof="flex" justify="center" gutter={24} >
                                    <Col style={{ alignItems: "center", display: "flex", cursor: "pointer" }}>
                                        <PaperClipOutlined style={{ fontSize: 30 }} />
                                    </Col>
                                    <Col span={22}>
                                        <Input
                                            className="input"
                                            placeholder={activeChat?.messages?.length ? "Напишите сообщение" : "Напишите сообщение первым"}
                                            size="large"
                                            onChange={(e) => setMessageValue(e.target.value)}
                                            value={messageValue}
                                            onKeyPress={submitMessage}
                                        // suffix={suffix}
                                        // onSearch={onSearch}
                                        />
                                    </Col>
                                </Row>
                            </div> : null}
                        </Content>
                    </Layout>
                </Layout>
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
    const profile = getAuthProfile(state)
    return {
        chats,
        isSetActiveChat: !!activeChat,
        activeChat,
        activeChatId,
        profile,
        profileUid: profile && profile.uid ? profile.uid : null,
        profileChats: profile && profile.chats?.length ? profile.chats : null,
    };
};

const mapDispatchToProps = {
    setActiveChatId, setUpdateProfile, setUpdatedChatMessages, sendNewMessage
};

const PageChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Chats);

export { PageChats };