import React from 'react'

export function MessageCard(props) {
    const { item } = props;
    const {
        message,
        me,
        // time, 
        // id,
    } = item;
    return (
        <div className={`message ${me ? "from-me--message" : "to-me--message"}`} style={{ opacity: message?.length === 0 ? 0 : 1 }}>
            <div className="message__content">
                {message}
            </div>
        </div>
    )
}
